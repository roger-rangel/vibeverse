use candid::{types::number::Nat, CandidType, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

use crate::StorableNat;
use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

use super::{is_empty_slice, Reactions};

pub type CollectionId = StorableNat;

/// (collection_id, nft_id)
pub type NftId = (StorableNat, StorableNat);

/// Stores all the necessary information about a collection.
#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize)]
pub struct Collection {
    /// A unique identifier for the collection.
    pub id: CollectionId,
    /// A name for the collection.
    pub name: String,
    /// A description for the collection.
    pub description: String,
    /// Specifies whether the collection is transferable or not.
    pub transferable: bool,
    /// The url of the image for the collection.
    pub image_url: Option<String>,
    /// The category to which the collection belongs.
    pub category: String,
    /// The limit of how many collection instances can be minted.
    pub limit: Option<Nat>,
    /// The number of collections minted.
    pub minted: Nat,
    /// The creator of the collection.
    pub creator: Principal,
}

impl Storable for Collection {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}

/// TODO: Migrate to NftMetadata
/// Stores all the necessary information about an nft.
#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize)]
pub struct Nft {
    /// A unique identifier for the nft.
    pub id: NftId,
    /// A name for the collection.
    pub name: String,
    /// A description for the collection.
    pub description: String,
    /// The url of the asset for the nft.
    pub asset_url: Option<String>,
}

impl Storable for Nft {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[repr(u8)]
#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize, Default)]
pub enum AssetType {
    #[default]
    Image = 0,
    Video = 1,
    Audio = 2,
    Other = 3,
}

#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize, Default)]
pub struct NftMetadata {
    #[serde(rename = "r", default, skip_serializing_if = "is_empty_slice")]
    pub reactions: Reactions,

    #[serde(rename = "at", default)]
    pub asset_type: AssetType,
}

impl Storable for NftMetadata {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}
