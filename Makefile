.PHONY: help build up down test lint migrate classify-data monitor-queries enforce-policies

help:
	@echo "Snowflake Security Toolkit - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "classify-data      : Run data classification simulation"
	@echo "monitor-queries    : Run query anomaly detection engine"
	@echo "enforce-policies   : Run RBAC/Masking policy enforcement"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

classify-data:
	docker-compose exec api python scripts/classify/run.py

monitor-queries:
	docker-compose exec api python scripts/monitor/analyze.py

enforce-policies:
	docker-compose exec api python scripts/enforce/apply.py
