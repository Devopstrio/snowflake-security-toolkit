from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_roles():
    return {'roles': ['ACCOUNTADMIN', 'SECURITYADMIN', 'SYSADMIN']}
@router.post('/create')
def create_role(data: dict = Body(...)):
    return {'status': 'CREATED', 'role': 'NEW_ROLE'}
