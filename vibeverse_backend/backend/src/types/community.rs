use candid::CandidType;
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

use super::UserId;
use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

pub type CommunityId = String;

#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize, Default)]
pub struct Socials {
    #[serde(rename = "h", default)]
    pub home: String,
}

#[derive(Clone, CandidType, Debug, Serialize, Deserialize)]
pub struct Community {
    #[serde(rename = "s", default)]
    pub slug: CommunityId,

    #[serde(rename = "c")]
    pub creator: UserId,

    #[serde(rename = "n", default)]
    pub name: String,

    #[serde(rename = "d", default)]
    pub description: String,

    #[serde(rename = "l", default)]
    pub logo: String,

    #[serde(rename = "hi", default)]
    pub hero_image: String,

    #[serde(rename = "so", default)]
    pub socials: Socials,

    #[serde(rename = "v", default)]
    pub verified: bool,

    #[serde(rename = "m", default)]
    pub members: Vec<UserId>,

    #[serde(rename = "f", default)]
    pub followers: Vec<UserId>,
}

impl Community {
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        slug: CommunityId,
        creator: UserId,
        name: String,
        description: String,
        logo: String,
        verified: bool,
        members: Vec<UserId>,
        followers: Vec<UserId>,
    ) -> Self {
        Self {
            slug,
            creator,
            name,
            description,
            logo,
            hero_image: Default::default(),
            socials: Default::default(),
            verified,
            members,
            followers,
        }
    }

    pub fn is_creator(&self, creator: &UserId) -> bool {
        self.creator == *creator
    }

    pub fn is_member(&self, member: &UserId) -> bool {
        self.members.contains(member)
    }

    pub fn is_follower(&self, follower: &UserId) -> bool {
        self.followers.contains(follower)
    }

    pub fn add_member(&mut self, member: UserId) -> Result<(), String> {
        if self.is_member(&member) {
            return Err(format!("User {} is already a member of community {}.", member, self.slug));
        }
        self.members.push(member);

        Ok(())
    }

    pub fn remove_member(&mut self, member: UserId) -> Result<(), String> {
        if !self.is_member(&member) {
            return Err(format!("User {} is not a member of community {}.", member, self.slug));
        }
        self.members.retain(|m| m != &member);

        Ok(())
    }

    pub fn add_follower(&mut self, follower: UserId) -> Result<(), String> {
        if self.is_follower(&follower) {
            return Err(format!("User {} is already a follower of community {}.", follower, self.slug));
        }
        self.followers.push(follower);
        Ok(())
    }

    pub fn remove_follower(&mut self, follower: UserId) -> Result<(), String> {
        if !self.is_follower(&follower) {
            return Err(format!("User {} is not a follower of community {}.", follower, self.slug));
        }
        self.followers.retain(|f| f != &follower);

        Ok(())
    }
}

impl Storable for Community {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}
