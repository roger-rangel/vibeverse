use candid::Principal;

use crate::memory::STATE;

pub fn set_collection_fee(fee: u64) -> Result<(), &'static str> {
    STATE.with(|state| state.borrow_mut().collection_fee = fee);

    Ok(())
}

pub fn set_mint_fee(fee: u64) -> Result<(), &'static str> {
    STATE.with(|state| state.borrow_mut().mint_fee = fee);

    Ok(())
}

pub fn set_vibe_token(vibe: Principal) -> Result<(), &'static str> {
    STATE.with(|state| state.borrow_mut().vibe_token = Some(vibe));

    Ok(())
}

pub fn collection_fee() -> u64 {
    STATE.with(|fee| fee.borrow().collection_fee)
}

pub fn mint_fee() -> u64 {
    STATE.with(|fee| fee.borrow().mint_fee)
}

pub fn vibe_token() -> Option<Principal> {
    STATE.with(|vibe| vibe.borrow().vibe_token)
}
