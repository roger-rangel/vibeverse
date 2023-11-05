
BACKEND=vibeverse_backend

prepare:
	rustup target add wasm32-unknown-unknown

build:
	dfx build $(BACKEND)

test-unit: 
	cargo test --package $(BACKEND)

test-e2e:
	./scripts/run-integration-tests.sh

clippy:
	cargo clippy --all-targets -- -D warnings

clippy-fix:
	cargo clippy --fix --all-targets -- -D warnings

format-check: 
	cargo fmt -- --check

format: 
	cargo fmt

generate-did:
	scripts/generate-did.sh
	
generate-declaration:
	dfx generate $(BACKEND)

generate-wasm:
	scripts/generate-wasm.sh

generate: build
	make generate-did
	make generate-declaration
# make generate-wasm

start:
	dfx start --background --clean

deploy-backend: build
	dfx deploy $(BACKEND)
	
db: deploy-backend

upgrade-backend: build
	dfx canister install $(BACKEND) --mode=upgrade
	
ub: upgrade-backend

deploy-ii:
	dfx deploy internet_identity

deploy-testdata:
	scripts/deploy-test-data.sh
