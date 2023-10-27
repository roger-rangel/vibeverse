import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Collection {
  id: bigint;
  creator: Principal;
  image_url: [] | [string];
  transferable: boolean;
  name: string;
  minted: bigint;
  description: string;
  limit: [] | [bigint];
  category: string;
}
export interface Creator {
  name: string;
  avatar: string;
}
export interface Nft {
  id: [bigint, bigint];
  name: string;
  description: string;
  asset_url: [] | [string];
}
export type Result = { Ok: bigint } | { Err: string };
export type Result_1 = { Ok: [bigint, bigint] } | { Err: string };
export type Result_2 = { Ok: null } | { Err: string };
export interface _SERVICE {
  admin: ActorMethod<[], [] | [Principal]>;
  all_nfts: ActorMethod<[[] | [bigint], [] | [bigint]], Array<Nft>>;
  collection_count: ActorMethod<[], bigint>;
  collection_fee: ActorMethod<[], bigint>;
  collections: ActorMethod<[[] | [bigint], [] | [bigint]], Array<Collection>>;
  collections_created_by: ActorMethod<[Principal], Array<Collection>>;
  collections_created_by_caller: ActorMethod<[], Array<Collection>>;
  create_collection: ActorMethod<
    [string, string, boolean, [] | [bigint], [] | [string], string],
    Result
  >;
  creator_metadata: ActorMethod<[Principal], [] | [Creator]>;
  get_collection: ActorMethod<[bigint], [] | [Collection]>;
  mint_fee: ActorMethod<[], bigint>;
  mint_nft: ActorMethod<
    [bigint, Principal, string, string, [] | [string]],
    Result_1
  >;
  nfts: ActorMethod<[bigint, [] | [bigint], [] | [bigint]], Array<Nft>>;
  nfts_of_caller: ActorMethod<[], Array<Nft>>;
  nfts_of_user: ActorMethod<[Principal], Array<Nft>>;
  set_admin: ActorMethod<[Principal], Result_2>;
  set_collection_fee: ActorMethod<[bigint], Result_2>;
  set_creator_metadata: ActorMethod<[string, string], Result_2>;
  set_mint_fee: ActorMethod<[bigint], Result_2>;
  set_vibe_token: ActorMethod<[Principal], Result_2>;
  transfer_nft: ActorMethod<[bigint, bigint, Principal], Result_2>;
  update_collection_metadata: ActorMethod<
    [bigint, string, string, [] | [string], [] | [string]],
    Result_2
  >;
  vibe_token: ActorMethod<[], [] | [Principal]>;
}
