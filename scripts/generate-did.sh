#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
cd $SCRIPT_DIR/..

echo Generating vibeverse_backend did file

if ! cargo install --list | grep -Fxq "candid-extractor v0.1.2:"
then
  cargo install --version 0.1.2 candid-extractor
fi

candid-extractor target/wasm32-unknown-unknown/release/vibeverse_backend.wasm > vibeverse_backend/backend/vibeverse_backend.did