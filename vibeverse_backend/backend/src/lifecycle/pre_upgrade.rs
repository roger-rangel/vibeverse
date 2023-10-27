use ic_cdk_macros::pre_upgrade;
use ic_stable_structures::writer::{BufferedWriter, Writer};
use tracing::info;

use crate::{
    lifecycle::{serializer, UPGRADE_BUFFER_SIZE},
    memory::{self, STATE},
};

// A pre-upgrade hook for serializing the data stored on the heap.
#[pre_upgrade]
fn pre_upgrade() {
    STATE.with(|s| {
        let state = s.take();

        let mut memory = memory::get_upgrades_memory();

        let writer = BufferedWriter::new(UPGRADE_BUFFER_SIZE, Writer::new(&mut memory, 0));
        serializer::serialize(state, writer).unwrap();
    });

    info!("Upgrade ready");
}
