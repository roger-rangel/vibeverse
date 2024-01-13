import {
  Community as RawCommunity,
  Socials as RawSocials,
} from '@/declarations/vibeverse_backend/vibeverse_backend.did';

import { UserId } from './creator';

export type CommunityId = string;

export interface Socials {
  home: string;
}

export interface Community {
  slug: string;
  creator: UserId;
  name: string;
  description: string;
  logo: string;
  heroImage: string;
  metadata: string[];
  socials: Socials;
  verified: boolean;
  members: UserId[];
  followers: UserId[];
}

export const asSocials = (raw: RawSocials): Socials => {
  return {
    home: raw.h,
  };
};

export const asCommunity = (raw: RawCommunity): Community => {
  return {
    slug: raw.s,
    creator: raw.c,
    name: raw.n,
    description: raw.d,
    logo: raw.l,
    heroImage: raw.hi,
    metadata: raw.md,
    socials: asSocials(raw.so),
    verified: raw.v,
    members: raw.m,
    followers: raw.f,
  };
};
