'use client';

// Desc: Layout for dashboard
import { Navigation } from '@/components/dashboard/home';
import { useEffect, useState } from 'react';

/*export const metadata = {
  title: 'Dashboard',
  description: 'Discover AI generated art and films from the community.',
};*/

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log('');
  }, []);

  return (
    <html className="bg-black">
      <body className="h-full">
        <Dynamic>
          {/* eslint-disable-next-line react/no-children-prop */}
          <Navigation children={children} />
        </Dynamic>
      </body>
    </html>
  );
}
