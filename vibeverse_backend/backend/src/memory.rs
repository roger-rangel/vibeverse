use candid::{Nat, Principal};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager};

use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::BTreeMap;

use crate::types::{Collection, CollectionId, Creator, Memory, Nft, NftId, StorableNat, StorablePrincipal};

const UPGRADES: MemoryId = MemoryId::new(0);

// TODO: Migrate heap states to here
#[derive(Serialize, Deserialize)]
pub struct State {
    collection_fee: u64,
}

thread_local! {

    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static COLLECTION_FEE: RefCell<u64> = RefCell::default();
    pub static MINT_FEE: RefCell<u64> = RefCell::default();
    pub static VIBE_TOKEN: RefCell<Option<Principal>> = RefCell::default();
    pub static ADMIN: RefCell<Option<Principal>> = RefCell::default();


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
    pub static COLLECTION_COUNT: RefCell<StorableNat> = RefCell::new(Nat::from(0).into());

    // Test
    pub static STATE: RefCell<State> = RefCell::new(State::default());
}

pub fn get_upgrades_memory() -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(UPGRADES))
}

fn get_memory(memory_id: MemoryId) -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(memory_id))
}

impl Default for State {
    fn default() -> Self {
        Self { collection_fee: 0 }
    }
}
