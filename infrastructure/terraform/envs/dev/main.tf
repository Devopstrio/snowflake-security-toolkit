module "snowflake_sec_db" {
  source = "./modules/database"

  db_name = "snowflake_security_metadata"
}

module "sec_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

module "data_monitoring" {
  source = "./modules/monitoring"

  retention_days = 365
}

resource "kubernetes_namespace" "snow_sec" {
  metadata {
    name = "snowflake-security"
    labels = {
      "security.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "snow_sec_configs" {
  metadata {
    name      = "snow-sec-global-configs"
    namespace = kubernetes_namespace.snow_sec.metadata[0].name
  }

  data = {
    "masking-enabled"      = "true"
    "rbac-enforcement"     = "strict"
    "anomaly-threshold"    = "0.8"
    "snowflake-account"    = "xy12345"
  }
}
