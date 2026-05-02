import json
from typing import List, Dict, Any, Optional
from datetime import datetime

class AccessControlEngine:
    """Simulates Snowflake RBAC and privilege management."""
    
    def __init__(self):
        self.roles = {
            "ACCOUNTADMIN": {"hierarchy": [], "privileges": ["*"]},
            "SECURITYADMIN": {"hierarchy": ["USERADMIN"], "privileges": ["MANAGE_ROLES"]},
            "SYSADMIN": {"hierarchy": [], "privileges": ["CREATE_DATABASE", "CREATE_WAREHOUSE"]},
            "PUBLIC": {"hierarchy": [], "privileges": []}
        }

    def check_privilege(self, role: str, privilege: str) -> bool:
        if role not in self.roles:
            return False
        role_data = self.roles[role]
        if "*" in role_data["privileges"] or privilege in role_data["privileges"]:
            return True
        for parent in role_data["hierarchy"]:
            if self.check_privilege(parent, privilege):
                return True
        return False

class DataClassificationEngine:
    """Classifies data based on sensitivity (PII, Sensitive, Public)."""
    
    def classify_column(self, column_name: str, sample_data: Any) -> str:
        pii_keywords = ["email", "ssn", "phone", "credit_card", "address"]
        if any(keyword in column_name.lower() for keyword in pii_keywords):
            return "PII"
        if "id" in column_name.lower() or "cost" in column_name.lower():
            return "SENSITIVE"
        return "PUBLIC"

class DataMaskingEngine:
    """Applies dynamic masking policies based on user roles."""
    
    def apply_mask(self, value: str, classification: str, role: str) -> str:
        if classification == "PII" and role != "PII_ADMIN":
            return "********"
        if classification == "SENSITIVE" and role not in ["PII_ADMIN", "SYSADMIN"]:
            return "####-MASKED-####"
        return value

class QueryMonitoringEngine:
    """Detects suspicious query patterns in Snowflake logs."""
    
    def analyze_query(self, query: str, user: str) -> Dict[str, Any]:
        suspicious = False
        reason = None
        
        # Rule: Broad data export detection
        if "select *" in query.lower() and "where" not in query.lower():
            suspicious = True
            reason = "FULL_TABLE_SCAN_WITHOUT_FILTER"
            
        # Rule: Sensitive table access by non-admin
        if "hr_salary" in query.lower() and user != "HR_ADMIN":
            suspicious = True
            reason = "UNAUTHORIZED_SENSITIVE_TABLE_ACCESS"
            
        return {
            "query": query,
            "user": user,
            "timestamp": datetime.utcnow().isoformat(),
            "suspicious": suspicious,
            "reason": reason
        }

if __name__ == "__main__":
    access = AccessControlEngine()
    classify = DataClassificationEngine()
    mask = DataMaskingEngine()
    monitor = QueryMonitoringEngine()
    
    print("--- Snowflake Security Toolkit Simulation ---")
    
    # 1. RBAC Check
    has_access = access.check_privilege("SECURITYADMIN", "USERADMIN")
    print(f"RBAC: SECURITYADMIN has USERADMIN rights? {has_access}")
    
    # 2. Classification
    tag = classify.classify_column("user_email", "test@example.com")
    print(f"Classification: 'user_email' tagged as {tag}")
    
    # 3. Masking
    masked_val = mask.apply_mask("user@test.com", tag, "ANALYST")
    print(f"Masking: Analyst sees PII as: {masked_val}")
    
    # 4. Monitoring
    audit = monitor.analyze_query("SELECT * FROM hr_salary", "ANALYST")
    if audit["suspicious"]:
        print(f"ALERT: Suspicious activity detected! Reason: {audit['reason']}")
