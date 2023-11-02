use ic_cdk_macros::post_upgrade;
use ic_stable_structures::{
    memory_manager::MemoryId,
    reader::{BufferedReader, Reader},
};
use libraries::serializer;
use tracing::info;

use crate::{
    lifecycle::UPGRADE_BUFFER_SIZE,
    memory::{self, COLLECTIONS_OF, NFTS, NFTS_OF, STATE},
};

macro_rules! restore_state {
    ($x:ident,$y:expr) => {
        $x.with(|s| {
            let memory = memory::get_memory(MemoryId::new($y));

            let reader = BufferedReader::new(UPGRADE_BUFFER_SIZE, Reader::new(&memory, 0));

            let state = serializer::deserialize(reader).unwrap();
            *s.borrow_mut() = state;
        });
    };
}

// A post-upgrade hook for deserializing the data back into the heap.
#[post_upgrade]
fn post_upgrade() {
    let memory = memory::get_upgrades_memory();

    let reader = BufferedReader::new(UPGRADE_BUFFER_SIZE, Reader::new(&memory, 0));

    let state = serializer::deserialize(reader).unwrap();
    STATE.with(|s| *s.borrow_mut() = state);

    restore_state!(NFTS, 3);
    restore_state!(COLLECTIONS_OF, 4);
    restore_state!(NFTS_OF, 5);

    info!("Upgrade complete");
}
