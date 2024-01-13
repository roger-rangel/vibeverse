
BACKEND=vibeverse_backend
FRONTEND=vibeverse_assets
TOKEN=vibeverse_token

prepare:
	rustup target add wasm32-unknown-unknown

build:
	dfx build $(BACKEND) --network=local

build-staging:
	dfx build $(BACKEND) --network=staging

build-ic:
	dfx build $(BACKEND) --network=ic

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
	dfx generate $(TOKEN)

generate-wasm:
	scripts/generate-wasm.sh

generate: build
	make generate-did
	make generate-declaration
# make generate-wasm

start:
	dfx start --background --clean

create:
	dfx create canister $(BACKEND)

deploy-backend: build
	make generate-did
	dfx deploy $(BACKEND)

deploy-ii:
	dfx deploy internet_identity

deploy-token:
	dfx deploy vibeverse_token

deploy: deploy-backend
	make deploy-ii
	make deploy-token

redeploy: build
	make generate-did
	dfx canister install $(BACKEND) --mode=reinstall

redeploy-staging: build-staging
	make generate-did
	dfx canister install $(BACKEND) --mode=reinstall --network=staging
	dfx build $(FRONTEND) --network=staging
	dfx canister install $(FRONTEND) --mode=reinstall --network=staging

redeploy-ic: build-ic
	make generate-did
	dfx canister install $(BACKEND) --mode=reinstall --network=ic
	dfx build $(FRONTEND) --network=ic
	dfx canister install $(FRONTEND) --mode=reinstall --network=ic

upgrade: build
	make generate-did
	dfx canister install $(BACKEND) --mode=upgrade	

upgrade-staging: build-staging
	make generate-did
	dfx canister install $(BACKEND) --mode=upgrade --network=staging
	dfx build $(FRONTEND) --network=staging
	dfx canister install $(FRONTEND) --mode=upgrade --network=staging

upgrade-ic: build-ic
	make generate-did
	dfx canister install $(BACKEND) --mode=upgrade --network=ic
	dfx build $(FRONTEND) --network=ic
	dfx canister install $(FRONTEND) --mode=upgrade --network=ic

testdata:
	scripts/deploy-test-data.sh

claim:
	dfx canister call $(BACKEND) claim_rewards 