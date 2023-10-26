use std::{
    cell::RefCell,
    collections::{BTreeMap, BTreeSet},
};

use candid::{CandidType, Nat, Principal};

use nfts::NftId;

const MAX_EMOJI_LENGTH_BYTES: usize = 40;

#[derive(CandidType, Clone, Debug, Ord, PartialOrd, Eq, PartialEq, Hash)]
pub struct Reaction {
    principal: Principal,
    emoji: String,
}

impl Reaction {
    pub fn new(principal: Principal, emoji: String) -> Reaction {
        Reaction { principal, emoji }
    }

    pub fn is_valid(&self) -> bool {
        is_available_emoji(&self.emoji)
    }
}

type ReactionStore = BTreeMap<NftId, Vec<Reaction>>;
type EmjoiStore = BTreeSet<String>;

thread_local! {
    static REACTIONS: RefCell<ReactionStore> = RefCell::default();
    static EMOJIS: RefCell<EmjoiStore> = RefCell::default();
}

pub fn add_reaction(nft_id: NftId, reaction: Reaction) -> Result<(), String> {
    // check if the reaction is valid
    if !reaction.is_valid() {
        return Err(format!("Reaction {} is not valid.", reaction.emoji));
    }

    REACTIONS.with(|reactions| {
        let mut reactions = reactions.borrow_mut();
        let reactions_for_nft = reactions.entry(nft_id.clone()).or_insert_with(Vec::new);
        if reactions_for_nft.contains(&reaction) {
            return Err(format!(
                "Reaction {} already exists for NFT {}.",
                reaction.emoji, nft_id.1
            ));
        }
        reactions_for_nft.push(reaction);
        Ok(())
    })
}

pub fn remove_reaction(nft_id: NftId, reaction: Reaction) -> Result<(), String> {
    // check if the reaction is valid
    if !reaction.is_valid() {
        return Err(format!("Reaction {} is not valid.", reaction.emoji));
    }

    REACTIONS.with(|reactions| {
        let mut reactions = reactions.borrow_mut();
        let reactions_for_nft = reactions.entry(nft_id.clone()).or_insert_with(Vec::new);
        if !reactions_for_nft.contains(&reaction) {
            return Err(format!(
                "Reaction {} does not exist for NFT {}.",
                reaction.emoji, nft_id.1
            ));
        }
        reactions_for_nft.retain(|r| r != &reaction);
        Ok(())
    })
}

pub fn get_reactions(nft_id: NftId) -> Vec<Reaction> {
    REACTIONS.with(|reactions| {
        let reactions = reactions.borrow();
        reactions.get(&nft_id).cloned().unwrap_or_default()
    })
}

// Register emojis by admin
pub fn register_emojis(emojis_to_add: Vec<String>) -> Result<Nat, String> {
    let mut added = Nat::from(0);
    EMOJIS.with(|emojis| {
        let mut emojis = emojis.borrow_mut();
        for emoji in emojis_to_add {
            if emoji.len() > MAX_EMOJI_LENGTH_BYTES {
                return Err(format!(
                    "Emoji {} is too long. Max length is {} bytes.",
                    emoji, MAX_EMOJI_LENGTH_BYTES
                ));
            }
            if emojis.insert(emoji) {
                added += Nat::from(1);
            }
        }
        Ok(added)
    })
}

// Unregister emojis by admin
pub fn unregister_emojis(emojis_to_remove: Vec<String>) -> Result<Nat, String> {
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
pub fn emojis() -> Vec<String> {
    EMOJIS.with(|emojis| emojis.borrow().iter().cloned().collect())
}

pub fn is_available_emoji(emoji: &String) -> bool {
    EMOJIS.with(|emojis| emojis.borrow().contains(emoji))
}

#[cfg(test)]
mod tests {
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
        let nft_id: NftId = (Nat::from(1), Nat::from(1));
        let reaction = Reaction::new(ALI, String::from("🐶"));
        add_reaction(nft_id.clone(), reaction.clone()).unwrap();
        let reactions = get_reactions(nft_id.clone());
        assert_eq!(reactions.len(), 1);
        assert_eq!(reactions[0], reaction);

        let reaction = Reaction::new(BOB, String::from("🐶"));
        add_reaction(nft_id.clone(), reaction.clone()).unwrap();
        let reactions = get_reactions(nft_id.clone());
        assert_eq!(reactions.len(), 2);
        assert_eq!(reactions[0], Reaction::new(ALI, String::from("🐶")));
        assert_eq!(reactions[1], Reaction::new(BOB, String::from("🐶")));

        let reaction = Reaction::new(ALI, String::from("🐶"));
        let result = add_reaction(nft_id.clone(), reaction.clone());
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Reaction 🐶 already exists for NFT 1.");

        let reaction = Reaction::new(ALI, String::from("🚀"));
        let result = add_reaction(nft_id.clone(), reaction.clone());
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Reaction 🚀 is not valid.");
    }

    #[test]
    fn test_remove_reaction() {
        register_emojis(vec!["🐶".to_string(), "🐱".to_string()]).unwrap();
        let nft_id: NftId = (Nat::from(1), Nat::from(1));
        let reaction = Reaction::new(ALI, String::from("🐶"));
        add_reaction(nft_id.clone(), reaction.clone()).unwrap();
        let reaction = Reaction::new(BOB, String::from("🐶"));
        add_reaction(nft_id.clone(), reaction.clone()).unwrap();
        let reaction = Reaction::new(ALI, String::from("🐱"));
        add_reaction(nft_id.clone(), reaction.clone()).unwrap();
        let reactions = get_reactions(nft_id.clone());
        assert_eq!(reactions.len(), 3);

        let reaction = Reaction::new(ALI, String::from("🐶"));
        remove_reaction(nft_id.clone(), reaction.clone()).unwrap();
        let reactions = get_reactions(nft_id.clone());
        assert_eq!(reactions.len(), 2);
        assert_eq!(reactions[0], Reaction::new(BOB, String::from("🐶")));
        assert_eq!(reactions[1], Reaction::new(ALI, String::from("🐱")));

        let reaction = Reaction::new(ALI, String::from("🐶"));
        let result = remove_reaction(nft_id.clone(), reaction.clone());
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Reaction 🐶 does not exist for NFT 1.");

        let reaction = Reaction::new(ALI, String::from("🚀"));
        let result = remove_reaction(nft_id.clone(), reaction.clone());
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Reaction 🚀 is not valid.");
    }
}
