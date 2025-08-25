# auth.py - Enhanced version
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import jwt, JWTError
from passlib.context import CryptContext
import os
import logging

logger = logging.getLogger(__name__)

SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret_change_me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    """Verify a plain password against its hash."""
    return pwd_context.verify(plain, hashed)


def create_access_token(
    sub: str,
    extra: Optional[Dict[str, Any]] = None,
    minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES,
) -> str:
    """Create a JWT access token."""
    to_encode = {
        "sub": sub,
        "exp": datetime.utcnow() + timedelta(minutes=minutes),
        "iat": datetime.utcnow(),
        "type": "access",
    }
    if extra:
        to_encode.update(extra)

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(sub: str) -> str:
    """Create a JWT refresh token."""
    to_encode = {
        "sub": sub,
        "exp": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        "iat": datetime.utcnow(),
        "type": "refresh",
    }
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> Dict[str, Any]:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        logger.warning(f"Token decode error: {e}")
        raise


def verify_token_type(token: str, expected_type: str) -> Dict[str, Any]:
    """Verify token and check its type."""
    payload = decode_token(token)
    if payload.get("type") != expected_type:
        raise JWTError(f"Invalid token type. Expected {expected_type}")
    return payload
