from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/apply')
def apply_masking(data: dict = Body(...)):
    return {'status': 'MASKING_APPLIED', 'policy': 'PII_MASK'}
