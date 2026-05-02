from typing import List, Dict
from datetime import datetime

class PolicyEngine:
    """Evaluates global security policies for data access and governance."""
    
    def evaluate_policy(self, action: str, resource: str, context: Dict[str, Any]):
        # Example: Enforce MFA for all ACCOUNTADMIN actions
        if context.get("role") == "ACCOUNTADMIN" and not context.get("mfa_authenticated"):
            return {"status": "DENIED", "reason": "MFA_REQUIRED_FOR_ACCOUNTADMIN"}
        
        # Example: Restrict data usage to specific warehouses
        if action == "QUERY" and context.get("warehouse") not in ["COMPUTE_WH", "SECURE_WH"]:
            return {"status": "DENIED", "reason": "UNAUTHORIZED_WAREHOUSE"}
            
        return {"status": "ALLOWED"}

class ComplianceMapping:
    """Maps security controls to regulatory frameworks."""
    
    def get_controls(self, framework: str):
        frameworks = {
            "GDPR": ["DATA_MASKING", "ACCESS_AUDIT", "PII_CLASSIFICATION"],
            "HIPAA": ["ENCRYPTION_AT_REST", "AUDIT_LOGGING", "ACCESS_CONTROL"],
            "SOC2": ["MONITORING", "CHANGE_MANAGEMENT", "RBAC"]
        }
        return frameworks.get(framework, [])
