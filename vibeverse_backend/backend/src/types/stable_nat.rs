//! All logics were copied from Nat implementation

use candid::{CandidType, Nat};

use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;
use std::cmp::{Ord, Ordering, PartialEq, PartialOrd};
use std::{fmt, ops::*};

use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

#[derive(CandidType, Ord, PartialOrd, Eq, PartialEq, Debug, Clone, Hash, Default, Serialize, Deserialize)]
pub struct StorableNat(pub Nat);

impl Storable for StorableNat {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}

impl From<Nat> for StorableNat {
    fn from(nat: Nat) -> Self {
        Self(nat)
    }
}

macro_rules! define_from {
    ($f: ty, $($t: ty)*) => ($(
        impl From<$t> for $f {
            #[inline]
            fn from(v: $t) -> Self { Self(v.into()) }
        }
    )*)
}

macro_rules! define_eq {
    ($f: ty, $($t: ty)*) => ($(
        impl PartialEq<$t> for $f {
            #[inline]
            #[must_use]
            fn eq(&self, v: &$t) -> bool { self.0.0.eq(&(*v).into()) }
        }
        impl PartialEq<$f> for $t {
            #[inline]
            #[must_use]
            fn eq(&self, v: &$f) -> bool { v.0.0.eq(&(*self).into()) }
        }
    )*)
}

macro_rules! define_op {
    (impl $imp: ident < $scalar: ty > for $res: ty, $method: ident) => {
        // Implement A * B
        impl $imp<$scalar> for $res {
            type Output = $res;

            #[inline]
            fn $method(self, other: $scalar) -> $res {
                Nat::from($imp::$method(self.0 .0, &other)).into()
            }
        }

        // Implement B * A
        impl $imp<$res> for $scalar {
            type Output = $res;

            #[inline]
            fn $method(self, other: $res) -> $res {
                Nat::from($imp::$method(other.0 .0, &self)).into()
            }
        }
    };
}

macro_rules! define_ord {
    ($scalar: ty, $res: ty) => {
        // A < B
        impl PartialOrd<$scalar> for $res {
            #[inline]
            fn partial_cmp(&self, other: &$scalar) -> Option<Ordering> {
                PartialOrd::partial_cmp(self, &<$res>::from(*other))
            }
        }
        // B < A
        impl PartialOrd<$res> for $scalar {
            #[inline]
            fn partial_cmp(&self, other: &$res) -> Option<Ordering> {
                PartialOrd::partial_cmp(&<$res>::from(*self), other)
            }
        }
    };
}

macro_rules! define_op_assign {
    (impl $imp: ident < $scalar: ty > for $res: ty, $method: ident) => {
        // Implement A * B
        impl $imp<$scalar> for $res {
            #[inline]
            fn $method(&mut self, other: $scalar) {
                $imp::$method(&mut self.0, other)
            }
        }
    };
}

macro_rules! define_ops {
    ($f: ty, $($t: ty)*) => ($(
        define_op!(impl Add<$t> for $f, add);
        define_op!(impl Sub<$t> for $f, sub);
        define_op!(impl Mul<$t> for $f, mul);
        define_op!(impl Div<$t> for $f, div);
        define_op!(impl Rem<$t> for $f, rem);

        define_ord!($t, $f);

        define_op_assign!(impl AddAssign<$t> for $f, add_assign);
        define_op_assign!(impl SubAssign<$t> for $f, sub_assign);
        define_op_assign!(impl MulAssign<$t> for $f, mul_assign);
        define_op_assign!(impl DivAssign<$t> for $f, div_assign);
        define_op_assign!(impl RemAssign<$t> for $f, rem_assign);
    )*)
}

define_from!( StorableNat, usize u8 u16 u32 u64 u128 );
define_eq!( StorableNat, usize u8 u16 u32 u64 u128 );
define_ops!( StorableNat, usize u8 u16 u32 u64 u128 );

// Need a separate macro to extract the Big[U]Int from the StorableNat/Int struct.
macro_rules! define_op_0 {
    (impl $imp: ident < $scalar: ty > for $res: ty, $method: ident) => {
        impl $imp<$scalar> for $res {
            type Output = $res;

            #[inline]
            fn $method(self, other: $scalar) -> $res {
                Nat::from($imp::$method(self.0 .0, &other.0 .0)).into()
            }
        }
    };
}

macro_rules! define_op_0_assign {
    (impl $imp: ident < $scalar: ty > for $res: ty, $method: ident) => {
        // Implement A * B
        impl $imp<$scalar> for $res {
            #[inline]
            fn $method(&mut self, other: $scalar) {
                $imp::$method(&mut self.0, other.0)
            }
        }
    };
}

define_op_0!(impl Add<StorableNat> for StorableNat, add);
define_op_0!(impl Sub<StorableNat> for StorableNat, sub);
define_op_0!(impl Mul<StorableNat> for StorableNat, mul);
define_op_0!(impl Div<StorableNat> for StorableNat, div);
define_op_0!(impl Rem<StorableNat> for StorableNat, rem);

define_op_0_assign!(impl AddAssign<StorableNat> for StorableNat, add_assign);
define_op_0_assign!(impl SubAssign<StorableNat> for StorableNat, sub_assign);
define_op_0_assign!(impl MulAssign<StorableNat> for StorableNat, mul_assign);
define_op_0_assign!(impl DivAssign<StorableNat> for StorableNat, div_assign);
define_op_0_assign!(impl RemAssign<StorableNat> for StorableNat, rem_assign);

// Special cases for literals which are i32, for Nat which isn't support in BigUint,
// so we add a conversion to u32.
impl From<i32> for StorableNat {
    #[inline]
    fn from(v: i32) -> Self {
        Self::from(v as u32)
    }
}
impl PartialEq<i32> for StorableNat {
    #[inline]
    #[must_use]
    fn eq(&self, v: &i32) -> bool {
        self.0 .0.eq(&(*v as u32).into())
    }
}

impl std::ops::Add<i32> for StorableNat {
    type Output = Self;

    #[inline]
    fn add(self, other: i32) -> Self {
        (self.0 + (other as u32)).into()
    }
}
impl std::ops::AddAssign<i32> for StorableNat {
    #[inline]
    fn add_assign(&mut self, other: i32) {
        self.0 += other as u32
    }
}

impl std::ops::Sub<i32> for StorableNat {
    type Output = Self;

    #[inline]
    fn sub(self, other: i32) -> Self {
        (self.0 - (other as u32)).into()
    }
}
impl std::ops::SubAssign<i32> for StorableNat {
    #[inline]
    fn sub_assign(&mut self, other: i32) {
        self.0 -= other as u32
    }
}

impl std::ops::Mul<i32> for StorableNat {
    type Output = Self;

    #[inline]
    fn mul(self, other: i32) -> Self {
        (self.0 * (other as u32)).into()
    }
}
impl std::ops::MulAssign<i32> for StorableNat {
    #[inline]
    fn mul_assign(&mut self, other: i32) {
        self.0 *= other as u32
    }
}

impl std::ops::Div<i32> for StorableNat {
    type Output = Self;

    #[inline]
    fn div(self, other: i32) -> Self {
        (self.0 / (other as u32)).into()
    }
}
impl std::ops::DivAssign<i32> for StorableNat {
    #[inline]
    fn div_assign(&mut self, other: i32) {
        self.0 /= other as u32
    }
}

impl std::ops::Rem<i32> for StorableNat {
    type Output = Self;

    #[inline]
    fn rem(self, other: i32) -> Self {
        (self.0 % (other as u32)).into()
    }
}
impl std::ops::RemAssign<i32> for StorableNat {
    #[inline]
    fn rem_assign(&mut self, other: i32) {
        self.0 %= other as u32
    }
}

impl fmt::Display for StorableNat {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        self.0.fmt(f)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde::Deserialize;

    #[derive(Default, Debug, Clone, Deserialize, Serialize, PartialEq, Eq)]
    pub struct TestStruct {
        inner: StorableNat,
    }

    #[test]
    fn test_serde_with_json() {
        let test_struct = TestStruct {
            inner: StorableNat::from(1000u64),
        };
        let serialized = serde_json::to_string(&test_struct).unwrap();
        let deserialized = serde_json::from_str(&serialized).unwrap();
        assert_eq!(test_struct, deserialized);

        // Nats serialize as arrays in JSON. The following tests the breakdown
        // of a big number into an array.
        // 13969838 * 2^32 + 2659581952 == 60000000000000000
        let test_struct = TestStruct {
            inner: Nat::parse(b"60000000000000000").unwrap().into(),
        };
        let serialized = serde_json::to_string(&test_struct).unwrap();
        assert_eq!(serialized, "{\"inner\":[2659581952,13969838]}");
        let deserialized = serde_json::from_str(&serialized).unwrap();
        assert_eq!(test_struct, deserialized);
    }

    #[test]
    fn test_serde_with_cbor() {
        let test_struct = TestStruct {
            inner: Nat::from(1000u64).into(),
        };
        let serialized = serde_cbor::to_vec(&test_struct).unwrap();
        let deserialized = serde_cbor::from_slice(&serialized).unwrap();
        assert_eq!(test_struct, deserialized);

        let test_struct = TestStruct {
            inner: Nat::parse(b"60000000000000000").unwrap().into(),
        };
        let serialized = serde_cbor::to_vec(&test_struct).unwrap();
        let deserialized = serde_cbor::from_slice(&serialized).unwrap();
        assert_eq!(test_struct, deserialized);
    }
}
