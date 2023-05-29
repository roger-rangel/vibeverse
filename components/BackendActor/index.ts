/* eslint-disable eqeqeq */
import { createActor, canisterId } from '@/declarations/vibeverse_backend';
// @ts-ignore
import { idlFactory } from '@/declarations/vibeverse_backend/vibeverse_backend.did.js';

class BackendActor {
  public async createCollection(
    name: string,
    description: string,
    coverPhoto: string,
    maybeLimit: number | null,
  ): Promise<any> {
    const actor = createActor(canisterId, idlFactory);
    /*
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
    */
  }
}

export default BackendActor;
