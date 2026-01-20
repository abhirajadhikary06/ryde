from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import UserCreate
from app.models import User
from app.dependencies import get_db

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

