use candid::Nat;
use creators::Creator;
use ic_cdk::export::Principal;
use ic_cdk_macros::*;
use nfts::{Nft, NftId};

#[update]
fn create_collection(
    name: String,
    description: String,
    transferable: bool,
    limit: Option<Nat>,
    image_url: Option<String>,
) -> String {
    let creator = ic_cdk::api::caller();
    nfts::do_create_collection(creator, name, description, transferable, limit, image_url);

    format!("Nft created successfully.")
}

#[update]
fn update_nft_metadata(
    id: NftId,
    name: String,
    description: String,
    image_url: Option<String>,
) -> String {
    let caller = ic_cdk::api::caller();

    match nfts::do_update_metadata(caller, id, name, description, image_url) {
        Ok(_) => format!("Metadata updated successfully."),
        Err(e) => format!("Error while updating metadata: {:?}", e),
    }
}

/// Get a specific nft with the provided `NftId`.
#[ic_cdk_macros::query]
fn get_nft(id: NftId) -> Option<Nft> {
    nfts::do_get_nft(id)
}

#[update]
fn set_creator_metadata(name: String) -> String {
    let caller = ic_cdk::api::caller();
    creators::do_set_creator_metadata(caller, name);

    format!("Creator metadata set successfully.")
}

#[ic_cdk_macros::query]
fn get_creator_metadata() -> Option<Creator> {
    let caller = ic_cdk::api::caller();
    creators::do_get_creator_metadata(caller)
}

#[ic_cdk_macros::query]
fn get_nfts_of_creator(creator: Principal) -> Vec<Nft> {
    nfts::do_get_nfts_of_creator(creator)
}

#[ic_cdk_macros::query]
fn get_nfts_of_caller() -> Vec<Nft> {
    let caller = ic_cdk::api::caller();
    nfts::do_get_nfts_of_creator(caller)
}

#[update]
fn mint_nft(nft: NftId, receiver: Principal) -> String {
    let caller = ic_cdk::api::caller();
    match nfts::do_mint_nft(caller, receiver, nft) {
        Ok(_) => format!("Nft minted successfully."),
        Err(e) => format!("Error while minting nft: {:?}", e),
    }
}

#[update]
fn transfer_nft(nft: NftId, receiver: Principal) -> String {
    let caller = ic_cdk::api::caller();
    match nfts::do_transfer_nft(caller, receiver, nft) {
        Ok(_) => format!("Nft transfered successfully."),
        Err(e) => format!("Error while transfering the nft: {:?}", e),
    }
}

#[ic_cdk_macros::query]
fn get_nfts_of_user(user: Principal) -> Vec<Nft> {
    nfts::do_get_nfts_of_user(user)
}

#[ic_cdk_macros::query]
fn get_nft_count() -> NftId {
    nfts::do_get_nft_count()
}
