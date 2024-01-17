use crate::{
    memory::CREATORS,
    types::{Creator, StorableNat, UserId},
    Badge,
};
use itertools::Itertools;

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

pub fn add_score(user_id: UserId, score: u8) -> Result<StorableNat, String> {
    if let Some(mut creator) = creator_metadata(user_id) {
        let updated = creator.add_score(score);
        set_creator_metadata(user_id, creator.clone())?;
        Ok(updated)
    } else {
        Ok(Default::default())
    }
}

pub fn top_n_creators(n: usize) -> Vec<(UserId, Creator, Badge)> {
    CREATORS.with(|creators| {
        creators
            .borrow()
            .iter()
            .map(|(user_id, creator)| (Into::<UserId>::into(user_id.clone()), creator.clone(), creator.badge()))
            // sort by score
            .sorted_by(|(_, a, _), (_, b, _)| b.score.cmp(&a.score))
            // take top n
            .take(n)
            .collect()
    })
}
