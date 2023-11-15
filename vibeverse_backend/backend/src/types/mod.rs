mod community;
mod creator;
mod emoji;
mod memory;
mod nft;
mod stable_nat;
mod storable_principal;

use std::collections::{BTreeMap, HashSet};

pub use community::*;
pub use creator::*;
pub use emoji::*;
pub use memory::*;
pub use nft::*;
pub use stable_nat::*;
pub use storable_principal::*;

pub fn is_empty_slice<T>(value: &[T]) -> bool {
    value.is_empty()
}

pub fn is_empty_hashset<T>(value: &HashSet<T>) -> bool {
    value.is_empty()
}

#[allow(dead_code)]
pub fn is_empty_btreemap<K, V>(value: &BTreeMap<K, V>) -> bool {
    value.is_empty()
}
