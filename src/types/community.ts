import { Community as RawCommunity } from '@/declarations/vibeverse_backend/vibeverse_backend.did';

import { UserId } from './creator';

export type CommunityId = string;

export interface Community {
  slug: string;
  creator: UserId;
  name: string;
  description: string;
  logo: string;
  verified: boolean;
  members: UserId[];
  followers: UserId[];
}

export const asCommunity = (raw: RawCommunity): Community => {
  return {
    slug: raw.s,
    creator: raw.c,
    name: raw.n,
    description: raw.d,
    logo: raw.l,
    verified: raw.v,
    members: raw.m,
    followers: raw.f,
  };
};
