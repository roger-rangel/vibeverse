import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Collection {
  id: bigint;
  creator: Principal;
  image_url: [] | [string];
  name: string;
  minted: bigint;
  description: string;
  limit: [] | [bigint];
}
export interface Creator {
  principal: Principal;
  name: string;
}
export interface Nft {
  id: [bigint, bigint];
  name: string;
  description: string;
  asset_url: [] | [string];
}
export interface _SERVICE {
  admin: ActorMethod<[], [] | [Principal]>;
  all_nfts: ActorMethod<[], Array<Nft>>;
  collection_count: ActorMethod<[], bigint>;
  collection_fee: ActorMethod<[], bigint>;
  collections_created_by: ActorMethod<[Principal], Array<Collection>>;
  collections_created_by_caller: ActorMethod<[], Array<Collection>>;
  create_collection: ActorMethod<
    [string, string, boolean, [] | [bigint], [] | [string]],
    string
  >;
  creator_metadata: ActorMethod<[], [] | [Creator]>;
  get_collection: ActorMethod<[bigint], [] | [Collection]>;
  mint_fee: ActorMethod<[], bigint>;
  mint_nft: ActorMethod<
    [bigint, Principal, string, string, [] | [string]],
    string
  >;
  nfts_of_caller: ActorMethod<[], Array<Nft>>;
  nfts_of_user: ActorMethod<[Principal], Array<Nft>>;
  set_admin: ActorMethod<[Principal], { Ok: null } | { Err: string }>;
  set_collection_fee: ActorMethod<[bigint], { Ok: null } | { Err: string }>;
  set_creator_metadata: ActorMethod<[string], string>;
  set_mint_fee: ActorMethod<[bigint], { Ok: null } | { Err: string }>;
  set_vibe_token: ActorMethod<[Principal], { Ok: null } | { Err: string }>;
  transfer_nft: ActorMethod<[bigint, bigint, Principal], string>;
  update_collection_metadata: ActorMethod<
    [bigint, string, string, [] | [string]],
    string
  >;
  vibe_token: ActorMethod<[], [] | [Principal]>;
}
