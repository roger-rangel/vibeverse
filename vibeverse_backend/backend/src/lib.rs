use candid::Nat;
use candid::Principal;

use ic_cdk_macros::{query, update};
mod administrative;
mod admins;
mod creators;
#[cfg(test)]
mod creators_tests;
mod guards;
mod lifecycle;
mod memory;
mod nfts;
mod types;

#[cfg(test)]
mod nfts_tests;

use guards::*;
use types::*;

#[update]
pub fn create_collection(
    name: String,
    description: String,
    transferable: bool,
    limit: Option<Nat>,
    image_url: Option<String>,
    category: String,
) -> Result<CollectionId, String> {
    let creator = ic_cdk::api::caller();
    let id = nfts::create_collection(creator, name, description, transferable, limit, image_url, category);

    Ok(id)
}

#[update]
pub fn update_collection_metadata(
    id: CollectionId,
    name: String,
    description: String,
    image_url: Option<String>,
    category: Option<String>,
) -> Result<(), String> {
    let caller = ic_cdk::api::caller();

    match nfts::update_metadata(caller, id, name, description, image_url, category) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error while updating metadata: {:?}", e)),
    }
}

/// Get a specific collection with the provided `CollectionId`.
#[query]
pub fn get_collection(id: CollectionId) -> Option<Collection> {
    nfts::get_collection(id)
}

#[update]
pub fn set_creator_metadata(name: String, avatar: String) -> Result<(), String> {
    let caller = ic_cdk::api::caller();

    creators::set_creator_metadata(caller, name, avatar)
}

#[query]
pub fn creator_metadata(creator: Principal) -> Option<Creator> {
    creators::creator_metadata(creator)
}

#[query]
pub fn collections_created_by(creator: Principal) -> Vec<Collection> {
    nfts::collections_created_by(creator)
}

#[query]
pub fn collections_created_by_caller() -> Vec<Collection> {
    let caller = ic_cdk::api::caller();
    nfts::collections_created_by(caller)
}

#[update]
pub fn mint_nft(
    collection_id: CollectionId,
    receiver: Principal,
    name: String,
    description: String,
    asset_url: Option<String>,
) -> Result<NftId, String> {
    let caller = ic_cdk::api::caller();
    match nfts::mint_nft(caller, receiver, collection_id, name, description, asset_url) {
        Ok(id) => Ok(id),
        Err(e) => Err(format!("Error while minting nft: {:?}", e)),
    }
}

#[update]
pub fn transfer_nft(collection_id: CollectionId, nft_id: Nat, receiver: Principal) -> Result<(), String> {
    let caller = ic_cdk::api::caller();
    match nfts::nft_transfer(caller, receiver, (collection_id, nft_id.into())) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error while transfering the nft: {:?}", e)),
    }
}

#[query]
pub fn nfts_of_user(user: Principal) -> Vec<Nft> {
    nfts::nfts_of_user(user)
}

#[query]
pub fn nfts_of_caller() -> Vec<Nft> {
    let caller = ic_cdk::api::caller();
    nfts::nfts_of_user(caller)
}

#[query]
pub fn nfts(collection_id: CollectionId, start_index: Option<u128>, count: Option<u128>) -> Vec<Nft> {
    nfts::nfts_within_collection(collection_id, start_index, count)
}

#[query]
pub fn all_nfts(start_index: Option<u128>, count: Option<u128>) -> Vec<Nft> {
    let start_index = start_index.unwrap_or_default();
    if let Some(count) = count {
        nfts::all_nfts()
            .iter()
            .skip(start_index.try_into().unwrap())
            .take(count.try_into().unwrap())
            .cloned()
            .collect()
    } else {
        nfts::all_nfts()
            .iter()
            .skip(start_index.try_into().unwrap())
            .cloned()
            .collect()
    }
}

#[query]
pub fn collections(start_index: Option<u128>, count: Option<u128>) -> Vec<Collection> {
    nfts::all_collections(start_index, count)
}

#[query]
pub fn collection_count() -> CollectionId {
    nfts::collection_count()
}

// Administrative functions

#[update(guard = "caller_is_admin")]
pub fn set_collection_fee(fee: u64) -> Result<(), &'static str> {
    administrative::set_collection_fee(fee)
}

#[update(guard = "caller_is_admin")]
pub fn set_mint_fee(fee: u64) -> Result<(), &'static str> {
    administrative::set_mint_fee(fee)
}

#[update(guard = "caller_is_admin")]
pub fn set_vibe_token(vibe: Principal) -> Result<(), &'static str> {
    administrative::set_vibe_token(vibe)
}

#[update(guard = "caller_is_admin")]
pub fn add_admin(admin: Principal) -> Result<(), String> {
    let caller = ic_cdk::api::caller();
    admins::add_admins(caller, [admin].to_vec())
}

#[update(guard = "caller_is_admin")]
pub fn remove_admin(admin: Principal) -> Result<(), String> {
    let caller = ic_cdk::api::caller();
    admins::remove_admins(caller, [admin].to_vec())
}

#[query]
pub fn collection_fee() -> u64 {
    administrative::collection_fee()
}

#[query]
pub fn mint_fee() -> u64 {
    administrative::mint_fee()
}

#[query]
pub fn vibe_token() -> Option<Principal> {
    administrative::vibe_token()
}

#[query]
pub fn is_admin(user: Principal) -> bool {
    admins::is_admin(user)
}

ic_cdk::export_candid!();
