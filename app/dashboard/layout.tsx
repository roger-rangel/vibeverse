// Desc: Layout for dashboard
import { Navigation } from '@/components/dashboard/home';

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
    <html className="bg-black">
      <body className="h-full">
        {/* eslint-disable-next-line react/no-children-prop */}
        <Navigation children={children} />
      </body>
    </html>
  );
}
