use candid::Nat;
use candid::Principal;
use creators::Creator;
use ic_cdk_macros::*;
use nfts::{Collection, CollectionId, Nft, NftId};

#[update]
fn create_collection(
    name: String,
    description: String,
    transferable: bool,
    limit: Option<Nat>,
    image_url: Option<String>,
    category: String,
) -> CollectionId {
    let creator = ic_cdk::api::caller();
    nfts::create_collection(
        creator,
        name,
        description,
        transferable,
        limit,
        image_url,
        category,
    )
}

#[update]
fn update_collection_metadata(
    id: CollectionId,
    name: String,
    description: String,
    image_url: Option<String>,
    category: Option<String>,
) -> String {
    let caller = ic_cdk::api::caller();

    match nfts::update_metadata(caller, id, name, description, image_url, category) {
        Ok(_) => format!("Metadata updated successfully."),
        Err(e) => format!("Error while updating metadata: {:?}", e),
    }
}

/// Get a specific collection with the provided `CollectionId`.
#[ic_cdk_macros::query]
fn get_collection(id: CollectionId) -> Option<Collection> {
    nfts::get_collection(id)
}

#[update]
fn set_creator_metadata(name: String) -> String {
    let caller = ic_cdk::api::caller();
    creators::set_creator_metadata(caller, name);

    format!("Creator metadata set successfully.")
}

#[ic_cdk_macros::query]
fn creator_metadata() -> Option<Creator> {
    let caller = ic_cdk::api::caller();
    creators::creator_metadata(caller)
}

#[ic_cdk_macros::query]
fn collections_created_by(creator: Principal) -> Vec<Collection> {
    nfts::collections_created_by(creator)
}

#[ic_cdk_macros::query]
fn collections_created_by_caller() -> Vec<Collection> {
    let caller = ic_cdk::api::caller();
    nfts::collections_created_by(caller)
}

#[update]
fn mint_nft(
    collection_id: CollectionId,
    receiver: Principal,
    name: String,
    description: String,
    asset_url: Option<String>,
) -> Result<NftId, String> {
    let caller = ic_cdk::api::caller();
    match nfts::mint_nft(
        caller,
        receiver,
        collection_id,
        name,
        description,
        asset_url,
    ) {
        Ok(id) => Ok(id),
        Err(e) => Err(format!("Error while minting nft: {:?}", e)),
    }
}

#[update]
fn transfer_nft(collection_id: CollectionId, nft_id: Nat, receiver: Principal) -> String {
    let caller = ic_cdk::api::caller();
    match nfts::nft_transfer(caller, receiver, (collection_id, nft_id)) {
        Ok(_) => format!("Collection transfered successfully."),
        Err(e) => format!("Error while transfering the nft: {:?}", e),
    }
}

#[ic_cdk_macros::query]
fn nfts_of_user(user: Principal) -> Vec<Nft> {
    nfts::nfts_of_user(user)
}

#[ic_cdk_macros::query]
fn nfts_of_caller() -> Vec<Nft> {
    let caller = ic_cdk::api::caller();
    nfts::nfts_of_user(caller)
}

#[ic_cdk_macros::query]
fn nfts(collection_id: CollectionId, start_index: Option<u128>, count: Option<u128>) -> Vec<Nft> {
    nfts::nfts_within_collection(collection_id, start_index, count)
}

#[ic_cdk_macros::query]
fn all_nfts(start_index: Option<u128>, count: Option<u128>) -> Vec<Nft> {
    let start_index = start_index.unwrap_or_default();
    if let Some(count) = count {
        nfts::all_nfts().iter().cloned().skip(start_index.try_into().unwrap()).take(count.try_into().unwrap()).collect()
    }else {
        nfts::all_nfts().iter().cloned().skip(start_index.try_into().unwrap()).collect()
    }
}

#[ic_cdk_macros::query]
fn collections(start_index: Option<u128>, count: Option<u128>) -> Vec<Collection> {
    nfts::all_collections(start_index, count)
}

#[ic_cdk_macros::query]
fn collection_count() -> CollectionId {
    nfts::collection_count()
}

// Administrative functions

#[update]
fn set_collection_fee(fee: u64) -> Result<(), &'static str> {
    let caller = ic_cdk::api::caller();
    nfts::administrative::set_collection_fee(caller, fee)
}

#[update]
fn set_mint_fee(fee: u64) -> Result<(), &'static str> {
    let caller = ic_cdk::api::caller();
    nfts::administrative::set_mint_fee(caller, fee)
}

#[update]
fn set_vibe_token(vibe: Principal) -> Result<(), &'static str> {
    let caller = ic_cdk::api::caller();
    nfts::administrative::set_vibe_token(caller, vibe)
}

#[update]
fn set_admin(admin: Principal) -> Result<(), &'static str> {
    nfts::administrative::set_admin(admin)
}

#[ic_cdk_macros::query]
fn collection_fee() -> u64 {
    nfts::administrative::collection_fee()
}

#[ic_cdk_macros::query]
fn mint_fee() -> u64 {
    nfts::administrative::mint_fee()
}

#[ic_cdk_macros::query]
fn vibe_token() -> Option<Principal> {
    nfts::administrative::vibe_token()
}

#[ic_cdk_macros::query]
fn admin() -> Option<Principal> {
    nfts::administrative::admin()
}

ic_cdk::export_candid!();
