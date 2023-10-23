
prepare:
	rustup target add wasm32-unknown-unknown

build:
	dfx build vibeverse_backend

test-market: 
	cargo test

clippy:
	cargo clippy --all-targets -- -D warnings

clippy-fix:
	cargo clippy --fix --all-targets -- -D warnings

format-check: 
	cargo fmt -- --check

format: 
	cargo fmt
