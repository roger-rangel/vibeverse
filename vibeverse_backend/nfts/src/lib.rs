#[cfg(test)]
mod tests;

use candid::types::number::Nat;
use ic_cdk::export::{candid::CandidType, Principal};
use std::{cell::RefCell, collections::BTreeMap};

/// Errors related to the nfts module.
#[derive(PartialEq, Debug)]
pub enum Error {
    /// The collection with provided `CollectionId` doesn't exist.
    CollectionNotFound,
    /// Only the collection creator is allowed to do the specific activity.
    OnlyCollectionCreatorAllowed,
    /// The minting limit of the collection has been reached.
    LimitReached,
    /// Tried to do something with an nft that is not owned by the caller.
    NotOwned,
}

pub type CollectionId = Nat;

/// (collection_id, nft_id)
pub type NftId = (Nat, Nat);

/// Stores all the necessary information about a collection.
#[derive(Clone, CandidType, PartialEq, Debug)]
pub struct Collection {
    /// A unique identifier for the collection.
    id: CollectionId,
    /// A name for the collection.
    name: String,
    /// A description for the collection.
    description: String,
    /// Specifies whether the collection is transferable or not.
    transferable: bool,
    /// The url of the image for the collection.
    image_url: Option<String>,
    /// The limit of how many collection instances can be minted.
    limit: Option<Nat>,
    /// The number of collections minted.
    minted: Nat,
    /// The creator of the collection.
    creator: Principal,
}

/// Stores all the necessary information about an nft.
#[derive(Clone, CandidType, PartialEq, Debug)]
pub struct Nft {
    /// A unique identifier for the nft.
    id: NftId,
    /// A name for the collection.
    name: String,
    /// A description for the collection.
    description: String,
    /// The url of the asset for the nft.
    asset_url: Option<String>,
}

/// `CollectionId` mapped to a specific collection.
type CollectionStore = BTreeMap<CollectionId, Collection>;
/// All the collections created by a principal.
type CreatorCollectionsStore = BTreeMap<Principal, Vec<CollectionId>>;
/// All of the nfts in a collection.
type NftsStore = BTreeMap<CollectionId, Vec<Nft>>;
/// All the nfts owned by a user.
type NftsOfStore = BTreeMap<Principal, Vec<NftId>>;

thread_local! {
    static COLLECTIONS: RefCell<CollectionStore> = RefCell::default();
    static NFTS: RefCell<NftsStore> = RefCell::default();
    static COLLECTIONS_OF: RefCell<CreatorCollectionsStore> = RefCell::default();
    static COLLECTION_COUNT: RefCell<CollectionId> = RefCell::new(Nat::from(0));
    static NFTS_OF: RefCell<NftsOfStore> = RefCell::default();
}

pub fn do_get_collection_count() -> CollectionId {
    COLLECTION_COUNT.with(|count| count.borrow().clone())
}

/// Creates a new collection and increases the `COLLECTION_COUNT`.
pub fn do_create_collection(
    creator: Principal,
    name: String,
    description: String,
    transferable: bool,
    limit: Option<Nat>,
    image_url: Option<String>,
) -> CollectionId {
    let mut id = Nat::from(0);
    COLLECTION_COUNT.with(|count| {
        id = (count.borrow()).clone();
        let collection = Collection {
            id: id.clone(),
            name,
            description,
            transferable,
            image_url,
            limit,
            minted: Nat::from(0),
            creator,
        };

        COLLECTIONS.with(|collections| {
            let mut collections = collections.borrow_mut();
            collections.insert(id.clone(), collection);
        })
    });

    COLLECTIONS_OF.with(|collections_of| {
        let mut collections_of = collections_of.borrow_mut();
        if let Some(collections) = collections_of.get_mut(&creator) {
            (*collections).push(id.clone());
        } else {
            collections_of.insert(creator, vec![id.clone()]);
        }
    });

    COLLECTION_COUNT.with(|counter| *counter.borrow_mut() += 1);
    id
}

/// Updates the metadata of the given collection.
///
/// This call is only allowed for the creator of the specified collection.
pub fn do_update_metadata(
    caller: Principal,
    id: CollectionId,
    name: String,
    description: String,
    image_url: Option<String>,
) -> Result<(), Error> {
    let maybe_collection = do_get_collection(id.clone());
    if let Some(collection) = maybe_collection {
        if collection.creator != caller {
            return Err(Error::OnlyCollectionCreatorAllowed);
        }
    } else {
        return Err(Error::CollectionNotFound);
    }

    COLLECTIONS.with(|collections| {
        let mut collections = collections.borrow_mut();
        if let Some(collection) = collections.clone().get(&id) {
            collections.insert(
                id.clone(),
                Collection {
                    id,
                    name,
                    description,
                    image_url,
                    transferable: collection.clone().transferable,
                    limit: collection.clone().limit,
                    minted: collection.clone().minted,
                    creator: collection.creator,
                },
            );
            Ok(())
        } else {
            Err(Error::CollectionNotFound)
        }
    })
}

/// Returns the collection with the specified `CollectionId`.
/// In case there is no such collection returns `None`.
pub fn do_get_collection(id: CollectionId) -> Option<Collection> {
    COLLECTIONS.with(|collections| {
        if let Some(collection) = collections.borrow().get(&id) {
            Some(collection.clone())
        } else {
            None
        }
    })
}

pub fn do_get_nft(id: NftId) -> Option<Nft> {
    let collection_id = id.0.clone();
    NFTS.with(|nfts| -> Option<Nft> {
        if let Some(nfts_in_collection) = nfts.borrow().get(&collection_id) {
            for nft in nfts_in_collection {
                if nft.id == id {
                    return Some(nft.clone());
                }
            }
            None
        } else {
            None
        }
    })
}

/// Get all the collections that were created by the specified creator.
pub fn do_get_collections_of_creator(creator: Principal) -> Vec<Collection> {
    let mut collection_ids: Vec<CollectionId> = vec![];

    COLLECTIONS_OF.with(|collections_of| {
        if let Some(collections) = collections_of.borrow().get(&creator) {
            collection_ids = collections.clone();
        }
    });

    let mut collections = vec![];
    for id in collection_ids {
        if let Some(collection) = do_get_collection(id) {
            collections.push(collection);
        }
    }
    collections
}

/// Mints a new nft
///
/// This call is only allowed for the creator of the specified collection.
pub fn do_mint_nft(
    caller: Principal,
    receiver: Principal,
    collection_id: CollectionId,
    name: String,
    description: String,
    asset_url: Option<String>,
) -> Result<(), Error> {
    let maybe_collection = do_get_collection(collection_id.clone());
    let mut new_nft_id = Nat::from(0);

    if let Some(collection) = maybe_collection.clone() {
        if collection.creator != caller {
            return Err(Error::OnlyCollectionCreatorAllowed);
        }
        if collection.limit.is_some() && collection.minted >= collection.limit.unwrap() {
            return Err(Error::LimitReached);
        }
        new_nft_id = collection.minted;
    } else {
        return Err(Error::CollectionNotFound);
    }

    let nft = (collection_id.clone(), new_nft_id.clone());

    NFTS.with(|nfts| {
        let mut all_nfts = nfts.borrow_mut();
        let nft_data = Nft {
            id: nft.clone(),
            name,
            description,
            asset_url,
        };
        if let Some(nfts_in_collection) = all_nfts.get_mut(&collection_id) {
            (*nfts_in_collection).push(nft_data);
        } else {
            all_nfts.insert(collection_id.clone(), vec![nft_data]);
        }
    });

    NFTS_OF.with(|nfts_of| {
        let mut nfts_of = nfts_of.borrow_mut();
        if let Some(nfts) = nfts_of.get_mut(&receiver) {
            (*nfts).push(nft);
        } else {
            nfts_of.insert(receiver, vec![nft]);
        }
    });

    let mut collection = maybe_collection.unwrap();
    collection.minted += 1;

    COLLECTIONS.with(|collections| {
        let mut collections = collections.borrow_mut();
        collections.insert(collection_id, collection);
    });

    Ok(())
}

pub fn do_get_nfts_of_user(user: Principal) -> Vec<Nft> {
    let mut nft_ids: Vec<NftId> = vec![];

    NFTS_OF.with(|nfts_of| {
        if let Some(nfts) = nfts_of.borrow().get(&user) {
            nft_ids = nfts.clone();
        }
    });

    let mut nfts = vec![];
    for id in nft_ids {
        if let Some(nft) = do_get_nft(id) {
            nfts.push(nft);
        }
    }
    nfts
}

pub fn do_nft_transfer(caller: Principal, receiver: Principal, nft_id: NftId) -> Result<(), Error> {
    NFTS_OF.with(|nfts_of| -> Result<(), Error> {
        let mut nfts_of = nfts_of.borrow_mut();
        if let Some(nfts) = nfts_of.get_mut(&caller) {
            let maybe_index = (*nfts).iter().position(|p| *p == nft_id);

            match maybe_index {
                Some(index) => (*nfts).remove(index),
                None => return Err(Error::NotOwned),
            };
        } else {
            return Err(Error::NotOwned);
        }

        if let Some(nfts) = nfts_of.get_mut(&receiver) {
            (*nfts).push(nft_id.clone());
        } else {
            nfts_of.insert(receiver, vec![nft_id.clone()]);
        }

        Ok(())
    })
}
