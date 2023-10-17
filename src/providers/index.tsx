'use client';

import React from 'react';
import { createClient } from '@connect2ic/core';
import { Connect2ICProvider } from '@connect2ic/react';

// NOTE: DO NOT IMPORT FROM @connect2ic/core/providers
import { NFID } from '@connect2ic/core/providers/nfid';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import { InfinityWallet } from '@connect2ic/core/providers/infinity-wallet';

import '@connect2ic/core/style.css';

import { DFX_NETWORK, II_CANISTER_ID } from '@/config';

import { ActorProvider } from './ActorProvider';
import { QueryProvider } from './QueryProvider';

export default function Providers({ children }: React.PropsWithChildren) {
  const providers = [
    new NFID({ appName: 'Vibeverse' }),
    new InternetIdentity({
      providerUrl:
        DFX_NETWORK === 'local'
          ? `http://127.0.0.1:4943/?canisterId=${II_CANISTER_ID}`
          : 'https://identity.ic0.app',
    }),
    new InfinityWallet(),
  ];

  const client = createClient({
    providers,
    globalProviderConfig: {
      dev: true,
      host:
        DFX_NETWORK === 'local'
          ? `http://127.0.0.1:4943/?canisterId=${II_CANISTER_ID}`
          : 'https://identity.ic0.app',
    },
  });

  return (
    <Connect2ICProvider client={client}>
      <ActorProvider>
        <QueryProvider>{children}</QueryProvider>
      </ActorProvider>
    </Connect2ICProvider>
  );
}
