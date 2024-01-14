use candid::{CandidType, Nat, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::{borrow::Cow, collections::BTreeMap};

use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

use crate::{
    administrative,
    interface::{Account, TransferArg, VibeToken, ICRC1},
};

use super::{Badge, CourseId, StorableNat};

pub type UserId = Principal;

pub mod score {
    pub const CREATE_COLLECTION: u8 = 1;
    pub const MINT_NFT: u8 = 1;
    pub const CREATE_COURSE: u8 = 3;
    pub const CREATE_COMMUNITY: u8 = 2;
    pub const FINISH_COURSE: u8 = 3;
}

pub const REWARD_PER_SCORE: u32 = 100_000_000;

#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize)]
pub struct Creator {
    /// The display name of the creator.
    #[serde(rename = "n", default)]
    pub name: String,
    /// The avatar of the creator.
    #[serde(rename = "a", default)]
    pub avatar: String,

    #[serde(rename = "cc", default)]
    pub created_courses: BTreeMap<CourseId, u64>,

    #[serde(rename = "lc", default)]
    pub completed_courses: BTreeMap<CourseId, u64>,
    /// Actually a Nat
    #[serde(rename = "s", default)]
    pub score: StorableNat,

    #[serde(rename = "cr", default)]
    pub claimable_rewards: Nat,

    #[serde(rename = "rh", default)]
    pub rewards_history: BTreeMap<u64, Nat>,
}

impl Storable for Creator {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}

impl Creator {
    pub fn new(name: String, avatar: String) -> Self {
        Self {
            name,
            avatar,
            created_courses: Default::default(),
            completed_courses: Default::default(),
            score: Default::default(),
            claimable_rewards: Default::default(),
            rewards_history: Default::default(),
        }
    }

    pub fn add_created_course(&mut self, course: CourseId, unlocked: u64) {
        self.created_courses.insert(course, unlocked);
    }

    pub fn add_created_course_now(&mut self, course: CourseId) {
        self.created_courses.insert(course, ic_cdk::api::time());
    }

    pub fn add_completed_course(&mut self, course: CourseId, unlocked: u64) {
        self.completed_courses.insert(course, unlocked);
    }

    pub fn add_completed_course_now(&mut self, course: CourseId) {
        self.completed_courses.insert(course, ic_cdk::api::time());
    }

    pub fn add_score(&mut self, score: u8) -> StorableNat {
        self.score += Into::<StorableNat>::into(score);

        // TODO: Recheck business model, this is for demo
        self.claimable_rewards += Nat::from(REWARD_PER_SCORE * score as u32);

        self.score.clone()
    }

    pub fn badge(&self) -> Badge {
        // TODO: Recheck business model, this is for demo
        if self.score >= 100u32 {
            Badge::diamond()
        } else if self.score >= 50u32 {
            Badge::platinum()
        } else if self.score >= 30u32 {
            Badge::gold()
        } else if self.score >= 20u32 {
            Badge::bronze()
        } else if self.score >= 10u32 {
            Badge::silver()
        } else {
            Badge::bronze()
        }
    }

    pub async fn claim_rewards(&mut self, amount: Nat, to: UserId, time: u64) -> Result<(), String> {
        if self.claimable_rewards < amount {
            return Err("Not enough rewards".to_string());
        }

        self.claimable_rewards -= amount.clone();
        self.rewards_history.insert(time, amount.clone());

        let vibe_token = administrative::vibe_token();

        if vibe_token.is_none() {
            return Err("Vibe token not set".to_string());
        }

        let mut vibe_token = VibeToken::new(vibe_token.unwrap());

        let args = TransferArg {
            from_subaccount: None,
            to: Account {
                owner: to,
                subaccount: None,
            },
            fee: None,
            created_at_time: None,
            memo: None,
            amount,
        };

        vibe_token
            .icrc1_transfer(&args)
            .await
            .map_err(|e| e.1)?
            .map_err(|e| e.to_string())?;

        Ok(())
    }
}
