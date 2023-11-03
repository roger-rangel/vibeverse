use ic_cdk::caller;

use crate::admins::is_admin;

pub fn caller_is_admin() -> Result<(), String> {
    let caller = caller();

    if is_admin(caller) {
        Ok(())
    } else {
        Err("Caller is not a admin".to_string())
    }
}
