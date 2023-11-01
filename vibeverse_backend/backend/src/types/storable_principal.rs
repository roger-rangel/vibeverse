use candid::Principal;
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Serialize, Deserialize)]
pub struct StorablePrincipal(Principal);

const PRINCIPAL_MAX_LENGTH_IN_BYTES: u32 = 29;

impl Storable for StorablePrincipal {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
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
