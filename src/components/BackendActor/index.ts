import { Principal } from '@dfinity/principal';
import { ActorSubclass, Identity } from '@dfinity/agent';

import { createActor, canisterId } from '@/declarations/vibeverse_backend';
import {
  Collection,
  Nft,
  _SERVICE,
} from '@/declarations/vibeverse_backend/vibeverse_backend.did';

class BackendActor {
  public async createCollection(
    identity: Identity,
    name: string,
    description: string,
    coverPhoto: string,
    maybeLimit: number | null,
  ): Promise<string> {
    console.log(identity);

    const actor = this.createActor(identity);

    const isTranferable = true; // TODO have this passed from the UI.

    let limit: number;
    if (!maybeLimit) {
      limit = 0;
    } else limit = maybeLimit;

    return await actor.create_collection(
      name,
      description,
      isTranferable,
      [BigInt(limit)],
      [coverPhoto],
    );
  }

  public async mintNft(
    identity: Identity,
    collectionId: number,
    rawReceiver: string,
    name: string,
    description: string,
    assetUrl: string,
  ): Promise<string> {
    console.log(identity);

    const actor = this.createActor(identity);

    const receiver = Principal.from(rawReceiver);
    return await actor.mint_nft(
      BigInt(collectionId),
      receiver,
      name,
      description,
      [assetUrl],
    );
  }

  public async getNfts(identity: Identity): Promise<Nft[]> {
    console.log('Getting nfts');

    const actor = this.createActor(identity);

    return await actor.nfts_of_caller();
  }

  public async collectionsCreatedBy(rawPrincipal: any): Promise<Collection[]> {
    console.log('Getting collections created by ' + rawPrincipal);

    const actor = this.createActor();
    const principal = Principal.from(rawPrincipal);

    return await actor.collections_created_by(principal);
  }

  public async transferNft(
    identity: Identity,
    collectionId: number,
    nftId: number,
    rawReceiver: number,
  ): Promise<string> {
    console.log(identity);

    const actor = this.createActor(identity);

    const receiver = Principal.from(rawReceiver);
    return await actor.transfer_nft(
      BigInt(collectionId),
      BigInt(nftId),
      receiver,
    );
  }

  private createActor(identity?: Identity): ActorSubclass<_SERVICE> {
    const host =
      process.env.DFX_NETWORK === 'local'
        ? 'http://localhost:4943'
        : 'https://ic0.app';

    const actor = createActor(canisterId, {
      agentOptions: {
        host,
        identity,
      },
    });

    return actor;
  }
}

export default BackendActor;
