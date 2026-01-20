from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(email: str):
    return {"message": f"Logged in as {email}"}

