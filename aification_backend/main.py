# aification_backend/main.py
from datetime import datetime
from typing import Optional, List

import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

# --- Support both package and in-folder execution ---
try:
    # run as package: uvicorn aification_backend.main:app
    from . import database, models, auth
except ImportError:
    # run inside folder: uvicorn main:app
    import database, models, auth  # type: ignore

# Google ID token verification
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

# ---------------------------------------------------------------------
# Env
# ---------------------------------------------------------------------
load_dotenv()

ENV = os.getenv("ENV") or os.getenv("VITE_ENV") or "development"

# Accept either a single client id or a comma-separated list
_raw_ids = os.getenv("GOOGLE_CLIENT_IDS") or os.getenv("GOOGLE_CLIENT_ID") or ""
GOOGLE_AUDIENCES: List[str] = [a.strip() for a in _raw_ids.split(",") if a.strip()]

# ---------------------------------------------------------------------
# App & DB
# ---------------------------------------------------------------------
models.Base.metadata.create_all(bind=database.engine)
app = FastAPI(title="AIFICATION Auth API", version="1.0.0")


# ---------------------------------------------------------------------
# CORS (dev-safe)
# ---------------------------------------------------------------------
def _default_local_origins() -> List[str]:
    return [
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]


if ENV.lower() == "development":
    # Be permissive in dev so preflights don't block you
    allow_origins = ["*"]
else:
    extra = os.getenv("FRONTEND_ORIGINS", "")
    allow_origins = _default_local_origins()
    if extra:
        allow_origins += [o.strip() for o in extra.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],  # allow OPTIONS, POST, etc.
    allow_headers=["*"],
)


# ---------------------------------------------------------------------
# Dependencies
# ---------------------------------------------------------------------
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------
class SignupIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class GoogleAuthIn(BaseModel):
    credential: str  # Google ID token from Google Identity Services


# ---------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------
def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


# ---------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------
@app.get("/")
def root():
    return {"service": "aification-auth", "env": ENV, "ok": True}


@app.get("/health")
def health():
    return {"ok": True, "ts": datetime.utcnow().isoformat()}


@app.post("/signup")
def signup(payload: SignupIn, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = models.User(
        email=payload.email,
        hashed_password=auth.hash_password(payload.password),
        provider=None,
        provider_sub=None,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created successfully"}


@app.post("/login", response_model=TokenOut)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    # OAuth2PasswordRequestForm uses 'username' to carry the email
    user = get_user_by_email(db, form_data.username)
    if not user or not user.hashed_password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = auth.create_access_token(sub=user.email, extra={"auth": "local"})
    return TokenOut(access_token=token)


@app.post("/auth/google", response_model=TokenOut)
def auth_google(payload: GoogleAuthIn, db: Session = Depends(get_db)):
    """
    Verifies the Google ID token and issues a JWT.
    Accepts GOOGLE_CLIENT_ID or GOOGLE_CLIENT_IDS (comma-separated).
    """
    if not GOOGLE_AUDIENCES:
        raise HTTPException(
            status_code=500, detail="Server missing GOOGLE_CLIENT_ID(S)"
        )

    try:
        # Google's helper requires a single audience; verify with the first
        primary_aud = GOOGLE_AUDIENCES[0]
        info = id_token.verify_oauth2_token(
            payload.credential, google_requests.Request(), primary_aud
        )
        aud = info.get("aud")
        if aud not in GOOGLE_AUDIENCES:
            raise HTTPException(
                status_code=401, detail=f"Invalid Google token: wrong audience {aud}"
            )

        sub = info.get("sub")
        email = info.get("email")
        if not sub or not email:
            raise ValueError("Google token missing sub/email")
    except HTTPException:
        raise
    except Exception as e:
        # Any verification failure = 401 (will surface in UI as “Google sign-in failed”)
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {e}")

    # Upsert user (Google-only users have no local password)
    user = get_user_by_email(db, email)
    if not user:
        user = models.User(
            email=email,
            hashed_password=None,
            provider="google",
            provider_sub=sub,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Link Google to an existing local account if not already linked
        if not user.provider:
            user.provider = "google"
            user.provider_sub = sub
            db.commit()
            db.refresh(user)

    token = auth.create_access_token(sub=user.email, extra={"auth": "google"})
    return TokenOut(access_token=token)


@app.get("/me")
def me(authorization: Optional[str] = Header(default=None)):
    """
    Send: Authorization: Bearer <JWT>
    """
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")

    jwt_token = authorization.split(" ", 1)[1]
    try:
        data = auth.decode_token(jwt_token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"email": data.get("sub"), "auth": data.get("auth")}


# ---------------------------------------------------------------------
# Debug logging (helps confirm env actually loaded)
# ---------------------------------------------------------------------
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("ENV: %s", ENV)
if GOOGLE_AUDIENCES:
    logger.info(
        "Google audiences loaded: %s", [aud[:28] + "…" for aud in GOOGLE_AUDIENCES]
    )
else:
    logger.warning(
        "No Google audiences configured. Set GOOGLE_CLIENT_ID or GOOGLE_CLIENT_IDS."
    )

# Optional: allow `python -m aification_backend.main`
if __name__ == "__main__":  # pragma: no cover
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
