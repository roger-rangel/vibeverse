#!/bin/sh
BACKEND=vibeverse_backend
PRINCIPAL=$(dfx identity get-principal)
NETWORK=${1:-local}

# Register profile
dfx canister call $BACKEND set_creator_metadata '("Test Creator", "https://avatars.githubusercontent.com/u/13149596?v=4")' --network $NETWORK

# Creat mock data
dfx canister call $BACKEND create_collection '("Test collection", "Test collection description", true, null, null, "test")' --network $NETWORK
dfx canister call $BACKEND mint_nft '(0, (principal "'$PRINCIPAL'"), "Test #1", "Test #1 description", (opt "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_3.png"))' --network $NETWORK
dfx canister call $BACKEND mint_nft '(0, (principal "'$PRINCIPAL'"), "Test #2", "Test #2 description", (opt "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png"))' --network $NETWORK

# Add emojis
dfx canister call $BACKEND add_emojis '(vec { "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/psychodelic_hands.gif";
                                              "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/naruto.gif";
                                              "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/gradient_donut.gif";
                                              "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/party-blob.gif";
                                              "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/pink_heart.gif";
                                              "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/watermelon.gif";
                                              "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_3.png";
                                              "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png"
                                              })' --network $NETWORK
