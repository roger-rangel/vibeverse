use crate::{
    memory::CREATORS,
    types::{Creator, StorableNat, UserId},
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

#[repr(u8)]
pub enum Score {
    CreateCollection = 2,
    MintNft = 1,
    CreateCourse = 3,
    CreateCommunity = 5,
}

pub fn add_score(user_id: UserId, score: Score) -> Result<StorableNat, String> {
    CREATORS.with(|creators| {
        if let Some(mut creator) = creators.borrow_mut().get(&user_id.into()) {
            let updated = creator.add_score((score as u8).into());
            set_creator_metadata(user_id, creator.clone())?;
            Ok(updated)
        } else {
            Ok(Default::default())
        }
    })
}
