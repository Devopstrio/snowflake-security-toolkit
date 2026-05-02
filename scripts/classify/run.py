import sys
import time
from core.access.engine import AccessControlEngine, DataClassificationEngine, DataMaskingEngine, QueryMonitoringEngine

def run_snowsec_simulation():
    # 1. Initialize Engines
    access = AccessControlEngine()
    classify = DataClassificationEngine()
    mask = DataMaskingEngine()
    monitor = QueryMonitoringEngine()
    
    print("--- Snowflake Security Toolkit Simulation ---")
    
    # 2. Simulate Table Schema & Data Classification
    columns = ["USER_ID", "EMAIL", "SALARY", "COUNTRY"]
    print(f"\n[CLASSIFY] Scanning Snowflake Table: 'EMPLOYEE_DATA'...")
    for col in columns:
        tag = classify.classify_column(col, None)
        print(f"  Column: {col} | Classification: {tag}")
    
    # 3. Simulate Multi-Role Data Access with Masking
    roles = ["ANALYST", "HR_ADMIN", "PII_ADMIN"]
    print(f"\n[MASKING] Evaluating Dynamic Masking for 'EMAIL' column...")
    for role in roles:
        val = mask.apply_mask("user@example.com", "PII", role)
        print(f"  Role: {role} | Visible Value: {val}")
        
    # 4. Simulate Query Monitoring & Anomaly Detection
    queries = [
        {"user": "ANALYST", "sql": "SELECT COUNT(*) FROM EMPLOYEE_DATA WHERE COUNTRY = 'US'"},
        {"user": "ANALYST", "sql": "SELECT * FROM HR_SALARY"}, # Anomalous
        {"user": "HR_ADMIN", "sql": "SELECT AVG(SALARY) FROM EMPLOYEE_DATA"},
    ]
    
    print(f"\n[MONITORING] Analyzing Snowflake Query History...")
    for q in queries:
        audit = monitor.analyze_query(q['sql'], q['user'])
        status = "🔥 ALERT" if audit['suspicious'] else "✅ OK"
        print(f"  [{status}] User: {q['user']} | Query: {q['sql'][:40]}... | Reason: {audit['reason']}")

if __name__ == "__main__":
    run_snowsec_simulation()
