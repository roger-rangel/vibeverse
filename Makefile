
prepare:
	rustup target add wasm32-unknown-unknown

build:
	dfx build vibeverse_backend

test-unit: 
	cargo test --package vibeverse_backend

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
	dfx generate vibeverse_backend

generate-wasm:
	scripts/generate-wasm.sh

generate: generate-did
	make generate-declaration
	make generate-wasm