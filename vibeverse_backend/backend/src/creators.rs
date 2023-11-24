use crate::{
    memory::CREATORS,
    types::{Creator, UserId},
};

/// Sets the metadata for the specific creator.
pub fn set_creator_metadata(user_id: UserId, creator: Creator) -> Result<(), String> {
    CREATORS.with(|creators| {
        creators.borrow_mut().insert(user_id.into(), creator);
    });
    Ok(())
}

pub fn creator_metadata(user_id: UserId) -> Option<Creator> {
    CREATORS.with(|creators| creators.borrow().get(&user_id.into()))
}
