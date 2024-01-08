use async_trait::async_trait;
use candid::{CandidType, Deserialize, Nat, Principal};

use ic_cdk::api::call::CallResult;
use serde::Serialize;
use serde_bytes::ByteBuf;

pub type Subaccount = [u8; 32];

#[derive(Serialize, CandidType, Deserialize, Clone, Debug, Copy, PartialEq, Eq)]
pub struct Account {
    pub owner: Principal,
    pub subaccount: Option<Subaccount>,
}

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct TransferArg {
    #[serde(default)]
    pub from_subaccount: Option<Subaccount>,
    pub to: Account,
    #[serde(default)]
    pub fee: Option<Nat>,
    #[serde(default)]
    pub created_at_time: Option<u64>,
    #[serde(default)]
    pub memo: Option<ByteBuf>,
    pub amount: Nat,
}

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq, Eq)]
pub enum TransferError {
    BadFee { expected_fee: Nat },
    BadBurn { min_burn_amount: Nat },
    InsufficientFunds { balance: Nat },
    TooOld,
    CreatedInFuture { ledger_time: u64 },
    TemporarilyUnavailable,
    Duplicate { duplicate_of: Nat },
    GenericError { error_code: Nat, message: String },
}

impl ToString for TransferError {
    fn to_string(&self) -> String {
        match self {
            TransferError::BadFee { expected_fee } => {
                format!("ICRC1: BadFee {{ expected_fee: {} }}", expected_fee)
            }
            TransferError::BadBurn { min_burn_amount } => {
                format!("ICRC1: BadBurn {{ min_burn_amount: {} }}", min_burn_amount)
            }
            TransferError::InsufficientFunds { balance } => {
                format!("ICRC1: InsufficientFunds {{ balance: {} }}", balance)
            }
            TransferError::TooOld => "ICRC1: TooOld".to_string(),
            TransferError::CreatedInFuture { ledger_time } => {
                format!("ICRC1: CreatedInFuture {{ ledger_time: {} }}", ledger_time)
            }
            TransferError::TemporarilyUnavailable => "ICRC1: TemporarilyUnavailable".to_string(),
            TransferError::Duplicate { duplicate_of } => {
                format!("ICRC1: Duplicate {{ duplicate_of: {} }}", duplicate_of)
            }
            TransferError::GenericError { error_code, message } => {
                format!("ICRC1: GenericError {{ error_code: {}, message: {} }}", error_code, message)
            }
        }
    }
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct BalanceOfArgs {
    account: Account,
}

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Standard {
    pub name: String,
    pub url: String,
}

#[async_trait]
pub trait ICRC1 {
    async fn icrc1_name(&self) -> CallResult<String>;
    async fn icrc1_symbol(&self) -> CallResult<String>;
    async fn icrc1_decimals(&self) -> CallResult<u8>;
    async fn icrc1_fee(&self) -> CallResult<Nat>;
    async fn icrc1_metadata(&self) -> CallResult<String>;
    async fn icrc1_total_supply(&self) -> CallResult<Nat>;
    async fn icrc1_minting_account(&self) -> CallResult<Option<Account>>;
    async fn icrc1_balance_of(&self, args: &BalanceOfArgs) -> CallResult<Nat>;
    async fn icrc1_transfer(&mut self, args: &TransferArg) -> CallResult<Result<Nat, TransferError>>;
    async fn icrc1_supported_standards(&self) -> CallResult<Vec<Standard>>;
}
