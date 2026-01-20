from fastapi import FastAPI
from app.database import Base, engine
from app.routers import auth, users, bookings, repair, towing

app = FastAPI(title="Vehicle Booking Platform")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(bookings.router)
app.include_router(repair.router)
app.include_router(towing.router)

@app.get("/")
def root():
    return {"status": "API running"}

