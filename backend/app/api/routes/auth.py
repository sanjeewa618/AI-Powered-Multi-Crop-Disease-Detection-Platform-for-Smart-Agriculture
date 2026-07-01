from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.models.user import User

router = APIRouter(prefix='/auth', tags=['auth'])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')
pwd_context = CryptContext(schemes=['pbkdf2_sha256'], deprecated='auto')


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict[str, Any], expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()


def seed_default_users(db: Session) -> None:
    if db.query(User).count() > 0:
        return
    defaults = [
        {'email': 'admin@example.com', 'username': 'admin', 'password': 'admin123', 'role': 'admin', 'full_name': 'System Admin'},
        {'email': 'farmer@example.com', 'username': 'farmer', 'password': 'farmer123', 'role': 'farmer', 'full_name': 'Demo Farmer'},
    ]
    for item in defaults:
        db.add(
            User(
                email=item['email'],
                username=item.get('username'),
                hashed_password=get_password_hash(item['password']),
                role=item['role'],
                full_name=item['full_name'],
            )
        )
    db.commit()


def authenticate_user(db: Session, email: str, password: str) -> dict[str, Any] | None:
    user = get_user_by_email(db, email)
    if not user:
        user = get_user_by_username(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return {'email': user.email, 'role': user.role}


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> dict[str, Any]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str | None = payload.get('sub')
        if email is None:
            raise credentials_exception
        user = get_user_by_email(db, email)
        if not user:
            raise credentials_exception
        return {'email': user.email, 'role': user.role}
    except JWTError as exc:
        raise credentials_exception from exc


@router.post('/register')
def register_user(payload: dict[str, Any], db: Session = Depends(get_db)):
    seed_default_users(db)

    email = payload.get('email')
    if not email or get_user_by_email(db, email):
        raise HTTPException(status_code=400, detail='Email already registered')

    if not payload.get('password'):
        raise HTTPException(status_code=400, detail='Password is required')

    user = User(
        email=email,
        username=str(payload.get('username', '')) or None,
        hashed_password=get_password_hash(str(payload['password'])),
        role=str(payload.get('role', 'farmer')),
        full_name=str(payload.get('full_name', '')) or None,
        phone=str(payload.get('phone', '')) or None,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token({'sub': user.email, 'role': user.role})
    return {
        'message': 'User registered successfully',
        'access_token': access_token,
        'token_type': 'bearer',
        'role': user.role,
        'email': user.email,
    }


@router.post('/login')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    seed_default_users(db)
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    access_token = create_access_token({'sub': user['email'], 'role': user['role']})
    return {
        'access_token': access_token,
        'token_type': 'bearer',
        'role': user['role'],
        'email': user['email'],
    }


@router.get('/me')
def get_me(current_user: dict[str, Any] = Depends(get_current_user)):
    return current_user
