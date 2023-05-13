use super::*;

#[test]
fn creating_nft_works() {
    let creator = get_creator();
    let nft_name = String::from("nft1");
    let nft_desc = String::from("A basic nft.");
    let transferable = false;
    let limit = None;
    let image_url = None;

    do_create_collection(
        creator,
        nft_name.clone(),
        nft_desc.clone(),
        transferable.clone(),
        limit.clone(),
        image_url.clone(),
    );

    assert_eq!(
        do_get_nft(Nat::from(0)),
        Some(Nft {
            id: Nat::from(0),
            creator,
            name: nft_name,
            description: nft_desc,
            transferable,
            image_url,
            limit,
            minted: Nat::from(0),
        })
    );
}

#[test]
fn updating_nft_metadata_works() {
    let creator = get_creator();
    let nft_name = String::from("nft1");
    let nft_desc = String::from("A basic nft.");
    let transferable = false;
    let image_url = None;
    let limit = None;

    do_create_collection(
        creator,
        nft_name.clone(),
        nft_desc.clone(),
        transferable.clone(),
        limit.clone(),
        image_url.clone(),
    );

    assert_eq!(
        do_get_nft(Nat::from(0)),
        Some(Nft {
            id: Nat::from(0),
            creator: creator.clone(),
            name: nft_name,
            description: nft_desc,
            transferable: transferable.clone(),
            image_url,
            limit: limit.clone(),
            minted: Nat::from(0),
        })
    );

    let new_name = String::from("New name");
    let new_desc = String::from("New description");
    let new_image_url = Some(String::from("https://domain.com/image.jpg"));
    assert_eq!(
        do_update_metadata(
            creator,
            Nat::from(0),
            new_name.clone(),
            new_desc.clone(),
            new_image_url.clone()
        ),
        Ok(())
    );

    assert_eq!(
        do_get_nft(Nat::from(0)),
        Some(Nft {
            id: Nat::from(0),
            creator,
            name: new_name,
            description: new_desc,
            transferable,
            image_url: new_image_url,
            limit,
            minted: Nat::from(0),
        })
    );
}

#[test]
fn updating_nft_metadata_fails_for_non_existing_nft() {
    let creator = get_creator();
    let new_name = String::from("New name");
    let new_desc = String::from("New description");
    let new_image_url = Some(String::from("https::/domain.com/image.jpg"));

    assert_eq!(
        do_update_metadata(
            creator,
            Nat::from(0),
            new_name.clone(),
            new_desc.clone(),
            new_image_url
        ),
        Err(Error::NftNotFound)
    );
}

#[test]
fn updating_nft_metadata_fails_when_not_called_by_creator() {
    let creator = get_creator();
    let nft_name = String::from("nft1");
    let nft_desc = String::from("A basic nft.");
    let transferable = false;
    let image_url = None;
    let limit = None;

    do_create_collection(
        creator,
        nft_name.clone(),
        nft_desc.clone(),
        transferable.clone(),
        limit.clone(),
        image_url.clone(),
    );

    assert_eq!(
        do_get_nft(Nat::from(0)),
        Some(Nft {
            id: Nat::from(0),
            creator: creator.clone(),
            name: nft_name,
            description: nft_desc,
            transferable,
            image_url,
            limit,
            minted: Nat::from(0),
        })
    );

    let new_name = String::from("New name");
    let new_desc = String::from("New description");
    let new_image_url = Some(String::from("https://domain.com/image.jpg"));
    assert_eq!(
        do_update_metadata(
            // the default principal is not allowed to make this call.
            get_default_principal(),
            Nat::from(0),
            new_name.clone(),
            new_desc.clone(),
            new_image_url.clone()
        ),
        Err(Error::NotAllowed)
    );
}

#[test]
fn get_nft_works_when_nft_doesnt_exist() {
    assert_eq!(do_get_nft(Nat::from(0)), None);
}

#[test]
fn get_creator_nfts_works() {
    let creator = get_creator();
    let name = String::from("nft1");
    let transferable = false;

    let nft = create_collection(creator, name.clone(), transferable);

    assert_eq!(
        do_get_nfts_of_creator(creator),
        vec![Nft {
            id: Nat::from(0),
            creator,
            name,
            description: nft.description,
            transferable,
            image_url: nft.image_url,
            limit: nft.limit,
            minted: nft.minted,
        }]
    );
}

#[test]
fn minting_nfts_works() {
    let creator = get_creator();

    let mut nft1 = create_collection(creator, format!("Nft1"), false);
    let mut nft2 = create_collection(creator, format!("Nft2"), false);

    let alice = get_default_principal();

    assert_eq!(do_mint_nft(creator, alice, nft1.clone().id), Ok(()));
    assert_eq!(do_mint_nft(creator, alice, nft2.clone().id), Ok(()));

    nft1.minted = Nat::from(1);
    nft2.minted = Nat::from(1);

    assert_eq!(do_get_nfts_of_user(alice), vec![nft1, nft2])
}

#[test]
fn minting_limit_works() {
    let creator = get_creator();
    let name = String::from("nft");
    let description = String::from("A basic nft.");
    let transferable = false;
    let image_url = None;
    let limit: Option<Nat> = Some(Nat::from(2));

    let _ = do_create_collection(creator, name, description, transferable, limit, image_url);

    let alice = get_default_principal();

    // Note that in theory we wouldn't mint multiple nfts for the same user.
    // We may support this kind of functionality in the future though.
    assert_eq!(do_mint_nft(creator, alice, Nat::from(0)), Ok(()));
    assert_eq!(do_mint_nft(creator, alice, Nat::from(0)), Ok(()));
    assert_eq!(
        do_mint_nft(creator, alice, Nat::from(0)),
        Err(Error::LimitReached)
    );
}

#[test]
fn nft_transfer_works() {
    let creator = get_creator();
    let name = String::from("nft");
    let transferable = true;

    let mut nft = create_collection(creator, name, transferable);

    // The creator mints a nft for himself.
    assert_eq!(do_mint_nft(creator, creator, nft.clone().id), Ok(()));
    // The supply increased.
    nft.minted = Nat::from(1);
    assert_eq!(do_get_nfts_of_user(creator), vec![nft.clone()]);

    // Alice is going to be the recepient.
    let alice = get_default_principal();
    // She doesn't have any nfts at the moment.
    assert_eq!(do_get_nfts_of_user(alice), vec![]);

    // Creator transfers the token to alice.
    assert_eq!(do_transfer_nft(creator, alice, nft.clone().id), Ok(()));

    assert_eq!(do_get_nfts_of_user(alice), vec![nft]);
    assert_eq!(do_get_nfts_of_user(creator), vec![]);
}

fn create_collection(creator: Principal, name: String, transferable: bool) -> Nft {
    let description = format!("Description of: {}", name);
    let image_url = None;
    let limit: Option<Nat> = None;

    let id = do_create_collection(
        creator,
        name.clone(),
        description.clone(),
        transferable.clone(),
        limit.clone(),
        image_url.clone(),
    );

    Nft {
        id,
        creator,
        name,
        description,
        transferable,
        image_url,
        limit,
        minted: Nat::from(0),
    }
}

fn get_creator() -> Principal {
    Principal::from_text("arlij-g2zpo-epfot-36ufg-vm4gj-3j4tj-rsjjt-fsv2m-sp4z7-nnk6b-lqe").unwrap()
}

fn get_default_principal() -> Principal {
    Principal::from_text("2vxsx-fae").unwrap()
}
