export const idlFactory = ({ IDL }) => {
  const Nft = IDL.Record({
    id: IDL.Tuple(IDL.Nat, IDL.Nat),
    name: IDL.Text,
    description: IDL.Text,
    asset_url: IDL.Opt(IDL.Text),
  });
  const Collection = IDL.Record({
    id: IDL.Nat,
    creator: IDL.Principal,
    image_url: IDL.Opt(IDL.Text),
    name: IDL.Text,
    minted: IDL.Nat,
    description: IDL.Text,
    limit: IDL.Opt(IDL.Nat),
  });
  const Creator = IDL.Record({
    principal: IDL.Principal,
    name: IDL.Text,
  });
  return IDL.Service({
    admin: IDL.Func([], [IDL.Opt(IDL.Principal)], []),
    all_nfts: IDL.Func([], [IDL.Vec(Nft)], []),
    collection_count: IDL.Func([], [IDL.Nat], []),
    collection_fee: IDL.Func([], [IDL.Nat64], []),
    collections_created_by: IDL.Func(
      [IDL.Principal],
      [IDL.Vec(Collection)],
      [],
    ),
    collections_created_by_caller: IDL.Func([], [IDL.Vec(Collection)], []),
    create_collection: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Bool, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Text)],
      [IDL.Text],
      [],
    ),
    creator_metadata: IDL.Func([], [IDL.Opt(Creator)], []),
    get_collection: IDL.Func([IDL.Nat], [IDL.Opt(Collection)], []),
    mint_fee: IDL.Func([], [IDL.Nat64], []),
    mint_nft: IDL.Func(
      [IDL.Nat, IDL.Principal, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
      [IDL.Text],
      [],
    ),
    nfts_of_caller: IDL.Func([], [IDL.Vec(Nft)], []),
    nfts_of_user: IDL.Func([IDL.Principal], [IDL.Vec(Nft)], []),
    set_admin: IDL.Func(
      [IDL.Principal],
      [IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })],
      [],
    ),
    set_collection_fee: IDL.Func(
      [IDL.Nat64],
      [IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })],
      [],
    ),
    set_creator_metadata: IDL.Func([IDL.Text], [IDL.Text], []),
    set_mint_fee: IDL.Func(
      [IDL.Nat64],
      [IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })],
      [],
    ),
    set_vibe_token: IDL.Func(
      [IDL.Principal],
      [IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })],
      [],
    ),
    transfer_nft: IDL.Func([IDL.Nat, IDL.Nat, IDL.Principal], [IDL.Text], []),
    update_collection_metadata: IDL.Func(
      [IDL.Nat, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
      [IDL.Text],
      [],
    ),
    vibe_token: IDL.Func([], [IDL.Opt(IDL.Principal)], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
