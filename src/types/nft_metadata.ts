import { Principal } from '@dfinity/principal';
import { NftMetadata as RawNftMetadata } from '@/declarations/vibeverse_backend/vibeverse_backend.did';

export interface Reaction {
  emoji: string;
  reactors: Principal[];
}

export type Reactions = Reaction[];

export interface NftMetadata {
  reactions: Reactions;
}

export const asNftMetadata = (m: RawNftMetadata): NftMetadata => {
  const { r, ...rest } = m;
  return {
    reactions: r.map((r) => ({ emoji: r[0], reactors: r[1] })),
    ...rest,
  };
};
