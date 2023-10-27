use candid::{Nat, Principal};

use crate::{nfts::*, types::*};

#[test]
fn creating_collection_works() {
    let creator = get_creator();
    let collection_name = String::from("collection1");
    let collection_desc = String::from("A basic collection.");
    let transferable = false;
    let limit = None;
    let image_url = None;

    create_collection(
        creator,
        collection_name.clone(),
        collection_desc.clone(),
        transferable,
        limit.clone(),
        image_url.clone(),
        Default::default(),
    );

    assert_eq!(
        get_collection(Nat::from(0)),
        Some(Collection {
            id: Nat::from(0),
            creator,
            name: collection_name,
            description: collection_desc,
            transferable,
            image_url,
            limit,
            minted: Nat::from(0),
            category: Default::default(),
        })
    );
}

#[test]
fn updating_collection_metadata_works() {
    let creator = get_creator();
    let collection_name = String::from("collection1");
    let collection_desc = String::from("A basic collection.");
    let transferable = false;
    let image_url = None;
    let limit = None;

    create_collection(
        creator,
        collection_name.clone(),
        collection_desc.clone(),
        transferable,
        limit.clone(),
        image_url.clone(),
        Default::default(),
    );

    assert_eq!(
        get_collection(Nat::from(0)),
        Some(Collection {
            id: Nat::from(0),
            creator,
            name: collection_name,
            description: collection_desc,
            transferable,
            image_url,
            limit: limit.clone(),
            minted: Nat::from(0),
            category: Default::default(),
        })
    );

    let new_name = String::from("New name");
    let new_desc = String::from("New description");
    let new_image_url = Some(String::from("https://domain.com/image.jpg"));
    assert_eq!(
        update_metadata(
            creator,
            Nat::from(0),
            new_name.clone(),
            new_desc.clone(),
            new_image_url.clone(),
            None,
        ),
        Ok(())
    );

    assert_eq!(
        get_collection(Nat::from(0)),
        Some(Collection {
            id: Nat::from(0),
            creator,
            name: new_name,
            description: new_desc,
            transferable,
            image_url: new_image_url,
            limit,
            minted: Nat::from(0),
            category: Default::default(),
        })
    );
}

#[test]
fn updating_collection_metadata_fails_for_non_existing_collection() {
    let creator = get_creator();
    let new_name = String::from("New name");
    let new_desc = String::from("New description");
    let new_image_url = Some(String::from("https::/domain.com/image.jpg"));

    assert_eq!(
        update_metadata(creator, Nat::from(0), new_name.clone(), new_desc.clone(), new_image_url, None,),
        Err(Error::CollectionNotFound)
    );
}

#[test]
fn updating_collection_metadata_fails_when_not_called_by_creator() {
    let creator = get_creator();
    let collection_name = String::from("collection1");
    let collection_desc = String::from("A basic collection.");
    let transferable = false;
    let image_url = None;
    let limit = None;

    create_collection(
        creator,
        collection_name.clone(),
        collection_desc.clone(),
        transferable,
        limit.clone(),
        image_url.clone(),
        Default::default(),
    );

    assert_eq!(
        get_collection(Nat::from(0)),
        Some(Collection {
            id: Nat::from(0),
            creator,
            name: collection_name,
            description: collection_desc,
            transferable,
            image_url,
            limit,
            minted: Nat::from(0),
            category: Default::default()
        })
    );

    let new_name = String::from("New name");
    let new_desc = String::from("New description");
    let new_image_url = Some(String::from("https://domain.com/image.jpg"));
    assert_eq!(
        update_metadata(
            // the default principal is not allowed to make this call.
            get_default_principal(),
            Nat::from(0),
            new_name.clone(),
            new_desc.clone(),
            new_image_url.clone(),
            None,
        ),
        Err(Error::OnlyCollectionCreatorAllowed)
    );
}

#[test]
fn get_collection_works_when_collection_doesnt_exist() {
    assert_eq!(get_collection(Nat::from(0)), None);
}

#[test]
fn get_creator_collections_works() {
    let creator = get_creator();
    let name = String::from("collection1");
    let transferable = false;

    let collection = create_mock_collection(creator, name.clone(), transferable);

    assert_eq!(
        collections_created_by(creator),
        vec![Collection {
            id: Nat::from(0),
            creator,
            name,
            description: collection.description,
            transferable,
            image_url: collection.image_url,
            limit: collection.limit,
            minted: collection.minted,
            category: Default::default(),
        }]
    );
}
#[test]
fn minting_nfts_works() {
    let creator = get_creator();

    let mut collection = create_mock_collection(creator, "Car Collection".to_string(), false);

    let alice = get_default_principal();

    assert!(mint_nft(
        creator,
        alice,
        collection.clone().id,
        "Car 1".to_string(),
        "...".to_string(),
        None
    )
    .is_ok());
    assert!(mint_nft(
        creator,
        alice,
        collection.clone().id,
        "Car 2".to_string(),
        "...".to_string(),
        None
    )
    .is_ok());

    collection.minted = Nat::from(2);

    assert_eq!(
        nfts_of_user(alice),
        vec![
            Nft {
                id: (Nat::from(0), Nat::from(0)),
                name: "Car 1".to_string(),
                description: "...".to_string(),
                asset_url: None
            },
            Nft {
                id: (Nat::from(0), Nat::from(1)),
                name: "Car 2".to_string(),
                description: "...".to_string(),
                asset_url: None
            }
        ]
    );

    assert_eq!(get_collection(Nat::from(0)).unwrap(), collection);
}

#[test]
fn minting_limit_works() {
    let creator = get_creator();
    let name = String::from("collection");
    let description = String::from("A basic collection.");
    let transferable = false;
    let image_url = None;
    let limit: Option<Nat> = Some(Nat::from(1));

    let collection_id = create_collection(creator, name, description, transferable, limit, image_url, Default::default());

    let alice = get_default_principal();

    assert!(mint_nft(
        creator,
        alice,
        collection_id.clone(),
        "Car 1".to_string(),
        "...".to_string(),
        None
    )
    .is_ok());
    assert_eq!(
        mint_nft(creator, alice, collection_id, "Car 2".to_string(), "...".to_string(), None),
        Err(Error::LimitReached)
    );
}

#[test]
fn nft_transfer_works() {
    let creator = get_creator();
    let name = String::from("collection");
    let transferable = true;

    let mut collection = create_mock_collection(creator, name, transferable);

    // The creator mints a nft for himself.
    assert!(mint_nft(
        creator,
        creator,
        collection.id.clone(),
        "Car 1".to_string(),
        "...".to_string(),
        None
    )
    .is_ok());

    // The supply increased.
    collection.minted = Nat::from(1);
    assert_eq!(get_collection(Nat::from(0)).unwrap(), collection);

    assert_eq!(
        nfts_of_user(creator),
        vec![Nft {
            id: (Nat::from(0), Nat::from(0)),
            name: "Car 1".to_string(),
            description: "...".to_string(),
            asset_url: None
        },]
    );

    // Alice is going to be the recepient.
    let alice = get_default_principal();
    // She doesn't have any nfts at the moment.
    assert_eq!(nfts_of_user(alice), vec![]);

    // Creator transfers the token to alice.
    assert_eq!(nft_transfer(creator, alice, (collection.clone().id, Nat::from(0))), Ok(()));

    assert_eq!(
        nfts_of_user(alice),
        vec![Nft {
            id: (Nat::from(0), Nat::from(0)),
            name: "Car 1".to_string(),
            description: "...".to_string(),
            asset_url: None
        },]
    );
    assert_eq!(nfts_of_user(creator), vec![]);
}

#[test]
fn nfts_within_collection_works() {
    let creator = get_creator();
    let name = String::from("collection");
    let transferable = true;

    let collection = create_mock_collection(creator, name, transferable);

    let mut nfts: Vec<Nft> = vec![];
    (0..50).for_each(|i| {
        assert!(mint_nft(
            creator,
            creator,
            collection.id.clone(),
            format!("Car {}", i),
            "...".to_string(),
            None
        )
        .is_ok());

        nfts.push(Nft {
            id: (Nat::from(0), Nat::from(i)),
            name: format!("Car {}", i),
            description: "...".to_string(),
            asset_url: None,
        });
    });

    // Works when `start_index` or `count` are not set.
    assert_eq!(nfts_within_collection(collection.id.clone(), None, None), nfts);

    // Works when just `start_index` is set.
    assert_eq!(
        nfts_within_collection(collection.id.clone(), Some(5), None),
        nfts.iter().skip(5).cloned().collect::<Vec<Nft>>()
    );

    // Works when just `count` is set.
    assert_eq!(
        nfts_within_collection(collection.id.clone(), None, Some(42)),
        nfts.iter().take(42).cloned().collect::<Vec<Nft>>()
    );

    // Works when both `start_index` and `count` are set.
    assert_eq!(
        nfts_within_collection(collection.id.clone(), Some(6), Some(42)),
        nfts.iter().skip(6).take(42).cloned().collect::<Vec<Nft>>()
    );

    // Works when both `start_index` + `count` > minted.
    assert_eq!(nfts_within_collection(collection.id.clone(), Some(69), Some(42)), vec![]);

    // Works when both `start_index` > minted.
    assert_eq!(nfts_within_collection(collection.id.clone(), Some(69), None), vec![]);

    // Works when both `count` > minted.
    assert_eq!(nfts_within_collection(collection.id.clone(), None, Some(69)), nfts);
}

#[test]
fn getting_all_collections_works() {
    let creator = get_creator();
    let transferable = true;

    let mut collections: Vec<Collection> = vec![];
    (0..50).for_each(|i| {
        let collection = create_mock_collection(creator, format!("collection{}", i), transferable);
        collections.push(collection);
    });

    // Works when `start_index` or `count` are not set.
    assert_eq!(all_collections(None, None), collections);

    // Works when just `start_index` is set.
    assert_eq!(
        all_collections(Some(5), None),
        collections.iter().skip(5).cloned().collect::<Vec<Collection>>()
    );

    // Works when just `count` is set.
    assert_eq!(
        all_collections(None, Some(42)),
        collections.iter().take(42).cloned().collect::<Vec<Collection>>()
    );

    // Works when both `start_index` and `count` are set.
    assert_eq!(
        all_collections(Some(6), Some(42)),
        collections.iter().skip(6).take(42).cloned().collect::<Vec<Collection>>()
    );

    // Works when both `start_index` + `count` > `collection_count`.
    assert_eq!(all_collections(Some(69), Some(42)), vec![]);

    // Works when both `start_index` > `collection_count`..
    assert_eq!(all_collections(Some(69), None), vec![]);

    // Works when both `count` > `collection_count`..
    assert_eq!(all_collections(None, Some(69)), collections);
}

fn create_mock_collection(creator: Principal, name: String, transferable: bool) -> Collection {
    let description = format!("Description of: {}", name);
    let image_url = None;
    let limit: Option<Nat> = None;

    let id = create_collection(
        creator,
        name.clone(),
        description.clone(),
        transferable,
        limit.clone(),
        image_url.clone(),
        Default::default(),
    );

    Collection {
        id,
        creator,
        name,
        description,
        transferable,
        image_url,
        limit,
        minted: Nat::from(0),
        category: Default::default(),
    }
}

fn get_creator() -> Principal {
    Principal::from_text("arlij-g2zpo-epfot-36ufg-vm4gj-3j4tj-rsjjt-fsv2m-sp4z7-nnk6b-lqe").unwrap()
}

fn get_default_principal() -> Principal {
    Principal::from_text("2vxsx-fae").unwrap()
}
