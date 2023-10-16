'use client';

import React from 'react';
import { Connect2ICProvider } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { defaultProviders } from '@connect2ic/core/providers';

import '@connect2ic/core/style.css';

export default function Providers({ children }: React.PropsWithChildren) {
  // const providers = [new InternetIdentity()];

  const providers = defaultProviders({
    providerUrl: '',
    whitelist: [],
    ledgerCanisterId: '',
  });
  const client = createClient({
    providers,
    globalProviderConfig: {
      dev: false,
    },
  });

  return <Connect2ICProvider client={client}>{children}</Connect2ICProvider>;
}
