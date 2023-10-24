
prepare:
	rustup target add wasm32-unknown-unknown

build:
	dfx build vibeverse_backend

test: 
	cargo test

clippy:
	cargo clippy --all-targets -- -D warnings

clippy-fix:
	cargo clippy --fix --all-targets -- -D warnings

format-check: 
	cargo fmt -- --check

format: 
	cargo fmt

generate-did:
	candid-extractor target/wasm32-unknown-unknown/release/vibeverse_backend.wasm > vibeverse_backend/vibeverse_backend.did
	
generate-declaration:
	dfx generate vibeverse_backend

generate: generate-did
	make generate-declaration
