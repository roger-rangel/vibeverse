#!/bin/sh
BACKEND=vibeverse_backend
PRINCIPAL=$(dfx identity get-principal)

dfx canister call $BACKEND set_creator_metadata '("Test Creator", "https://avatars.githubusercontent.com/u/13149596?v=4")'

dfx canister call $BACKEND create_collection '("Test collection", "Test collection description", true, null, null, "test")'
dfx canister call $BACKEND mint_nft '(0, (principal "'$PRINCIPAL'"), "Test #1", "Test #1 description", (opt "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_3.png"))'
dfx canister call $BACKEND mint_nft '(0, (principal "'$PRINCIPAL'"), "Test #2", "Test #2 description", (opt "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png"))'