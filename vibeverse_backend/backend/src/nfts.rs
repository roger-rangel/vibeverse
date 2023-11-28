use candid::types::number::Nat;
use candid::Principal;

use ic_cdk::api::call::CallResult;
use ic_cdk::call;

use crate::creators;
use crate::types::StorableNat;
use crate::{
    memory::{COLLECTIONS, COLLECTIONS_OF, NFTS, NFTS_OF, STATE},
    types::{Collection, CollectionId, Nft, NftId},
};

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
    ///
    Unknown,
}

pub fn collection_count() -> CollectionId {
    STATE.with(|state| state.borrow().total_collections.clone())
}

/// Creates a new collection and increases the `COLLECTION_COUNT`.
pub fn create_collection(
    creator: Principal,
    name: String,
    description: String,
    transferable: bool,
    limit: Option<Nat>,
    image_url: Option<String>,
    category: String,
) -> Result<CollectionId, String> {
    // CALL THIS FUNCTION ONCE WE WANT TO CHARGE A FEE
    // ensure_fee_payment(creator, into_units(crate::administrative::collection_fee())).await?;

    let mut id = Nat::from(0).into();
    STATE.with(|state| {
        id = state.borrow().total_collections.clone();
        let collection = Collection {
            id: id.clone(),
            name,
            description,
            transferable,
            image_url,
            category,
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

    STATE.with(|counter| counter.borrow_mut().total_collections += 1);

    // Increase score
    creators::add_score(creator, creators::Score::CreateCollection)?;

    Ok(id)
}

/// Updates the metadata of the given collection.
///
/// This call is only allowed for the creator of the specified collection.
pub fn update_metadata(
    caller: Principal,
    id: CollectionId,
    name: String,
    description: String,
    image_url: Option<String>,
    category: Option<String>,
) -> Result<(), Error> {
    let maybe_collection = get_collection(id.clone());
    if let Some(collection) = maybe_collection {
        if collection.creator != caller {
            return Err(Error::OnlyCollectionCreatorAllowed);
        }
    } else {
        return Err(Error::CollectionNotFound);
    }

    COLLECTIONS.with(|collections| {
        let mut collections = collections.borrow_mut();
        if let Some(collection) = collections.get(&id) {
            collections.insert(
                id.clone(),
                Collection {
                    id,
                    name,
                    description,
                    image_url,
                    transferable: collection.clone().transferable,
                    limit: collection.limit.clone(),
                    minted: collection.minted.clone(),
                    creator: collection.creator,
                    category: category.unwrap_or(collection.category.clone()),
                },
            );
            Ok(())
        } else {
            Err(Error::CollectionNotFound)
        }
    })
}

/// Returns the collection with the specified `CollectionId`.  In case there is no such collection returns `None`.
pub fn get_collection(id: CollectionId) -> Option<Collection> {
    COLLECTIONS.with(|collections| collections.borrow().get(&id))
}

pub fn get_nft(id: NftId) -> Option<Nft> {
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
pub fn collections_created_by(creator: Principal) -> Vec<Collection> {
    let mut collection_ids: Vec<CollectionId> = vec![];

    COLLECTIONS_OF.with(|collections_of| {
        if let Some(collections) = collections_of.borrow().get(&creator) {
            collection_ids = collections.clone();
        }
    });

    let mut collections = vec![];
    for id in collection_ids {
        if let Some(collection) = get_collection(id) {
            collections.push(collection);
        }
    }
    collections
}

/// Mints a new nft
///
/// This call is only allowed for the creator of the specified collection.
pub fn mint_nft(
    caller: Principal,
    receiver: Principal,
    collection_id: CollectionId,
    name: String,
    description: String,
    asset_url: Option<String>,
) -> Result<NftId, Error> {
    let maybe_collection = get_collection(collection_id.clone());
    let new_nft_id: StorableNat;

    if let Some(collection) = maybe_collection.clone() {
        if collection.creator != caller {
            return Err(Error::OnlyCollectionCreatorAllowed);
        }
        if collection.limit.is_some() && collection.minted >= collection.limit.unwrap() {
            return Err(Error::LimitReached);
        }
        new_nft_id = collection.minted.into();
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
            (*nfts).push(nft.clone());
        } else {
            nfts_of.insert(receiver, vec![nft.clone()]);
        }
    });

    let mut collection = maybe_collection.unwrap();
    collection.minted += 1;

    COLLECTIONS.with(|collections| {
        let mut collections = collections.borrow_mut();
        collections.insert(collection_id, collection);
    });

    // Increase score
    creators::add_score(caller, creators::Score::MintNft).map_err(|_| Error::Unknown)?;

    Ok(nft)
}

pub fn nfts_of_user(user: Principal) -> Vec<Nft> {
    let mut nft_ids: Vec<NftId> = vec![];

    NFTS_OF.with(|nfts_of| {
        if let Some(nfts) = nfts_of.borrow().get(&user) {
            nft_ids = nfts.clone();
        }
    });

    let mut nfts = vec![];
    for id in nft_ids {
        if let Some(nft) = get_nft(id) {
            nfts.push(nft);
        }
    }
    nfts
}

pub fn all_nfts() -> Vec<Nft> {
    let mut nft_ids: Vec<NftId> = vec![];

    let Ok(collection_count): Result<u128, _> = collection_count().0 .0.try_into() else {
        return vec![];
    };

    (0..collection_count).for_each(|collection_id| {
        let maybe_minted: Result<u128, _> = get_collection(collection_id.into()).unwrap().minted.0.try_into();

        if let Ok(minted) = maybe_minted {
            (0..minted).for_each(|nft_id| nft_ids.push((collection_id.into(), nft_id.into())));
        }
    });

    let mut nfts = vec![];
    for id in nft_ids {
        if let Some(nft) = get_nft(id) {
            nfts.push(nft);
        }
    }

    nfts
}

pub fn nfts_within_collection(collection_id: CollectionId, start_index: Option<u128>, count: Option<u128>) -> Vec<Nft> {
    let maybe_minted: Result<u128, _> = get_collection(collection_id.clone()).unwrap().minted.0.try_into();

    if maybe_minted.is_err() {
        return vec![];
    }

    let minted = maybe_minted.unwrap();
    let start_index = start_index.unwrap_or_default();
    let count = count.unwrap_or(minted);

    if start_index > minted {
        return vec![];
    }

    let end = start_index
        .checked_add(count)
        .expect("adding `start_index` and `count` together overflowed.");
    let end = minted.min(end);

    (start_index..end)
        .map(|nft_id| {
            get_nft((collection_id.clone(), Nat::from(nft_id).into()))
                .expect("`nft_id` must be good, otherwise the value of `minted` is broken")
        })
        .collect()
}

pub fn all_collections(start_index: Option<u128>, count: Option<u128>) -> Vec<Collection> {
    let maybe_collection_count = collection_count().0 .0.try_into();

    if maybe_collection_count.is_err() {
        return vec![];
    }
    let collection_count = maybe_collection_count.unwrap();

    let start_index = start_index.unwrap_or_default();
    let count = count.unwrap_or(collection_count);

    if start_index > collection_count {
        return vec![];
    }

    let end = start_index
        .checked_add(count)
        .expect("adding `start_index` and `count` together overflowed.");
    let end = collection_count.min(end);

    (start_index..end)
        .map(|collection_id| {
            get_collection(Nat::from(collection_id).into())
                .expect("`collection_id` must be good, otherwise the value of `collection_count` is broken")
        })
        .collect()
}

pub fn nft_transfer(caller: Principal, receiver: Principal, nft_id: NftId) -> Result<(), Error> {
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

#[allow(dead_code)]
async fn ensure_fee_payment(payer: Principal, required_fee: u128) -> Result<(), &'static str> {
    let vibe_token = crate::administrative::vibe_token();
    if vibe_token.is_none() {
        return Ok(());
    }
    let vibe_token = vibe_token.unwrap();

    if required_fee == 0 {
        return Ok(());
    }

    let maybe_allowance: CallResult<((Principal, Nat),)> = call(vibe_token, "allowance", (payer,)).await;

    match maybe_allowance {
        Ok(allowance) => {
            let allowed_principal = allowance.0 .0;
            let allowance = allowance.0 .1;

            if allowance < required_fee || allowed_principal == payer {
                return Err("Fee needs to be payed");
            }

            // TODO: Add endpoint for treasury
            let maybe_treasuery = STATE.with(|s| s.borrow().treasury);

            if let Some(treasuery) = maybe_treasuery {
                // Send vibe tokens to the treasury

                // let transfer_arg = Construct the transfer arg

                let result: CallResult<(Result<Nat, ()>,)> =
                    call(vibe_token, "transfer_from", (payer, treasuery, required_fee)).await;

                if result.is_err() {
                    return Err("Token transfer failed");
                }
            } else {
                return Err("Treasuery not set");
            }
        }
        Err(_) => return Err("Couldn't get allowance"),
    }

    Ok(())
}
