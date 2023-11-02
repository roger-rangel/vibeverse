use candid::Nat;

use crate::env::ENV;
use crate::rng::random_user_principal;
use crate::{client, TestEnv};

use std::ops::Deref;

#[test]
fn get_collection_count() {
    let mut wrapper = ENV.deref().get();
    let TestEnv { env, canister_ids, .. } = wrapper.env();
    let (principal, _) = random_user_principal();
    let user_count = client::backend::happy_path::collection_count(env, principal, canister_ids.backend);

    assert_eq!(user_count, Nat::from(0));
}
