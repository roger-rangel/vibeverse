use candid::{CandidType, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

pub type UserId = Principal;

#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize)]
pub struct Creator {
    /// The display name of the creator.
    #[serde(rename = "n", default)]
    pub name: String,
    /// The avatar of the creator.
    #[serde(rename = "a", default)]
    pub avatar: String,
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
