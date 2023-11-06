import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AddRemoveReactionResult = { 'Added' : null } |
  { 'Removed' : null };
export interface Collection {
  'id' : bigint,
  'creator' : Principal,
  'image_url' : [] | [string],
  'transferable' : boolean,
  'name' : string,
  'minted' : bigint,
  'description' : string,
  'limit' : [] | [bigint],
  'category' : string,
}
export interface Creator { 'a' : string, 'n' : string }
export interface Nft {
  'id' : [bigint, bigint],
  'name' : string,
  'description' : string,
  'asset_url' : [] | [string],
}
export interface NftMetadata { 'r' : Array<[string, Array<Principal>]> }
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : bigint } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : AddRemoveReactionResult } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : [bigint, bigint] } |
  { 'Err' : string };
export type Result_4 = { 'Ok' : null } |
  { 'Err' : string };
export interface _SERVICE {
  'add_admin' : ActorMethod<[Principal], Result>,
  'add_emojis' : ActorMethod<[Array<string>], Result_1>,
  'add_remove_reaction' : ActorMethod<[bigint, bigint, string], Result_2>,
  'all_nfts' : ActorMethod<[[] | [bigint], [] | [bigint]], Array<Nft>>,
  'collection_count' : ActorMethod<[], bigint>,
  'collection_fee' : ActorMethod<[], bigint>,
  'collections' : ActorMethod<
    [[] | [bigint], [] | [bigint]],
    Array<Collection>
  >,
  'collections_created_by' : ActorMethod<[Principal], Array<Collection>>,
  'collections_created_by_caller' : ActorMethod<[], Array<Collection>>,
  'create_collection' : ActorMethod<
    [string, string, boolean, [] | [bigint], [] | [string], string],
    Result_1
  >,
  'creator_metadata' : ActorMethod<[Principal], [] | [Creator]>,
  'get_collection' : ActorMethod<[bigint], [] | [Collection]>,
  'get_emojis' : ActorMethod<[], Array<string>>,
  'get_nft_metadata' : ActorMethod<[bigint, bigint], [] | [NftMetadata]>,
  'is_admin' : ActorMethod<[Principal], boolean>,
  'mint_fee' : ActorMethod<[], bigint>,
  'mint_nft' : ActorMethod<
    [bigint, Principal, string, string, [] | [string]],
    Result_3
  >,
  'nfts' : ActorMethod<[bigint, [] | [bigint], [] | [bigint]], Array<Nft>>,
  'nfts_of_caller' : ActorMethod<[], Array<Nft>>,
  'nfts_of_user' : ActorMethod<[Principal], Array<Nft>>,
  'remove_admin' : ActorMethod<[Principal], Result>,
  'remove_emojis' : ActorMethod<[Array<string>], Result_1>,
  'set_collection_fee' : ActorMethod<[bigint], Result_4>,
  'set_creator_metadata' : ActorMethod<[string, string], Result_4>,
  'set_mint_fee' : ActorMethod<[bigint], Result_4>,
  'set_vibe_token' : ActorMethod<[Principal], Result_4>,
  'transfer_nft' : ActorMethod<[bigint, bigint, Principal], Result_4>,
  'update_collection_metadata' : ActorMethod<
    [bigint, string, string, [] | [string], [] | [string]],
    Result_4
  >,
  'vibe_token' : ActorMethod<[], [] | [Principal]>,
}
