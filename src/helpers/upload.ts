import { AssetType } from '@/types';
import filetype from 'magic-bytes.js';
import { NFTStorage } from 'nft.storage';

const NFT_STORAGE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk2MTc2M2FGQkQ0QTJEZEVlNDBiZUQ3N2QxNjA4YWU5N2Q0YTE2ZEUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNDQxNTg2NjE3OSwibmFtZSI6InRlc3QifQ.h6z64yj7nLRWtD5s5dHlCNTK0BI8gCxe0e-mQ8RYRMs';
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export const uploadFile = async (file: File): Promise<string> => {
  const cid = await client.storeBlob(file);

  const path = `https://nftstorage.link/ipfs/${cid}`;

  return path;
};

export const getFileType = async (path: string): Promise<AssetType> => {
  try {
    const response = await fetch(path);

    if (response.body === null) {
      throw Error('File not found');
    }

    const bytes = await response.body.getReader().read();
    if (bytes.value) {
      const fileTypes = filetype(bytes.value);

      if (fileTypes.some((t) => t.mime?.includes('video'))) {
        return AssetType.Video;
      }

      if (fileTypes.some((t) => t.mime?.includes('audio'))) {
        return AssetType.Audio;
      }

      if (fileTypes.some((t) => t.mime?.includes('image'))) {
        return AssetType.Image;
      }
    }
    return AssetType.Other;
  } catch (error) {
    return AssetType.Other;
  }
};
