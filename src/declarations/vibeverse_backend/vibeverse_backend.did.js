export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const AddRemoveReactionResult = IDL.Variant({
    'Added' : IDL.Null,
    'Removed' : IDL.Null,
  });
  const Result_2 = IDL.Variant({
    'Ok' : AddRemoveReactionResult,
    'Err' : IDL.Text,
  });
  const AssetType = IDL.Variant({
    'Image' : IDL.Null,
    'Audio' : IDL.Null,
    'Other' : IDL.Null,
    'Video' : IDL.Null,
  });
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
  const Result_3 = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const CourseLevel = IDL.Variant({
    'Beginner' : IDL.Null,
    'Advanced' : IDL.Null,
    'Intermediate' : IDL.Null,
  });
  const Creator = IDL.Record({
    'a' : IDL.Text,
    'n' : IDL.Text,
    's' : IDL.Nat,
    'cc' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64)),
    'cr' : IDL.Nat,
    'lc' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64)),
    'rh' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat)),
  });
  const Badge = IDL.Record({ 'i' : IDL.Text, 'n' : IDL.Text });
  const Socials = IDL.Record({ 'h' : IDL.Text });
  const Community = IDL.Record({
    'c' : IDL.Principal,
    'd' : IDL.Text,
    'f' : IDL.Vec(IDL.Principal),
    'l' : IDL.Text,
    'm' : IDL.Vec(IDL.Principal),
    'n' : IDL.Text,
    's' : IDL.Text,
    'v' : IDL.Bool,
    'hi' : IDL.Text,
    'md' : IDL.Vec(IDL.Text),
    'so' : Socials,
  });
  const Course = IDL.Record({
    'a' : IDL.Principal,
    'c' : IDL.Text,
    'd' : IDL.Text,
    'l' : IDL.Text,
    's' : IDL.Text,
    't' : IDL.Text,
    'le' : IDL.Vec(IDL.Principal),
    'lv' : CourseLevel,
  });
  const NftMetadata = IDL.Record({
    'r' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Principal))),
    'at' : AssetType,
  });
  const Result_4 = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'Err' : IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  return IDL.Service({
    'add_admin' : IDL.Func([IDL.Principal], [Result], []),
    'add_emojis' : IDL.Func([IDL.Vec(IDL.Text)], [Result_1], []),
    'add_remove_reaction' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Text],
        [Result_2],
        [],
      ),
    'all_nfts' : IDL.Func(
        [IDL.Opt(AssetType), IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(Nft)],
        ['query'],
      ),
    'claim_rewards' : IDL.Func([], [Result], []),
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
        [Result_1],
        [],
      ),
    'create_community' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(IDL.Text),
          IDL.Text,
        ],
        [Result_3],
        [],
      ),
    'create_course' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, CourseLevel, IDL.Text, IDL.Text],
        [Result_3],
        [],
      ),
    'creator_metadata' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Tuple(Creator, Badge))],
        ['query'],
      ),
    'finish_course' : IDL.Func([IDL.Text], [Result], []),
    'follow_community' : IDL.Func([IDL.Text], [Result], []),
    'get_collection' : IDL.Func([IDL.Nat], [IDL.Opt(Collection)], ['query']),
    'get_communities' : IDL.Func(
        [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(Community)],
        ['query'],
      ),
    'get_communities_created_by' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(Community)],
        ['query'],
      ),
    'get_communities_followed' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(Community)],
        ['query'],
      ),
    'get_community' : IDL.Func([IDL.Text], [IDL.Opt(Community)], ['query']),
    'get_course' : IDL.Func([IDL.Text], [IDL.Opt(Course)], ['query']),
    'get_courses' : IDL.Func(
        [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(Course)],
        ['query'],
      ),
    'get_emojis' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'get_nft_metadata' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Opt(NftMetadata)],
        ['query'],
      ),
    'is_admin' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'is_community_follower' : IDL.Func(
        [IDL.Text, IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'mint_fee' : IDL.Func([], [IDL.Nat64], ['query']),
    'mint_nft' : IDL.Func(
        [
          IDL.Nat,
          IDL.Principal,
          IDL.Text,
          IDL.Text,
          IDL.Opt(IDL.Text),
          IDL.Opt(AssetType),
        ],
        [Result_4],
        [],
      ),
    'nfts' : IDL.Func(
        [IDL.Nat, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(Nft)],
        ['query'],
      ),
    'nfts_of_caller' : IDL.Func([], [IDL.Vec(Nft)], ['query']),
    'nfts_of_user' : IDL.Func([IDL.Principal], [IDL.Vec(Nft)], ['query']),
    'remove_admin' : IDL.Func([IDL.Principal], [Result], []),
    'remove_emojis' : IDL.Func([IDL.Vec(IDL.Text)], [Result_1], []),
    'set_collection_fee' : IDL.Func([IDL.Nat64], [Result_5], []),
    'set_creator_metadata' : IDL.Func([IDL.Text, IDL.Text], [Result_5], []),
    'set_mint_fee' : IDL.Func([IDL.Nat64], [Result_5], []),
    'set_vibe_token' : IDL.Func([IDL.Principal], [Result_5], []),
    'top_n_creators' : IDL.Func(
        [IDL.Nat8],
        [IDL.Vec(IDL.Tuple(IDL.Principal, Creator, Badge))],
        ['query'],
      ),
    'total_communities' : IDL.Func([], [IDL.Nat64], ['query']),
    'total_courses' : IDL.Func([], [IDL.Nat64], ['query']),
    'transfer_nft' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Principal],
        [Result_5],
        [],
      ),
    'unfollow_community' : IDL.Func([IDL.Text], [Result_5], []),
    'update_collection_metadata' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result_5],
        [],
      ),
    'vibe_token' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
