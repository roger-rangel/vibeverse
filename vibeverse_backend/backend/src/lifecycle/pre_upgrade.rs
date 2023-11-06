use ic_cdk_macros::pre_upgrade;
use ic_stable_structures::{
    memory_manager::MemoryId,
    writer::{BufferedWriter, Writer},
};
use libraries::serializer;
use tracing::info;

use crate::{
    lifecycle::UPGRADE_BUFFER_SIZE,
    memory::{self, COLLECTIONS_OF, METADATA, NFTS, NFTS_OF, STATE},
};

macro_rules! store_state {
    ($x:ident,$y:expr) => {
        $x.with(|s| {
            let state = s.take();

            let mut memory = memory::get_memory(MemoryId::new($y));

            let writer = BufferedWriter::new(UPGRADE_BUFFER_SIZE, Writer::new(&mut memory, 0));
            serializer::serialize(state, writer).unwrap();
        });
    };
}

// A pre-upgrade hook for serializing the data stored on the heap.
#[pre_upgrade]
fn pre_upgrade() {
    STATE.with(|s| {
        let state = s.take();

        let mut memory = memory::get_upgrades_memory();

        let writer = BufferedWriter::new(UPGRADE_BUFFER_SIZE, Writer::new(&mut memory, 0));
        serializer::serialize(state, writer).unwrap();
    });

    store_state!(NFTS, 3);
    store_state!(COLLECTIONS_OF, 4);
    store_state!(NFTS_OF, 5);

    store_state!(METADATA, 6);

    info!("Upgrade ready");
}
