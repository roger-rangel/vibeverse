/* eslint-disable eqeqeq */
import { createActor, canisterId } from '@/declarations/vibeverse_backend';
// @ts-ignore
import { idlFactory } from '@/declarations/vibeverse_backend/vibeverse_backend.did.js';
import { Principal } from '@dfinity/principal';
import { Actor, HttpAgent, Identity } from '@dfinity/agent';

class BackendActor {
  public async createCollection(
    identity: Identity,
    name: string,
    description: string,
    coverPhoto: string,
    maybeLimit: number | null,
  ): Promise<any> {
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
  ): Promise<any> {
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

  public async getNfts(identity: Identity): Promise<any> {
    console.log('Getting nfts');

    const actor = this.createActor(identity);

    return await actor.nfts_of_caller();
  }

  public async collectionsCreatedBy(rawPrincipal: any): Promise<any> {
    console.log('Getting collections created by ' + rawPrincipal);

    const actor = createActor(canisterId, idlFactory);
    const principal = Principal.from(rawPrincipal);

    return await actor.collections_created_by(principal);
  }

  public async transferNft(
    identity: any,
    collectionId: number,
    nftId: number,
    rawReceiver: number,
  ): Promise<any> {
    console.log(identity);

    const actor = this.createActor(identity);

    const receiver = Principal.from(rawReceiver);
    return await actor.transfer_nft(
      BigInt(collectionId),
      BigInt(nftId),
      receiver,
    );
  }

  private createActor(identity: Identity): any {
    const agent = new HttpAgent({ identity });

    const actor = Actor.createActor(idlFactory, {
      canisterId,
      agent,
    });

    return actor;
  }
}

export default BackendActor;
