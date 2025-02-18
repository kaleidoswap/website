# Variables
DOCKER_COMPOSE = docker compose
DOCKER = docker
ENV_FILE = .env
TRAEFIK_CONTAINER = kaleidoswap-traefik
LANDING_CONTAINER = kaleidoswap-landing
DEV_CONTAINER = kaleidoswap-landing-dev

# Colors
CYAN = \033[0;36m
GREEN = \033[0;32m
YELLOW = \033[0;33m
RED = \033[0;31m
NC = \033[0m # No Color

.PHONY: help install dev prod down clean logs restart status ssl-check ssl-create backup restore lint test

# Show help
help:
	@echo "${CYAN}KaleidoSwap Landing Page Management${NC}"
	@echo ""
	@echo "Usage:"
	@echo "  ${GREEN}make install${NC}    - Install dependencies"
	@echo "  ${GREEN}make dev${NC}        - Start development environment"
	@echo "  ${GREEN}make prod${NC}       - Start production environment"
	@echo "  ${GREEN}make down${NC}       - Stop all containers"
	@echo "  ${GREEN}make clean${NC}      - Remove all containers, volumes, and node_modules"
	@echo "  ${GREEN}make logs${NC}       - View logs from all containers"
	@echo "  ${GREEN}make restart${NC}    - Restart all containers"
	@echo "  ${GREEN}make status${NC}     - Check status of containers"
	@echo ""
	@echo "SSL Management:"
	@echo "  ${GREEN}make ssl-check${NC}  - Check SSL certificate status"
	@echo "  ${GREEN}make ssl-create${NC} - Force SSL certificate creation"
	@echo ""
	@echo "Maintenance:"
	@echo "  ${GREEN}make backup${NC}     - Create backup of certificates and configs"
	@echo "  ${GREEN}make restore${NC}    - Restore from backup"
	@echo "  ${GREEN}make lint${NC}       - Run linting"
	@echo "  ${GREEN}make test${NC}       - Run tests"

# Install dependencies
install:
	@echo "${CYAN}Installing dependencies...${NC}"
	npm install
	@echo "${GREEN}Dependencies installed successfully${NC}"

# Start development environment
dev:
	@echo "${CYAN}Starting development environment...${NC}"
	${DOCKER_COMPOSE} --profile dev up landing-dev

# Start production environment
prod:
	@if [ ! -f ${ENV_FILE} ]; then \
		echo "${RED}Error: ${ENV_FILE} not found${NC}"; \
		echo "Please create ${ENV_FILE} file with required variables"; \
		exit 1; \
	fi
	@echo "${CYAN}Starting production environment...${NC}"
	${DOCKER_COMPOSE} up -d traefik landing
	@echo "${GREEN}Production environment started${NC}"
	@echo "Please wait a few moments for SSL certificates to be generated"
	@echo "Access the site at: https://$$(grep DOMAIN ${ENV_FILE} | cut -d '=' -f2)"

# Stop all containers
down:
	@echo "${CYAN}Stopping all containers...${NC}"
	${DOCKER_COMPOSE} down
	@echo "${GREEN}All containers stopped${NC}"

# Clean everything
clean: down
	@echo "${CYAN}Cleaning up...${NC}"
	rm -rf node_modules
	${DOCKER_COMPOSE} down -v
	@echo "${GREEN}Cleanup complete${NC}"

# View logs
logs:
	@echo "${CYAN}Viewing logs...${NC}"
	${DOCKER_COMPOSE} logs -f

# Restart containers
restart: down prod
	@echo "${GREEN}Containers restarted${NC}"

# Check status
status:
	@echo "${CYAN}Container Status:${NC}"
	${DOCKER_COMPOSE} ps

# SSL certificate check
ssl-check:
	@echo "${CYAN}Checking SSL certificates...${NC}"
	${DOCKER} exec ${TRAEFIK_CONTAINER} traefik healthcheck
	@echo "${GREEN}SSL check complete${NC}"

# Force SSL certificate creation
ssl-create:
	@echo "${CYAN}Creating SSL certificates...${NC}"
	${DOCKER} exec ${TRAEFIK_CONTAINER} rm -f /letsencrypt/acme.json
	make restart
	@echo "${GREEN}SSL certificates creation initiated${NC}"

# Backup
backup:
	@echo "${CYAN}Creating backup...${NC}"
	@mkdir -p backups
	@date_stamp=$$(date +%Y%m%d_%H%M%S); \
	${DOCKER} run --rm \
		-v kaleidoswap-landing_traefik-certificates:/certificates \
		-v $$(pwd)/backups:/backup \
		alpine tar czf /backup/certificates_$$date_stamp.tar.gz /certificates
	@echo "${GREEN}Backup created in backups/certificates_$$(date +%Y%m%d_%H%M%S).tar.gz${NC}"

# Restore
restore:
	@if [ -z "$(file)" ]; then \
		echo "${RED}Error: Please specify backup file with file=<path>${NC}"; \
		exit 1; \
	fi
	@echo "${CYAN}Restoring from backup...${NC}"
	${DOCKER_COMPOSE} down
	${DOCKER} run --rm \
		-v kaleidoswap-landing_traefik-certificates:/certificates \
		-v $$(pwd)/$(file):/backup.tar.gz \
		alpine tar xzf /backup.tar.gz -C /
	make prod
	@echo "${GREEN}Restore complete${NC}"

# Lint code
lint:
	@echo "${CYAN}Running linter...${NC}"
	npm run lint
	@echo "${GREEN}Linting complete${NC}"

# Run tests
test:
	@echo "${CYAN}Running tests...${NC}"
	npm test
	@echo "${GREEN}Tests complete${NC}" 