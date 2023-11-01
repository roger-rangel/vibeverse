use candid::Principal;

use crate::memory::STATE;

pub fn set_collection_fee(caller: Principal, fee: u64) -> Result<(), &'static str> {
    let Some(admin) = admin() else {
        return Err("Must specify admin first");
    };
    if caller != admin {
        return Err("Caller must be admin");
    }
    STATE.with(|state| state.borrow_mut().collection_fee = fee);

    Ok(())
}

pub fn set_mint_fee(caller: Principal, fee: u64) -> Result<(), &'static str> {
    let Some(admin) = admin() else {
        return Err("Must specify admin first");
    };
    if caller != admin {
        return Err("Caller must be admin");
    }
    STATE.with(|state| state.borrow_mut().mint_fee = fee);

    Ok(())
}

pub fn set_vibe_token(caller: Principal, vibe: Principal) -> Result<(), &'static str> {
    let Some(admin) = admin() else {
        return Err("Must specify admin first");
    };
    if caller != admin {
        return Err("Caller must be admin");
    }

    STATE.with(|state| state.borrow_mut().vibe_token = Some(vibe));

    Ok(())
}

pub fn set_admin(new_admin: Principal) -> Result<(), &'static str> {
    let Some(_) = admin() else {
        return Err("Admin is already set.");
    };

    STATE.with(|state| state.borrow_mut().admin = Some(new_admin));

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

pub fn admin() -> Option<Principal> {
    STATE.with(|admin| admin.borrow().admin)
}
