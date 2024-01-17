#!/bin/sh
BACKEND=vibeverse_backend
PRINCIPAL=$(dfx identity get-principal)
NETWORK=${1:-local}
VIBE_TOKEN=$(dfx canister id vibeverse_token --network $NETWORK)

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
dfx canister call $BACKEND create_community '("white-mirror", "White Mirror", "White Mirror fans", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Screenshot_2023-08-26_at_5_50_29_PM-removebg-preview.png", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3_9.27.29_PM.webp", (vec { "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/vaporwave_room.mp4"; "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/cyborg_creationmp4.mp4"}), "https://www.whitemirror.xyz/")' --network $NETWORK
dfx canister call $BACKEND create_community '("curious-refuge", "Curious Refuge", "Curious Refuge", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Curious_Refuge_Logo_White_Flat.png", "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_0_9.27.29_PM.webp", (vec { "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/vaporwave_room.mp4"; "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/cyborg_creationmp4.mp4"}), "https://www.curiousrefuge.com/")' --network $NETWORK

# Course
dfx canister call $BACKEND create_course '("prompting_test", "What is prompt?", "Test course description", (variant {"Advanced"}), "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/54a531d62eb7d502cf4977391769fca0.jpg", "Test course content")' --network local
dfx canister call $BACKEND create_course '("storytelling_test", "Introduction to AI", "Test course description", (variant {"Advanced"}), "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/54a531d62eb7d502cf4977391769fca0.jpg", "Test course content")' --network local

# Vibe token
dfx canister call $BACKEND set_vibe_token '(principal "'$VIBE_TOKEN'")' --network $NETWORK