import { Creator as RawCreator } from '@/declarations/vibeverse_backend/vibeverse_backend.did';
import { Principal } from '@dfinity/principal';

export type UserId = Principal;

export interface Creator {
  name: string;
  avatar: string;
}

export const asCreator = (c: RawCreator): Creator => {
  return {
    name: c.n,
    avatar: c.a,
  };
};
