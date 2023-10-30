use candid::Principal;

use crate::{memory::CREATORS, types::Creator};

/// Sets the metadata for the specific creator.
pub fn set_creator_metadata(caller: Principal, name: String, avatar: String) -> Result<(), String> {
    CREATORS.with(|creators| {
        let creator = Creator { name, avatar };

        let mut creators = creators.borrow_mut();
        creators.insert(caller.into(), creator);
    });
    Ok(())
}

pub fn creator_metadata(principal: Principal) -> Option<Creator> {
    CREATORS.with(|creators| creators.borrow().get(&principal.into()))
}
