use candid::types::number::Nat;
use candid::{CandidType, Principal};

pub type CollectionId = Nat;

/// (collection_id, nft_id)
pub type NftId = (Nat, Nat);

/// Stores all the necessary information about a collection.
#[derive(Clone, CandidType, PartialEq, Debug)]
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

/// Stores all the necessary information about an nft.
#[derive(Clone, CandidType, PartialEq, Debug)]
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
