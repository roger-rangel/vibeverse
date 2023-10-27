#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
cd $SCRIPT_DIR/..

CANISTER_NAME=vibeverse_backend

if [ -z "${CARGO_HOME}" ]
then
  export CARGO_HOME="${HOME}/.cargo"
fi

if [ -z "${GIT_COMMIT_ID}" ]
then
  export GIT_COMMIT_ID=$(git rev-parse HEAD)
fi

echo Building $CANISTER_NAME canister
export RUSTFLAGS="--remap-path-prefix $(readlink -f ${SCRIPT_DIR}/..)=/build --remap-path-prefix ${CARGO_HOME}/bin=/cargo/bin --remap-path-prefix ${CARGO_HOME}/git=/cargo/git"
for l in $(ls ${CARGO_HOME}/registry/src/)
do
  export RUSTFLAGS="--remap-path-prefix ${CARGO_HOME}/registry/src/${l}=/cargo/registry/src/github ${RUSTFLAGS}"
done
cargo build --locked --target wasm32-unknown-unknown --release --package $CANISTER_NAME

echo Optimising wasm
if ! cargo install --list | grep -Fxq "ic-wasm v0.3.7:"
then
  cargo install --version 0.3.7 ic-wasm
fi
ic-wasm ./target/wasm32-unknown-unknown/release/$CANISTER_NAME.wasm -o ./target/wasm32-unknown-unknown/release/$CANISTER_NAME-opt.wasm shrink

echo Compressing wasm
mkdir -p wasms
gzip -fckn target/wasm32-unknown-unknown/release/$CANISTER_NAME-opt.wasm > ./vibeverse_backend/integration_test/wasm/$CANISTER_NAME.wasm.gz
