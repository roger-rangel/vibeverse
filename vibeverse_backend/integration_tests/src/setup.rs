use crate::client::{create_canister, install_canister};
use crate::rng::random_principal;
use crate::types::CanisterId;
use crate::utils::tick_many;
use crate::{wasms, CanisterIds, TestEnv};
use candid::{CandidType, Principal};
use ic_ledger_types::{AccountIdentifier, BlockIndex, Tokens, DEFAULT_SUBACCOUNT};

use pocket_ic::PocketIc;
use std::collections::{HashMap, HashSet};
use std::env;
use std::path::Path;

pub static POCKET_IC_BIN: &str = "./local-bin/pocket-ic";
// "/home/master/workspace/temp/vibeverse/vibeverse_backend/integration_tests/local-bin/pocket-ic";

pub fn setup_new_env() -> TestEnv {
    let path = match env::var_os("POCKET_IC_BIN") {
        None => {
            env::set_var("POCKET_IC_BIN", POCKET_IC_BIN);
            POCKET_IC_BIN.to_string()
        }
        Some(path) => path
            .clone()
            .into_string()
            .unwrap_or_else(|_| panic!("Invalid string path for {path:?}")),
    };

    if !Path::new(&path).exists() {
        println!("
        Could not find the PocketIC binary to run canister integration tests.

        I looked for it at {:?}. You can specify another path with the environment variable POCKET_IC_BIN (note that I run from {:?}).

        Running the testing script will automatically place the PocketIC binary at the right place to be run without setting the POCKET_IC_BIN environment variable:
            ./scripts/run-integration-tests.sh
        ", &path, &env::current_dir().map(|x| x.display().to_string()).unwrap_or_else(|_| "an unknown directory".to_string()));
    }

    let mut env = PocketIc::new();
    let controller = random_principal();
    let canister_ids = install_canisters(&mut env, controller);

    TestEnv {
        env,
        canister_ids,
        controller,
    }
}

#[derive(CandidType)]
pub struct BackendInstallArgs {}

fn install_canisters(env: &mut PocketIc, controller: Principal) -> CanisterIds {
    let nns_canister_ids: Vec<_> = (0..1).map(|_| create_canister(env, controller)).collect();

    let nns_ledger_canister_id = nns_canister_ids[0];
    let cycles_minting_canister_id = nns_canister_ids[1];
    let backend_canister_id = create_canister(env, controller);

    let icp_ledger_canister_wasm = wasms::ICP_LEDGER.clone();
    let cycles_minting_canister_wasm = wasms::CYCLES_MINTING_CANISTER.clone();
    let backend_canister_wasm = wasms::BACKEND.clone();

    let minting_account = AccountIdentifier::new(&controller, &DEFAULT_SUBACCOUNT);

    let icp_ledger_init_args = NnsLedgerCanisterInitPayload {
        minting_account: minting_account.to_string(),
        initial_values: HashMap::new(),
        send_whitelist: HashSet::new(),
        transfer_fee: Some(Tokens::from_e8s(10_000)),
    };
    install_canister(
        env,
        controller,
        nns_ledger_canister_id,
        icp_ledger_canister_wasm,
        icp_ledger_init_args,
    );

    let cycles_minting_canister_init_args = CyclesMintingCanisterInitPayload {
        ledger_canister_id: nns_ledger_canister_id,
        governance_canister_id: CanisterId::anonymous(),
        minting_account_id: Some(minting_account.to_string()),
        last_purged_notification: Some(0),
    };
    install_canister(
        env,
        controller,
        cycles_minting_canister_id,
        cycles_minting_canister_wasm,
        cycles_minting_canister_init_args,
    );

    let backend_install_args = BackendInstallArgs {};
    install_canister(
        env,
        controller,
        backend_canister_id,
        backend_canister_wasm,
        &backend_install_args,
    );

    // Tick a load of times so that all of the child canisters have time to get installed
    tick_many(env, 30);

    CanisterIds {
        backend: backend_canister_id,
        icp_ledger: nns_ledger_canister_id,
        cycles_minting_canister: cycles_minting_canister_id,
    }
}

#[derive(CandidType)]
struct NnsLedgerCanisterInitPayload {
    minting_account: String,
    initial_values: HashMap<String, Tokens>,
    send_whitelist: HashSet<CanisterId>,
    transfer_fee: Option<Tokens>,
}

#[derive(CandidType)]
struct CyclesMintingCanisterInitPayload {
    ledger_canister_id: CanisterId,
    governance_canister_id: CanisterId,
    minting_account_id: Option<String>,
    last_purged_notification: Option<BlockIndex>,
}

#[derive(CandidType, Default)]
struct SnsWasmCanisterInitPayload {
    allowed_principals: Vec<Principal>,
    access_controls_enabled: bool,
    sns_subnet_ids: Vec<Principal>,
}
