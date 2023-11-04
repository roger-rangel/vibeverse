use std::{
    cell::RefCell,
    collections::{BTreeMap, HashSet},
};

use candid::{CandidType, Nat};

use crate::types::{Emoji, NftId, Reaction, Reactions, UserId};

type ReactionStore = BTreeMap<NftId, Reactions>;
type EmjoiStore = HashSet<String>;

thread_local! {
    static REACTIONS: RefCell<ReactionStore> = RefCell::default();
    static EMOJIS: RefCell<EmjoiStore> = RefCell::default();
}

#[derive(Debug, CandidType)]
#[repr(u8)]
pub enum AddRemoveReactionResult {
    Added,
    Removed,
}

pub fn add_remove_reaction(nft_id: NftId, user_id: UserId, emoji: Emoji) -> Result<AddRemoveReactionResult, String> {
    if !is_available_emoji(&emoji) {
        return Err(format!("Emoji {} is not available.", emoji));
    }

    REACTIONS.with(|reactions| {
        let mut reactions = reactions.borrow_mut();
        let nft_reactions = reactions.entry(nft_id.clone()).or_default();

        let result = if let Some((_, users)) = nft_reactions.iter_mut().find(|(r, _)| *r == emoji) {
            if users.contains(&user_id) {
                users.remove(&user_id);
                AddRemoveReactionResult::Removed
            } else {
                users.insert(user_id);
                AddRemoveReactionResult::Added
            }
        } else {
            nft_reactions.push((emoji, vec![user_id].into_iter().collect()));
            AddRemoveReactionResult::Added
        };

        Ok(result)
    })
}

pub fn get_reactions(nft_id: NftId) -> Vec<Reaction> {
    REACTIONS.with(|reactions| {
        let reactions = reactions.borrow();
        reactions.get(&nft_id).cloned().unwrap_or_default()
    })
}

// Register emojis by admin
pub fn register_emojis(emojis_to_add: Vec<Emoji>) -> Result<Nat, String> {
    let mut added = Nat::from(0);
    EMOJIS.with(|emojis| {
        let mut emojis = emojis.borrow_mut();
        for emoji in emojis_to_add {
            // if emoji.len() > MAX_EMOJI_LENGTH_BYTES {
            //     return Err(format!(
            //         "Emoji {} is too long. Max length is {} bytes.",
            //         emoji, MAX_EMOJI_LENGTH_BYTES
            //     ));
            // }
            if emojis.insert(emoji) {
                added += Nat::from(1);
            }
        }
        Ok(added)
    })
}

// Unregister emojis by admin
pub fn unregister_emojis(emojis_to_remove: Vec<Emoji>) -> Result<Nat, String> {
    let mut removed = Nat::from(0);
    EMOJIS.with(|emojis| {
        let mut emojis = emojis.borrow_mut();
        for emoji in emojis_to_remove {
            if emojis.remove(&emoji) {
                removed += Nat::from(1);
            }
        }
        Ok(removed)
    })
}

// Return available emojis
// TODO: Check if pagination is needed
pub fn emojis() -> Vec<Emoji> {
    EMOJIS.with(|emojis| emojis.borrow().iter().cloned().collect())
}

pub fn is_available_emoji(emoji: &Emoji) -> bool {
    EMOJIS.with(|emojis| emojis.borrow().contains(emoji))
}

#[cfg(test)]
mod tests {
    use candid::Principal;

    use super::*;

    const ALI: Principal = Principal::from_slice(&[0; 24]);
    const BOB: Principal = Principal::from_slice(&[1; 24]);

    #[test]
    fn test_is_available_emoji() {
        register_emojis(vec!["🐶".to_string(), "🐱".to_string()]).unwrap();
        assert!(is_available_emoji(&String::from("🐶")));
        assert!(!is_available_emoji(&String::from("🚀")));

        unregister_emojis(vec!["🐶".to_string()]).unwrap();
        assert!(!is_available_emoji(&String::from("🐶")));

        let emojis = emojis();
        assert_eq!(emojis.len(), 1);
        assert!(emojis.contains(&String::from("🐱")));
    }

    #[test]
    fn test_add_reaction() {
        register_emojis(vec!["🐶".to_string(), "🐱".to_string()]).unwrap();
        let nft_id: NftId = (Nat::from(1).into(), Nat::from(1).into());

        add_remove_reaction(nft_id.clone(), ALI, String::from("🐶")).unwrap();
        let reactions = get_reactions(nft_id.clone());
        assert_eq!(reactions.len(), 1);
        assert_eq!(reactions[0].0, String::from("🐶"));

        add_remove_reaction(nft_id.clone(), BOB, String::from("🐶")).unwrap();
        let reactions = get_reactions(nft_id.clone());
        assert_eq!(reactions.len(), 2);
    }
}
