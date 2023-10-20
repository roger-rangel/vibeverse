/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActorSubclass } from '@dfinity/agent';
import { useConnect } from '@connect2ic/react';

// import { DFX_NETWORK } from '@/config';
import {
  canisterId,
  // createActor,
  idlFactory,
} from '@/declarations/vibeverse_backend';
import {
  canisterId as assetCanisterId,
  // createActor,
  idlFactory as assetIdlFactory,
} from '@/declarations/vibeverse_assets';
import { _SERVICE } from '@/declarations/vibeverse_backend/vibeverse_backend.did';
import { _SERVICE as _ASSET_SERVICE } from '@/declarations/vibeverse_assets/vibeverse_assets.did';

interface ActorProps {
  actor?: ActorSubclass<_SERVICE>;
  assetActor?: ActorSubclass<_ASSET_SERVICE>;
}

const ActorContext = createContext<ActorProps>({});

export const ActorProvider = ({ children }: React.PropsWithChildren) => {
  const { activeProvider } = useConnect();
  const [actor, setActor] = useState<ActorSubclass<_SERVICE> | undefined>(
    undefined,
  );
  const [assetActor, setAssetActor] = useState<
    ActorSubclass<_ASSET_SERVICE> | undefined
  >(undefined);
  useEffect(() => {
    (async () => {
      if (!activeProvider) {
        // TODO Check if anonymous actor is required
        //   const host =
        //     DFX_NETWORK === 'local' ? 'http://localhost:4943' : 'https://ic0.app';
        //   const actor = createActor(canisterId, {
        //     agentOptions: {
        //       host,
        //     },
        //   });
        //   setActor(actor);
        return;
      }
      // @ts-ignore
      const actor = await activeProvider.createActor(canisterId, idlFactory);
      const actor2 = await activeProvider.createActor(
        assetCanisterId,
        // @ts-ignore
        assetIdlFactory,
      );

      const maybeActor = actor.unwrapOr(undefined);
      const maybeActor2 = actor2.unwrapOr(undefined);
      // @ts-ignore
      setActor(maybeActor);
      // @ts-ignore
      setAssetActor(maybeActor2);
    })();
  }, [activeProvider]);

  return (
    <ActorContext.Provider value={{ actor, assetActor }}>
      {children}
    </ActorContext.Provider>
  );
};

export const useActor = () => useContext(ActorContext);
