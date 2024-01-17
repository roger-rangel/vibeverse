use candid::Principal;
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Serialize, Deserialize)]
pub struct StorablePrincipal(Principal);

const PRINCIPAL_MAX_LENGTH_IN_BYTES: u32 = 29;

impl Storable for StorablePrincipal {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Borrowed(self.0.as_slice())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        StorablePrincipal(Principal::from_slice(&bytes))
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: PRINCIPAL_MAX_LENGTH_IN_BYTES,
        is_fixed_size: false,
    };
}

impl From<Principal> for StorablePrincipal {
    fn from(principal: Principal) -> Self {
        Self(principal)
    }
}

impl Into<Principal> for StorablePrincipal {
    fn into(self) -> Principal {
        self.0
    }
}
