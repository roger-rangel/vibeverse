/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActorSubclass } from '@dfinity/agent';
import { useConnect } from '@connect2ic/react';

import { anonymousActor } from '@/config';
import { canisterId, idlFactory } from '@/declarations/vibeverse_backend';
import { _SERVICE } from '@/declarations/vibeverse_backend/vibeverse_backend.did';

interface ActorProps {
  actor?: ActorSubclass<_SERVICE>;
}

const ActorContext = createContext<ActorProps>({});

export const ActorProvider = ({ children }: React.PropsWithChildren) => {
  const { activeProvider } = useConnect();
  const [actor, setActor] = useState<ActorSubclass<_SERVICE> | undefined>(
    undefined,
  );

  useEffect(() => {
    (async () => {
      if (!activeProvider) {
        // TODO Check if anonymous actor is required

        setActor(anonymousActor);
        return;
      }
      // @ts-ignore
      const actor = await activeProvider.createActor(canisterId, idlFactory);

      const maybeActor = actor.unwrapOr(undefined);

      // @ts-ignore
      setActor(maybeActor);
    })();
  }, [activeProvider]);

  return (
    <ActorContext.Provider value={{ actor }}>{children}</ActorContext.Provider>
  );
};

export const useActor = () => useContext(ActorContext);
