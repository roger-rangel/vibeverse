use candid::Principal;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager};

use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::BTreeMap;

use crate::types::{Collection, CollectionId, Creator, Memory, Nft, NftId, StorablePrincipal};

const UPGRADES: MemoryId = MemoryId::new(0);

// TODO: Migrate heap states to here
#[derive(Default, Serialize, Deserialize)]
pub struct State {
    pub collection_fee: u64,
    pub mint_fee: u64,
    pub vibe_token: Option<Principal>,
    pub admin: Option<Principal>,
    pub total_collections: CollectionId,
}

thread_local! {

    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static CREATORS: RefCell<StableBTreeMap<StorablePrincipal, Creator, Memory>> = RefCell::new(
        StableBTreeMap::init(get_memory(MemoryId::new(1)))
    );
    // NFT
    pub static COLLECTIONS: RefCell<StableBTreeMap<CollectionId, Collection, Memory>> = RefCell::new(
        StableBTreeMap::init(get_memory(MemoryId::new(1)))
    );
    pub static NFTS: RefCell<BTreeMap<CollectionId, Vec<Nft>>> = RefCell::default();
    pub static COLLECTIONS_OF: RefCell<BTreeMap<Principal, Vec<CollectionId>>> = RefCell::default();
    pub static NFTS_OF: RefCell<BTreeMap<Principal, Vec<NftId>>> = RefCell::default();

    pub static STATE: RefCell<State> = RefCell::new(State::default());
}

pub fn get_upgrades_memory() -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(UPGRADES))
}

fn get_memory(memory_id: MemoryId) -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(memory_id))
}
