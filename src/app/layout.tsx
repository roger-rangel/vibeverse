'use client';

import './globals.css';
import { useEffect, useState } from 'react';

const Dynamic = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-black">
      <body className="h-full">
        <Dynamic>{children}</Dynamic>
      </body>
    </html>
  );
}
