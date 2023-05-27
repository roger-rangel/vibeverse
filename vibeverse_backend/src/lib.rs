use candid::Nat;
use creators::Creator;
use ic_cdk::export::Principal;
use ic_cdk_macros::*;
use nfts::{Collection, CollectionId};

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

    format!("Collection created successfully.")
}

#[update]
fn update_collection_metadata(
    id: CollectionId,
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

/// Get a specific collection with the provided `CollectionId`.
#[ic_cdk_macros::query]
fn get_collection(id: CollectionId) -> Option<Collection> {
    nfts::do_get_collection(id)
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
fn get_collections_of_creator(creator: Principal) -> Vec<Collection> {
    nfts::do_get_collections_of_creator(creator)
}

#[ic_cdk_macros::query]
fn get_collections_of_caller() -> Vec<Collection> {
    let caller = ic_cdk::api::caller();
    nfts::do_get_collections_of_creator(caller)
}

/*
#[update]
fn mint_nft(nft: CollectionId, receiver: Principal) -> String {
    let caller = ic_cdk::api::caller();
    match nfts::do_mint_nft(caller, receiver, nft) {
        Ok(_) => format!("Collection minted successfully."),
        Err(e) => format!("Error while minting nft: {:?}", e),
    }
}

#[update]
fn transfer_nft(nft: CollectionId, receiver: Principal) -> String {
    let caller = ic_cdk::api::caller();
    match nfts::do_nft_transfer(caller, receiver, nft) {
        Ok(_) => format!("Collection transfered successfully."),
        Err(e) => format!("Error while transfering the nft: {:?}", e),
    }
}

#[ic_cdk_macros::query]
fn get_nfts_of_user(user: Principal) -> Vec<Collection> {
    nfts::do_get_nfts_of_user(user)
}
*/

#[ic_cdk_macros::query]
fn get_collection_count() -> CollectionId {
    nfts::do_get_collection_count()
}
