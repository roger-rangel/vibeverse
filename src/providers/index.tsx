'use client';

import React from 'react';
import { createClient } from '@connect2ic/core';
import { Connect2ICProvider } from '@connect2ic/react';

// NOTE: DO NOT IMPORT FROM @connect2ic/core/providers
import { NFID } from '@connect2ic/core/providers/nfid';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import { InfinityWallet } from '@connect2ic/core/providers/infinity-wallet';

import '@connect2ic/core/style.css';

export default function Providers({ children }: React.PropsWithChildren) {
  const providers = [new NFID(), new InternetIdentity(), new InfinityWallet()];

  const client = createClient({
    providers,
    globalProviderConfig: {
      dev: false,
    },
  });

  return <Connect2ICProvider client={client}>{children}</Connect2ICProvider>;
}
