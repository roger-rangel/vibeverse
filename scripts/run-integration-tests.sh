#!/bin/bash

SCRIPT=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
cd $SCRIPT_DIR/..

BUILD_WASMS=${1:-true}
TEST_THREADS=${2:-2}
TESTNAME=$3

if [[ "$OSTYPE" == "linux-gnu"* || "$RUNNER_OS" == "Linux" ]]
then
    PLATFORM=linux
elif [[ "$OSTYPE" == "darwin"* || "$RUNNER_OS" == "macOS" ]]
then
    PLATFORM=darwin
else
    echo "OS not supported: ${OSTYPE:-$RUNNER_OS}"
    exit 1
fi

if [ $BUILD_WASMS = true ]
then
    ./scripts/generate-wasm.sh
fi

# Go to the [releases overview](https://dashboard.internetcomputer.org/releases) and copy the latest replica binary revision
# or find commits from this https://github.com/dfinity/pocketic
COMMIT_ID=69e1408347723dbaa7a6cd2faa9b65c42abbe861

cd vibeverse_backend/integration_tests/local-bin
echo "PocketIC download starting"
curl -sO https://download.dfinity.systems/ic/$COMMIT_ID/binaries/x86_64-$PLATFORM/pocket-ic.gz || exit 1
gzip -df pocket-ic.gz
chmod +x pocket-ic
echo "PocketIC download completed"
cd ../../..

./scripts/download-nns-canister-wasm.sh icp_ledger ledger-canister_notify-method $COMMIT_ID
./scripts/download-nns-canister-wasm.sh cycles_minting_canister cycles-minting-canister $COMMIT_ID
./scripts/download-nns-canister-wasm.sh sns_wasm sns-wasm-canister $COMMIT_ID
./scripts/download-nns-canister-wasm.sh icrc1_ledger ic-icrc1-ledger $COMMIT_ID

cargo test --package integration_tests $TESTNAME -- --test-threads $TEST_THREADS
