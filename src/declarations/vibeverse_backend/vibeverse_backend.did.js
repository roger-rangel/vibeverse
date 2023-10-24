export const idlFactory = ({ IDL }) => {
  const Nft = IDL.Record({
    'id' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'asset_url' : IDL.Opt(IDL.Text),
  });
  const Collection = IDL.Record({
    'id' : IDL.Nat,
    'creator' : IDL.Principal,
    'image_url' : IDL.Opt(IDL.Text),
    'transferable' : IDL.Bool,
    'name' : IDL.Text,
    'minted' : IDL.Nat,
    'description' : IDL.Text,
    'limit' : IDL.Opt(IDL.Nat),
    'category' : IDL.Text,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const Creator = IDL.Record({ 'name' : IDL.Text, 'avatar' : IDL.Text });
  const Result_1 = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'Err' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  return IDL.Service({
    'admin' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'all_nfts' : IDL.Func(
        [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(Nft)],
        ['query'],
      ),
    'collection_count' : IDL.Func([], [IDL.Nat], ['query']),
    'collection_fee' : IDL.Func([], [IDL.Nat64], ['query']),
    'collections' : IDL.Func(
        [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(Collection)],
        ['query'],
      ),
    'collections_created_by' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(Collection)],
        ['query'],
      ),
    'collections_created_by_caller' : IDL.Func(
        [],
        [IDL.Vec(Collection)],
        ['query'],
      ),
    'create_collection' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Bool,
          IDL.Opt(IDL.Nat),
          IDL.Opt(IDL.Text),
          IDL.Text,
        ],
        [Result],
        [],
      ),
    'creator_metadata' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(Creator)],
        ['query'],
      ),
    'get_collection' : IDL.Func([IDL.Nat], [IDL.Opt(Collection)], ['query']),
    'mint_fee' : IDL.Func([], [IDL.Nat64], ['query']),
    'mint_nft' : IDL.Func(
        [IDL.Nat, IDL.Principal, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [Result_1],
        [],
      ),
    'nfts' : IDL.Func(
        [IDL.Nat, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(Nft)],
        ['query'],
      ),
    'nfts_of_caller' : IDL.Func([], [IDL.Vec(Nft)], ['query']),
    'nfts_of_user' : IDL.Func([IDL.Principal], [IDL.Vec(Nft)], ['query']),
    'set_admin' : IDL.Func([IDL.Principal], [Result_2], []),
    'set_collection_fee' : IDL.Func([IDL.Nat64], [Result_2], []),
    'set_creator_metadata' : IDL.Func([IDL.Text, IDL.Text], [Result_2], []),
    'set_mint_fee' : IDL.Func([IDL.Nat64], [Result_2], []),
    'set_vibe_token' : IDL.Func([IDL.Principal], [Result_2], []),
    'transfer_nft' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Principal],
        [Result_2],
        [],
      ),
    'update_collection_metadata' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result_2],
        [],
      ),
    'vibe_token' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
