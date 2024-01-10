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

    pub fn diamond() -> Self {
        Self::new(
            "Diamond".to_string(),
            "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/diamond-medal.png".to_string(),
        )
    }

    pub fn platinum() -> Self {
        Self::new(
            "Platinum".to_string(),
            "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/platinum-medal.png".to_string(),
        )
    }

    pub fn gold() -> Self {
        Self::new(
            "Gold".to_string(),
            "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/gold-medal.png".to_string(),
        )
    }

    pub fn silver() -> Self {
        Self::new(
            "Silver".to_string(),
            "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/silver-medal.png".to_string(),
        )
    }

    pub fn bronze() -> Self {
        Self::new(
            "Bronze".to_string(),
            "https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/bronze-medal.png".to_string(),
        )
    }
}
