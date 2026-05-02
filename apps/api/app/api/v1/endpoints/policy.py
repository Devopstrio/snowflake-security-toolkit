from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/evaluate')
def evaluate_policy(data: dict = Body(...)):
    return {'evaluation': 'ALLOWED', 'matching_rules': 1}
