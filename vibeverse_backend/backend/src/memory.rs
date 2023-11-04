use candid::Principal;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager};

use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::{BTreeMap, HashSet};

use crate::types::{
    is_empty_hashset, Collection, CollectionId, Creator, Emoji, Memory, Nft, NftId, Reactions, StorablePrincipal,
};

const UPGRADES: MemoryId = MemoryId::new(0);
const CREATORS_MEMORY_ID: MemoryId = MemoryId::new(1);
const COLLECTIONS_MEMORY_ID: MemoryId = MemoryId::new(2);
const ADMINS_MEMORY_ID: MemoryId = MemoryId::new(6);

// TODO: Migrate heap states to here
#[derive(Default, Serialize, Deserialize)]
pub struct State {
    #[serde(rename = "cf")]
    pub collection_fee: u64,
    #[serde(rename = "mf")]
    pub mint_fee: u64,
    #[serde(rename = "vt")]
    pub vibe_token: Option<Principal>,
    #[serde(rename = "t")]
    pub treasury: Option<Principal>,
    #[serde(rename = "tc")]
    pub total_collections: CollectionId,
    #[serde(rename = "e", default, skip_serializing_if = "is_empty_hashset")]
    pub emojis: HashSet<Emoji>,
}

type ReactionStore = BTreeMap<NftId, Reactions>;

thread_local! {

    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static CREATORS: RefCell<StableBTreeMap<StorablePrincipal, Creator, Memory>> = RefCell::new(
        StableBTreeMap::init(get_memory(CREATORS_MEMORY_ID))
    );

    pub static ADMINS: RefCell<StableBTreeMap<StorablePrincipal, u8, Memory>> = RefCell::new(
        StableBTreeMap::init(get_memory(ADMINS_MEMORY_ID))
    );

    pub static STATE: RefCell<State> = RefCell::new(State::default());

    pub static REACTIONS: RefCell<ReactionStore> = RefCell::default();

    // NFT
    pub static COLLECTIONS: RefCell<StableBTreeMap<CollectionId, Collection, Memory>> = RefCell::new(
        StableBTreeMap::init(get_memory(COLLECTIONS_MEMORY_ID))
    );
    pub static NFTS: RefCell<BTreeMap<CollectionId, Vec<Nft>>> = RefCell::default();
    pub static COLLECTIONS_OF: RefCell<BTreeMap<Principal, Vec<CollectionId>>> = RefCell::default();
    pub static NFTS_OF: RefCell<BTreeMap<Principal, Vec<NftId>>> = RefCell::default();

}

pub fn get_upgrades_memory() -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(UPGRADES))
}

pub fn get_memory(memory_id: MemoryId) -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(memory_id))
}
