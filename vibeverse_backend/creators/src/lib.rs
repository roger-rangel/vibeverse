#[cfg(test)]
mod tests;

use candid::{CandidType, Principal};
use std::{cell::RefCell, collections::BTreeMap};
/// Stores metadata about a collection creator.
#[derive(Clone, CandidType, PartialEq, Debug)]
pub struct Creator {
    /// The display name of the creator.
    name: String,
    /// The avatar of the creator.
    avatar: String,
}

/// Maps `Principal` to the specific Creator.
type CreatorStore = BTreeMap<Principal, Creator>;

thread_local! {
    static CREATORS: RefCell<CreatorStore> = RefCell::default();
}

/// Sets the metadata for the specific creator.
pub fn set_creator_metadata(principal: Principal, name: String, avatar: String) {
    CREATORS.with(|creators| {
        let creator = Creator { name, avatar };

        let mut creators = creators.borrow_mut();
        creators.insert(principal, creator);
    })
}

pub fn creator_metadata(principal: Principal) -> Option<Creator> {
    CREATORS.with(|creators| creators.borrow().get(&principal).cloned())
}
