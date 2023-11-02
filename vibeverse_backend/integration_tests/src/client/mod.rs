#![allow(dead_code)]
use super::types::{CanisterId, CanisterWasm};
use crate::T;
use candid::{CandidType, Principal};
use ic_cdk::api::management_canister::main::{CanisterInstallMode, InstallCodeArgument};
use pocket_ic::{PocketIc, UserError, WasmResult};
use serde::de::DeserializeOwned;

mod macros;

pub mod backend;

const INIT_CYCLES_BALANCE: u128 = 1_000 * T;

pub fn create_canister(env: &mut PocketIc, controller: Principal) -> CanisterId {
    let canister_id = env.create_canister_with_settings(None, Some(controller));
    env.add_cycles(canister_id, INIT_CYCLES_BALANCE);
    canister_id
}

pub fn start_canister(env: &mut PocketIc, sender: Principal, canister_id: CanisterId) {
    env.update_call(
        Principal::management_canister(),
        sender,
        "start_canister",
        candid::encode_one(StartStopArgs::new(canister_id)).unwrap(),
    )
    .unwrap();
}

pub fn stop_canister(env: &mut PocketIc, sender: Principal, canister_id: CanisterId) {
    env.update_call(
        Principal::management_canister(),
        sender,
        "stop_canister",
        candid::encode_one(StartStopArgs::new(canister_id)).unwrap(),
    )
    .unwrap();
}

pub fn install_canister<P: CandidType>(
    env: &mut PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    wasm: CanisterWasm,
    payload: P,
) {
    execute_update_no_response(
        env,
        sender,
        Principal::management_canister(),
        "install_code",
        &InstallCodeArgument {
            mode: CanisterInstallMode::Install,
            canister_id,
            wasm_module: wasm.module,
            arg: candid::encode_one(&payload).unwrap(),
        },
    )
}

pub fn execute_query<P: CandidType, R: CandidType + DeserializeOwned>(
    env: &PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    method_name: &str,
    payload: &P,
) -> R {
    unwrap_response(env.query_call(canister_id, sender, method_name, candid::encode_one(payload).unwrap()))
}

pub fn execute_update<P: CandidType, R: CandidType + DeserializeOwned>(
    env: &mut PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    method_name: &str,
    payload: &P,
) -> R {
    unwrap_response(env.update_call(canister_id, sender, method_name, candid::encode_one(payload).unwrap()))
}

pub fn execute_update_no_response<P: CandidType>(
    env: &mut PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    method_name: &str,
    payload: &P,
) {
    env.update_call(canister_id, sender, method_name, candid::encode_one(payload).unwrap())
        .unwrap();
}

fn unwrap_response<R: CandidType + DeserializeOwned>(response: Result<WasmResult, UserError>) -> R {
    match response.unwrap() {
        WasmResult::Reply(bytes) => candid::decode_one(&bytes).unwrap(),
        WasmResult::Reject(error) => panic!("{error}"),
    }
}

#[derive(CandidType)]
struct StartStopArgs {
    canister_id: CanisterId,
}

impl StartStopArgs {
    fn new(canister_id: CanisterId) -> StartStopArgs {
        StartStopArgs { canister_id }
    }
}
