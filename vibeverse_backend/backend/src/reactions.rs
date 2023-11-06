use candid::{CandidType, Nat};

use crate::{
    memory::{METADATA, STATE},
    types::{Emoji, NftId, Reaction, UserId},
};

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

    METADATA.with(|s| {
        let mut state = s.borrow_mut();
        let metadata = state.entry(nft_id.clone()).or_default();

        let result = if let Some((_, users)) = metadata.reactions.iter_mut().find(|(r, _)| *r == emoji) {
            if users.contains(&user_id) {
                users.remove(&user_id);
                AddRemoveReactionResult::Removed
            } else {
                users.insert(user_id);
                AddRemoveReactionResult::Added
            }
        } else {
            metadata.reactions.push((emoji, vec![user_id].into_iter().collect()));
            AddRemoveReactionResult::Added
        };

        Ok(result)
    })
}

#[allow(dead_code)]
pub fn get_reactions(nft_id: NftId) -> Vec<Reaction> {
    METADATA.with(|reactions| {
        let reactions = reactions.borrow();
        reactions.get(&nft_id).cloned().unwrap_or_default().reactions
    })
}

// Register emojis by admin
pub fn register_emojis(emojis_to_add: Vec<Emoji>) -> Result<Nat, String> {
    let mut added = Nat::from(0);
    STATE.with(|state| {
        for emoji in emojis_to_add {
            if state.borrow_mut().emojis.insert(emoji) {
                added += Nat::from(1);
            }
        }
        Ok(added)
    })
}

// Unregister emojis by admin
pub fn unregister_emojis(emojis_to_remove: Vec<Emoji>) -> Result<Nat, String> {
    let mut removed = Nat::from(0);
    STATE.with(|state| {
        for emoji in emojis_to_remove {
            if state.borrow_mut().emojis.remove(&emoji) {
                removed += Nat::from(1);
            }
        }
        Ok(removed)
    })
}

// Return available emojis
// TODO: Check if pagination is needed
pub fn emojis() -> Vec<Emoji> {
    STATE.with(|state| state.borrow().emojis.iter().cloned().collect())
}

pub fn is_available_emoji(emoji: &Emoji) -> bool {
    STATE.with(|state| state.borrow().emojis.contains(emoji))
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
        assert_eq!(reactions.len(), 1);
        assert_eq!(reactions.get(0).unwrap().1.len(), 2);
    }
}
