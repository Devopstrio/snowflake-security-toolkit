from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_queries():
    return {'status': 'ok', 'component': 'queries'}
