
import { Navigation } from '@/components/learning';

export const metadata = {
  title: 'Dashboard',
  description: 'Discover AI generated art and films from the community.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Navigation>
      {children}
    </Navigation>
  );
}
