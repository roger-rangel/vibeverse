use candid::Principal;

use crate::{creators::*, types::Creator};

#[test]
fn setting_creator_metadata_works() {
    let id = get_creator();
    let name = String::from("Creator#1");
    let avatar = String::from("https://example.com/avatar.png");
    let creator = Creator::new(name, avatar);
    set_creator_metadata(id, creator.clone()).unwrap();

    assert_eq!(creator_metadata(id), Some(creator));
}

#[test]
fn getting_creator_metadata_returns_none() {
    let creator = get_creator();
    assert_eq!(creator_metadata(creator), None);
}

fn get_creator() -> Principal {
    Principal::anonymous()
}
