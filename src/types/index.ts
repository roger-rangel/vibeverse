export type BigNumberish = string | number | bigint;

export interface PaginationParams {
  page: number;
  limit: number;
}

export * from './nft';
export * from './collection';
