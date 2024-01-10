#!/bin/sh
BACKEND=vibeverse_backend
PRINCIPAL=$(dfx identity get-principal)
NETWORK=${1:-local}

# Register profile
dfx canister call $BACKEND set_creator_metadata '("Test Creator", "https://avatars.githubusercontent.com/u/13149596?v=4")' --network $NETWORK

# Creat mock data
dfx canister call $BACKEND create_collection '("Test collection", "Test collection description", true, null, null, "test")' --network $NETWORK
dfx canister call $BACKEND mint_nft '(0, (principal "'$PRINCIPAL'"), "Test #1", "Test #1 description", (opt "https://bafybeifkrr5nyop3rlbwxyvh47f5ywujlijqp5luoll7vqg335rmkp5oju.ipfs.nftstorage.link"), (opt (variant {"Video"})))' --network $NETWORK
dfx canister call $BACKEND mint_nft '(0, (principal "'$PRINCIPAL'"), "Test #2", "Test #2 description", (opt "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_5.png"), (opt (variant {"Image"})))' --network $NETWORK

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

# Community
dfx canister call $BACKEND create_community '("music-school", "AI Music School", "AI Musicians from California", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png")' --network $NETWORK
dfx canister call $BACKEND create_community '("vr-club", "Virtual Reality Club", "VR Fanatics using AI tools", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png")' --network $NETWORK
dfx canister call $BACKEND create_community '("scf-fi-movies", "Sci-FI Movies", "Sci-Fi Film Lovers", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png")' --network $NETWORK
dfx canister call $BACKEND create_community '("sf-fans", "Stable Diffusion Fans", "Stable Diffusion Fan Community", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Runway_2023-11-10T12_44_47.434Z_Erase_and_Replace_sky.png")' --network $NETWORK

# Course
dfx canister call $BACKEND create_course '("test-course", "The Current State of AI", "Test course description", (variant {"Advanced"}), "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/54a531d62eb7d502cf4977391769fca0.jpg", "Test course content", "Bronze", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/trophy_3.png")' --network $NETWORK
