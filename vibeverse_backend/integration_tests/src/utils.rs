#![allow(dead_code)]

use pocket_ic::PocketIc;
use std::path::PathBuf;
use std::time::SystemTime;

use crate::types::TimestampMillis;

pub fn tick_many(env: &mut PocketIc, count: usize) {
    for _ in 0..count {
        env.tick();
    }
}

pub fn now_millis(env: &PocketIc) -> TimestampMillis {
    now_nanos(env) / 1_000_000
}

pub fn now_nanos(env: &PocketIc) -> TimestampMillis {
    env.get_time().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_nanos() as u64
}

pub fn local_bin() -> PathBuf {
    let mut file_path =
        PathBuf::from(std::env::var("CARGO_MANIFEST_DIR").expect("Failed to read CARGO_MANIFEST_DIR env variable"));
    file_path.push("local-bin");
    file_path
}
