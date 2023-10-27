use crate::types::{BuildVersion, CanisterWasm};
use crate::utils::local_bin;
use lazy_static::lazy_static;
use std::fs::File;
use std::io::Read;

lazy_static! {
    pub static ref BACKEND: CanisterWasm = get_canister_wasm("vibeverse_backend");
    pub static ref CYCLES_DISPENSER: CanisterWasm = get_canister_wasm("cycles_dispenser");
    pub static ref CYCLES_MINTING_CANISTER: CanisterWasm = get_canister_wasm("cycles_minting_canister");
    pub static ref ICP_LEDGER: CanisterWasm = get_canister_wasm("icp_ledger");
}

fn get_canister_wasm(canister_name: &str) -> CanisterWasm {
    let module = read_file_from_local_bin(&format!("{canister_name}.wasm.gz"));

    CanisterWasm {
        version: BuildVersion::min(),
        module,
    }
}

fn read_file_from_local_bin(file_name: &str) -> Vec<u8> {
    let mut file_path = local_bin();
    file_path.push(file_name);

    let mut file = File::open(&file_path).unwrap_or_else(|_| panic!("Failed to open file: {}", file_path.to_str().unwrap()));
    let mut bytes = Vec::new();
    file.read_to_end(&mut bytes).expect("Failed to read file");
    bytes
}
