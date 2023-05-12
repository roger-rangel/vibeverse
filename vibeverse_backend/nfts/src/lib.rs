#[cfg(test)]
mod tests;

use candid::types::number::Nat;
use ic_cdk::export::{candid::CandidType, Principal};
use std::{cell::RefCell, collections::BTreeMap};

/// Errors related for nft logic.
#[derive(PartialEq, Debug)]
pub enum Error {
    /// The nft with provided `NftId` doesn't exist.
    NftNotFound,
    /// The caller is not allowed to do the specific activity.
    NotAllowed,
    /// The minting limit has been reached.
    LimitReached,
    /// Tried to do something with a nft that is not owned by the caller.
    NotOwned,
}

/// The type used to represent an Nfts id.
pub type NftId = Nat;

/// Stores all the necessary information about a nft.
#[derive(Clone, CandidType, PartialEq, Debug)]
pub struct Nft {
    /// A unique identifier for the nft.
    id: NftId,
    /// A name for the nft.
    name: String,
    /// A description for the nft.
    description: String,
    /// Specifies whether the nft is transferable or not.
    transferable: bool,
    /// The url of the image for the nft.
    image_url: Option<String>,
    /// The limit of how many nft instances can be minted.
    limit: Option<Nat>,
    /// The number of nfts minted.
    minted: Nat,
    /// The creator of the nft.
    creator: Principal,
}

/// Maps `NftId` to the specific Nft.
type NftStore = BTreeMap<NftId, Nft>;
/// Maps the creators to their nfts.
type CreatorNftsStore = BTreeMap<Principal, Vec<NftId>>;
/// Maps users to their owned instances of nfts.
type NftsOfStore = BTreeMap<Principal, Vec<NftId>>;

thread_local! {
    static NFTS: RefCell<NftStore> = RefCell::default();
    static CREATOR_NFTS: RefCell<CreatorNftsStore> = RefCell::default();
    static NFT_COUNT: RefCell<NftId> = RefCell::new(Nat::from(0));
    static NFTS_OF: RefCell<NftsOfStore> = RefCell::default();
}

pub fn do_get_nft_count() -> NftId {
    NFT_COUNT.with(|count| count.borrow().clone())
}

/// Creates a new nft and increases the `NFT_COUNT`.
pub fn do_create_nft_collection(
    creator: Principal,
    name: String,
    description: String,
    transferable: bool,
    limit: Option<Nat>,
    image_url: Option<String>,
) -> NftId {
    let mut id = Nat::from(0);
    NFT_COUNT.with(|count| {
        id = (count.borrow()).clone();
        let nft = Nft {
            id: id.clone(),
            name,
            description,
            transferable,
            image_url,
            limit,
            minted: Nat::from(0),
            creator,
        };

        NFTS.with(|nfts| {
            let mut nfts = nfts.borrow_mut();
            nfts.insert(id.clone(), nft);
        })
    });

    CREATOR_NFTS.with(|nfts_by_creator| {
        let mut creator_nfts = nfts_by_creator.borrow_mut();
        if let Some(nfts) = creator_nfts.get_mut(&creator) {
            (*nfts).push(id.clone());
        } else {
            creator_nfts.insert(creator, vec![id.clone()]);
        }
    });

    NFT_COUNT.with(|counter| *counter.borrow_mut() += 1);
    id
}

/// Updates the metadata of the given nft.
///
/// This call is only allowed for the creator of the specified nft.
pub fn do_update_metadata(
    caller: Principal,
    id: NftId,
    name: String,
    description: String,
    image_url: Option<String>,
) -> Result<(), Error> {
    let maybe_nft = do_get_nft(id.clone());
    if let Some(nft) = maybe_nft {
        if nft.creator != caller {
            return Err(Error::NotAllowed);
        }
    } else {
        return Err(Error::NftNotFound);
    }

    NFTS.with(|nfts| {
        let mut nfts = nfts.borrow_mut();
        if let Some(nft) = nfts.clone().get(&id) {
            nfts.insert(
                id.clone(),
                Nft {
                    id,
                    name,
                    description,
                    image_url,
                    transferable: nft.clone().transferable,
                    limit: nft.clone().limit,
                    minted: nft.clone().minted,
                    creator: nft.creator,
                },
            );
            Ok(())
        } else {
            Err(Error::NftNotFound)
        }
    })
}

/// Returns the nft with the specified `NftId`.
/// In case there is no such nft returns `None`.
pub fn do_get_nft(id: NftId) -> Option<Nft> {
    NFTS.with(|nfts| {
        if let Some(nft) = nfts.borrow().get(&id) {
            Some(nft.clone())
        } else {
            None
        }
    })
}

/// Get all the nfts that were created by the specified creator.
pub fn do_get_nfts_of_creator(creator: Principal) -> Vec<Nft> {
    let mut nft_ids: Vec<NftId> = vec![];

    CREATOR_NFTS.with(|nfts_by_creator| {
        if let Some(nfts) = nfts_by_creator.borrow().get(&creator) {
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

/// Mints a new instance of a created nft
///
/// This call is only allowed for the creator of the specified nft.
pub fn do_mint_nft(caller: Principal, receiver: Principal, nft_id: NftId) -> Result<(), Error> {
    let maybe_nft = do_get_nft(nft_id.clone());
    if let Some(nft) = maybe_nft.clone() {
        if nft.creator != caller {
            return Err(Error::NotAllowed);
        }
        if nft.limit.is_some() && nft.minted >= nft.limit.unwrap() {
            return Err(Error::LimitReached);
        }
    } else {
        return Err(Error::NftNotFound);
    }

    NFTS_OF.with(|nfts_of| {
        let mut nfts_of = nfts_of.borrow_mut();
        if let Some(nfts) = nfts_of.get_mut(&receiver) {
            (*nfts).push(nft_id.clone());
        } else {
            nfts_of.insert(receiver, vec![nft_id.clone()]);
        }
    });

    let mut nft = maybe_nft.unwrap();
    nft.minted += 1;

    NFTS.with(|nfts| {
        let mut nfts = nfts.borrow_mut();
        nfts.insert(nft_id, nft);
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

pub fn do_transfer_nft(caller: Principal, receiver: Principal, nft_id: NftId) -> Result<(), Error> {
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
