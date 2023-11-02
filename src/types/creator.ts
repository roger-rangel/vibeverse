import { Creator as RawCreator } from '@/declarations/vibeverse_backend/vibeverse_backend.did';
export interface Creator {
  name: string;
  avatar: string;
}

export const asCreator = (c: RawCreator): Creator => {
  return c;
};
