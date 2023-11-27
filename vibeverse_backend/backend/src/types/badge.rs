use candid::CandidType;
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize)]
pub struct Badge {
    #[serde(rename = "n", default)]
    pub name: String,
    #[serde(rename = "i", default)]
    pub image: String,
}

impl Storable for Badge {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}

impl Badge {
    pub fn new(name: String, image: String) -> Self {
        Self { name, image }
    }
}
