/* eslint-disable eqeqeq */
import { createActor, canisterId } from '@/declarations/vibeverse_backend';
// @ts-ignore
import { idlFactory } from '@/declarations/vibeverse_backend/vibeverse_backend.did.js';
import { Principal } from '@dfinity/principal';

class BackendActor {
  public async createCollection(
    customProvider: any,
    name: string,
    description: string,
    coverPhoto: string,
    maybeLimit: number | null,
  ): Promise<any> {
    let actor;
    console.log(customProvider);
    if (!customProvider) {
      actor = createActor(canisterId, idlFactory);
    } else {
      actor = createActor(canisterId, idlFactory);
      //actor = (await customProvider.createActor(canisterId, idlFactory)).value;
    }

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
    customProvider: any,
    collectionId: number,
    rawReceiver: string,
    name: string,
    description: string,
    assetUrl: string,
  ): Promise<any> {
    let actor;
    console.log(customProvider);
    if (!customProvider) {
      actor = createActor(canisterId, idlFactory);
    } else {
      actor = createActor(canisterId, idlFactory);
      //actor = (await customProvider.createActor(canisterId, idlFactory)).value;
    }

    const receiver = Principal.from(rawReceiver);
    return await actor.mint_nft(
      BigInt(collectionId),
      receiver,
      name,
      description,
      [assetUrl],
    );
  }

  public async getNfts(rawPrincipal: any): Promise<any> {
    console.log('Getting nfts of a user');
    console.log(rawPrincipal);

    const actor = createActor(canisterId, idlFactory);
    const principal = Principal.from(rawPrincipal);

    return await actor.nfts_of_user(principal);
  }
}

export default BackendActor;
