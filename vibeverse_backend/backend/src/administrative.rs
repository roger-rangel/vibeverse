use candid::Principal;

use crate::memory::{ADMIN, COLLECTION_FEE, MINT_FEE, VIBE_TOKEN};

pub fn set_collection_fee(caller: Principal, fee: u64) -> Result<(), &'static str> {
    let Some(admin) = admin() else {
        return Err("Must specify admin first");
    };
    if caller != admin {
        return Err("Caller must be admin");
    }
    COLLECTION_FEE.with(|f| *f.borrow_mut() = fee);

    Ok(())
}

pub fn set_mint_fee(caller: Principal, fee: u64) -> Result<(), &'static str> {
    let Some(admin) = admin() else {
        return Err("Must specify admin first");
    };
    if caller != admin {
        return Err("Caller must be admin");
    }
    MINT_FEE.with(|f| *f.borrow_mut() = fee);

    Ok(())
}

pub fn set_vibe_token(caller: Principal, vibe: Principal) -> Result<(), &'static str> {
    let Some(admin) = admin() else {
        return Err("Must specify admin first");
    };
    if caller != admin {
        return Err("Caller must be admin");
    }

    VIBE_TOKEN.with(|token| -> Result<(), &'static str> {
        let mut maybe_vibe = token.borrow_mut();
        *maybe_vibe = Some(vibe);

        Ok(())
    })?;

    Ok(())
}

pub fn set_admin(admin: Principal) -> Result<(), &'static str> {
    ADMIN.with(|a| -> Result<(), &'static str> {
        let mut maybe_admin = a.borrow_mut();
        if maybe_admin.is_some() {
            return Err("Admin is already set.");
        }
        *maybe_admin = Some(admin);
        Ok(())
    })?;

    Ok(())
}

pub fn collection_fee() -> u64 {
    COLLECTION_FEE.with(|fee| *fee.borrow())
}

pub fn mint_fee() -> u64 {
    MINT_FEE.with(|fee| *fee.borrow())
}

pub fn vibe_token() -> Option<Principal> {
    VIBE_TOKEN.with(|vibe| *vibe.borrow())
}

pub fn admin() -> Option<Principal> {
    ADMIN.with(|admin| *admin.borrow())
}
