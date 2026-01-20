from fastapi import APIRouter

router = APIRouter(prefix="/repair", tags=["Repair"])

@router.get("/issues/{vehicle_type}")
def get_repair_issues(vehicle_type: str):
    issues = {
        "car": ["Engine failure", "Battery dead", "Brake failure"],
        "bike": ["Chain break", "Battery dead", "Engine failure"],
        "other": ["Axle break", "Hydraulic failure"]
    }
    return issues.get(vehicle_type, [])

