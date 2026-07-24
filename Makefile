lint-frontend:
	make -C frontend lint

install:
	npm ci
	cd frontend && npm ci

build:
	rm -rf frontend/dist
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 6001 -s ./frontend/dist

start:
	make start-backend

dev:
	make start-backend & make start-frontend

develop:
	make start-backend & make start-frontend

.PHONY: install build start dev