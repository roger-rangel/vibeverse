use crate::{
    memory::METADATA,
    types::{NftId, NftMetadata},
};

pub fn get_metadata(nft_id: NftId) -> Option<NftMetadata> {
    METADATA.with(|m| m.borrow().get(&nft_id).cloned())
}
