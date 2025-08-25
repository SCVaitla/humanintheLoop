# models.py - Simple version that will work
from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    UniqueConstraint,
    Text,
)
from datetime import datetime, timedelta
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    # Basic user info
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)  # NULL for social auth only users

    # Profile information
    full_name = Column(String, nullable=True)
    profile_picture = Column(Text, nullable=True)  # URL to profile picture

    # Account status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

    # Social authentication
    provider = Column(String, nullable=True)  # e.g., "google", "github", etc.
    provider_sub = Column(String, nullable=True)  # Provider's unique user ID

    # Timestamps - Using datetime.utcnow as default (simpler approach)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    # Security
    failed_login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime, nullable=True)

    # Constraints
    __table_args__ = (
        UniqueConstraint("provider", "provider_sub", name="uq_provider_sub"),
    )

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', provider='{self.provider}')>"

    @property
    def is_locked(self) -> bool:
        """Check if account is temporarily locked due to failed login attempts."""
        if self.locked_until is None:
            return False
        return datetime.utcnow() < self.locked_until

    def increment_failed_login(self):
        """Increment failed login attempts and lock account if needed."""
        self.failed_login_attempts += 1

        # Lock account after 5 failed attempts for 30 minutes
        if self.failed_login_attempts >= 5:
            self.locked_until = datetime.utcnow() + timedelta(minutes=30)

    def reset_failed_login(self):
        """Reset failed login attempts on successful login."""
        self.failed_login_attempts = 0
        self.locked_until = None
        self.last_login = datetime.utcnow()


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    token_hash = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    is_revoked = Column(Boolean, default=False)

    def __repr__(self):
        return f"<RefreshToken(user_id={self.user_id}, revoked={self.is_revoked})>"
