use ic_cdk_macros::post_upgrade;
use ic_stable_structures::reader::{BufferedReader, Reader};
use tracing::info;

use crate::{
    lifecycle::{serializer, UPGRADE_BUFFER_SIZE},
    memory::{self, STATE},
};

// A post-upgrade hook for deserializing the data back into the heap.
#[post_upgrade]
fn post_upgrade() {
    let memory = memory::get_upgrades_memory();

    let reader = BufferedReader::new(UPGRADE_BUFFER_SIZE, Reader::new(&memory, 0));

    let state = serializer::deserialize(reader).unwrap();
    STATE.with(|s| *s.borrow_mut() = state);

    info!("Upgrade complete");
}
