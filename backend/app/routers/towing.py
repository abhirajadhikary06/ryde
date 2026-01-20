from fastapi import APIRouter

router = APIRouter(prefix="/towing", tags=["Towing"])

@router.get("/providers")
def get_towing_providers(lat: float, lng: float):
    return [
        {"name": "QuickTow", "distance": "2 km"},
        {"name": "RoadLift", "distance": "5 km"}
    ]

