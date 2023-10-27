use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub struct Args {
    pub principal: Principal,
}

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub struct GetCollectionCountArgs {}

pub mod happy_path {
    use candid::{Nat, Principal};
    use pocket_ic::PocketIc;

    use crate::types::CanisterId;

    use super::GetCollectionCountArgs;

    pub fn collection_count(env: &mut PocketIc, sender: Principal, canister_id: CanisterId) -> Nat {
        crate::client::execute_query(
            env,
            sender,
            canister_id.into(),
            "collection_count",
            &GetCollectionCountArgs {},
        )
    }
}
