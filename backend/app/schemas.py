from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    role: str
    vehicle_type: str | None = None


class BookingCreate(BaseModel):
    service_type: str
    vehicle_type: str
    issue: str
    latitude: float
    longitude: float

