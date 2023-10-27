use candid::{Nat, Principal};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager};

use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::BTreeMap;

use crate::types::{Collection, CollectionId, Creator, Memory, Nft, NftId};

const UPGRADES: MemoryId = MemoryId::new(0);
const PAGE_VIEWS: MemoryId = MemoryId::new(1);

#[derive(Serialize, Deserialize)]
pub struct State {
    // Data that lives on the heap.
    // This is an example for data that would need to be serialized/deserialized
    // on every upgrade for it to be persisted.
    data_on_the_heap: Vec<u8>,

    // An example `StableBTreeMap`. Data stored in `StableBTreeMap` doesn't need to
    // be serialized/deserialized in upgrades, so we tell serde to skip it.
    #[serde(skip, default = "init_stable_data")]
    stable_data: StableBTreeMap<u128, u128, Memory>,
}

thread_local! {

    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static COLLECTION_FEE: RefCell<u64> = RefCell::default();
    pub static MINT_FEE: RefCell<u64> = RefCell::default();
    pub static VIBE_TOKEN: RefCell<Option<Principal>> = RefCell::default();
    pub static ADMIN: RefCell<Option<Principal>> = RefCell::default();

    pub static CREATORS: RefCell<BTreeMap<Principal, Creator>> = RefCell::default();
    // NFT
    pub static COLLECTIONS: RefCell<BTreeMap<CollectionId, Collection>> = RefCell::default();
    pub static NFTS: RefCell<BTreeMap<CollectionId, Vec<Nft>>> = RefCell::default();
    pub static COLLECTIONS_OF: RefCell<BTreeMap<Principal, Vec<CollectionId>>> = RefCell::default();
    pub static COLLECTION_COUNT: RefCell<CollectionId> = RefCell::new(Nat::from(0));
    pub static NFTS_OF: RefCell<BTreeMap<Principal, Vec<NftId>>> = RefCell::default();

    // Test
    pub static STATE: RefCell<State> = RefCell::new(State::default());
}

pub fn get_upgrades_memory() -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(UPGRADES))
}

fn get_memory(memory_id: MemoryId) -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(memory_id))
}

fn init_stable_data() -> StableBTreeMap<u128, u128, Memory> {
    StableBTreeMap::init(get_memory(PAGE_VIEWS))
}

impl Default for State {
    fn default() -> Self {
        Self {
            data_on_the_heap: vec![],
            stable_data: init_stable_data(),
        }
    }
}
