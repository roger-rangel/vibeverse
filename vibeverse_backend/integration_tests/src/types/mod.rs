use candid::Principal;

mod build_version;
mod canister_wasm;

pub use build_version::*;
pub use canister_wasm::*;
pub type CanisterId = Principal;
pub type Cycles = u128;
pub type TimestampMillis = u64;
