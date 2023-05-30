export const idlFactory = ({ IDL }) => {
  const Nft = IDL.Record({
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
    collection_count: IDL.Func([], [IDL.Nat], []),
    collections_created_by: IDL.Func([IDL.Principal], [IDL.Vec(Nft)], []),
    collections_created_by_caller: IDL.Func([], [IDL.Vec(Nft)], []),
    create_collection: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Bool, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Text)],
      [IDL.Text],
      [],
    ),
    creator_metadata: IDL.Func([], [IDL.Opt(Creator)], []),
    get_nft: IDL.Func([IDL.Nat], [IDL.Opt(Nft)], []),
    mint_nft: IDL.Func([IDL.Nat, IDL.Principal], [IDL.Text], []),
    nfts_of_user: IDL.Func([IDL.Principal], [IDL.Vec(Nft)], []),
    set_creator_metadata: IDL.Func([IDL.Text], [IDL.Text], []),
    transfer_nft: IDL.Func([IDL.Nat, IDL.Principal], [IDL.Text], []),
    update_collection_metadata: IDL.Func(
      [IDL.Nat, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
      [IDL.Text],
      [],
    ),
  });
};
export const init = ({ IDL }) => {
  return [];
};
