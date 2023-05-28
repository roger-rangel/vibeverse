import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Creator { 'principal' : Principal, 'name' : string }
export interface Nft {
  'id' : bigint,
  'creator' : Principal,
  'image_url' : [] | [string],
  'name' : string,
  'minted' : bigint,
  'description' : string,
  'limit' : [] | [bigint],
}
export interface _SERVICE {
  'collections_count' : ActorMethod<[], bigint>,
  'collections_created_by' : ActorMethod<[Principal], Array<Nft>>,
  'collections_created_by_caller' : ActorMethod<[], Array<Nft>>,
  'create_collection' : ActorMethod<
    [string, string, boolean, [] | [bigint], [] | [string]],
    string
  >,
  'creator_metadata' : ActorMethod<[], [] | [Creator]>,
  'get_nft' : ActorMethod<[bigint], [] | [Nft]>,
  'mint_nft' : ActorMethod<[bigint, Principal], string>,
  'nfts_of_user' : ActorMethod<[Principal], Array<Nft>>,
  'set_creator_metadata' : ActorMethod<[string], string>,
  'transfer_nft' : ActorMethod<[bigint, Principal], string>,
  'update_collection_metadata' : ActorMethod<
    [bigint, string, string, [] | [string]],
    string
  >,
}
