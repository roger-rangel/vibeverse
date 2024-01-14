use async_trait::async_trait;
use candid::{CandidType, Nat, Principal};
use serde::{Deserialize, Serialize};

use crate::interface::icrc_1::ICRC1;
use ic_cdk::api::call::CallResult;

use super::{Account, BalanceOfArgs, Standard, TransferArg, TransferError};

pub struct VibeToken {
    pub principal: Principal,
}

impl VibeToken {
    pub fn new(principal: Principal) -> Self {
        Self { principal }
    }
}

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub struct EmptyArgs {}

#[async_trait]
impl ICRC1 for VibeToken {
    // generate_c2c_call_no_arg!(icrc1_name);

    async fn icrc1_name(&self) -> CallResult<String> {
        let args = EmptyArgs {};

        let _call_result: (String,) = ic_cdk::call(self.principal, "icrc1_name", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_symbol(&self) -> CallResult<String> {
        let args = EmptyArgs {};

        let _call_result: (String,) = ic_cdk::call(self.principal, "icrc1_symbol", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_decimals(&self) -> CallResult<u8> {
        let args = EmptyArgs {};

        let _call_result: (u8,) = ic_cdk::call(self.principal, "icrc1_decimals", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_fee(&self) -> CallResult<Nat> {
        let args = EmptyArgs {};

        let _call_result: (Nat,) = ic_cdk::call(self.principal, "icrc1_fee", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_metadata(&self) -> CallResult<String> {
        let args = EmptyArgs {};

        let _call_result: (String,) = ic_cdk::call(self.principal, "icrc1_metadata", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_total_supply(&self) -> CallResult<Nat> {
        let args = EmptyArgs {};

        let _call_result: (Nat,) = ic_cdk::call(self.principal, "icrc1_total_supply", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_minting_account(&self) -> CallResult<Option<Account>> {
        let args = EmptyArgs {};

        let _call_result: (Option<Account>,) = ic_cdk::call(self.principal, "icrc1_minting_account", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_balance_of(&self, args: &BalanceOfArgs) -> CallResult<Nat> {
        let _call_result: (Nat,) = ic_cdk::call(self.principal, "icrc1_balance_of", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_transfer(&mut self, args: &TransferArg) -> CallResult<Result<Nat, TransferError>> {
        let _call_result: (Result<Nat, TransferError>,) = ic_cdk::call(self.principal, "icrc1_transfer", (args,)).await?;

        Ok(_call_result.0)
    }

    async fn icrc1_supported_standards(&self) -> CallResult<Vec<Standard>> {
        let args = EmptyArgs {};

        let _call_result: (Vec<Standard>,) = ic_cdk::call(self.principal, "icrc1_supported_standards", (args,)).await?;

        Ok(_call_result.0)
    }
}
