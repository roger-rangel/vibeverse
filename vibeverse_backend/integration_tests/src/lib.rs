#![cfg(test)]

use candid::Principal;
use pocket_ic::PocketIc;
use types::{CanisterId, Cycles};

mod client;
mod env;
mod nfts_tests;
mod rng;
mod setup;
mod types;
mod utils;
mod wasms;
pub struct TestEnv {
    pub env: PocketIc,
    pub canister_ids: CanisterIds,
    pub controller: Principal,
}

#[derive(Debug)]
pub struct CanisterIds {
    pub backend: CanisterId,
    pub icp_ledger: CanisterId,
    pub cycles_minting_canister: CanisterId,
}

const T: Cycles = 1_000_000_000_000;
const NNS_INTERNET_IDENTITY_CANISTER_ID: CanisterId = Principal::from_slice(&[0, 0, 0, 0, 0, 0, 0, 10, 1, 1]);
