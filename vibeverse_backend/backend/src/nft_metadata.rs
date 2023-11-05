use crate::{
    memory::METADATA,
    types::{NftId, NftMetadata},
};

pub fn get_metadata(nft_id: NftId) -> Option<NftMetadata> {
    METADATA.with(|reactions| {
        let reactions = reactions.borrow();
        reactions.get(&nft_id).cloned()
    })
}
