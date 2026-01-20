from sqlalchemy import Column, Integer, String, Float
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    phone = Column(String)
    role = Column(String)  # owner / repair / towing
    vehicle_type = Column(String, nullable=True)


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)
    service_type = Column(String)  # repair / towing
    vehicle_type = Column(String)
    issue = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    status = Column(String, default="pending")

