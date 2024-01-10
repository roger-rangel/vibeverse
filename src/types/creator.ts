import { Principal } from '@dfinity/principal';

import {
  Badge as RawBadge,
  Creator as RawCreator,
} from '@/declarations/vibeverse_backend/vibeverse_backend.did';

import { Badge, asBadge } from './course';

export type UserId = Principal;

export interface Creator {
  name: string;
  avatar: string;
  score: bigint;
  badge: Badge;
}

export const asCreator = (c: RawCreator, b: RawBadge): Creator => {
  return {
    name: c.n,
    avatar: c.a,
    score: c.s,
    badge: asBadge(b),
  };
};
