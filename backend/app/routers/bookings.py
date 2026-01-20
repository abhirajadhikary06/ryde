from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import BookingCreate
from app.models import Booking
from app.dependencies import get_db

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("/")
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    booking = Booking(**data.dict())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

