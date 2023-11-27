use candid::{CandidType, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::{borrow::Cow, collections::BTreeMap};

use libraries::msgpack::{deserialize_then_unwrap, serialize_then_unwrap};

use super::CourseId;

pub type UserId = Principal;

#[derive(Clone, CandidType, PartialEq, Debug, Serialize, Deserialize)]
pub struct Creator {
    /// The display name of the creator.
    #[serde(rename = "n", default)]
    pub name: String,
    /// The avatar of the creator.
    #[serde(rename = "a", default)]
    pub avatar: String,
    #[serde(rename = "cc", default)]
    pub created_courses: BTreeMap<CourseId, u64>,
    #[serde(rename = "lc", default)]
    pub completed_courses: BTreeMap<CourseId, u64>,
}

impl Storable for Creator {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serialize_then_unwrap(self))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        deserialize_then_unwrap(bytes.as_ref())
    }

    const BOUND: Bound = Bound::Unbounded;
}

impl Creator {
    pub fn new(name: String, avatar: String) -> Self {
        Self {
            name,
            avatar,
            created_courses: Default::default(),
            completed_courses: Default::default(),
        }
    }

    pub fn add_created_course(&mut self, course: CourseId, unlocked: u64) {
        self.created_courses.insert(course, unlocked);
    }

    pub fn add_created_course_now(&mut self, course: CourseId) {
        self.created_courses.insert(course, ic_cdk::api::time());
    }

    pub fn add_completed_course(&mut self, course: CourseId, unlocked: u64) {
        self.completed_courses.insert(course, unlocked);
    }

    pub fn add_completed_course_now(&mut self, course: CourseId) {
        self.completed_courses.insert(course, ic_cdk::api::time());
    }
}
