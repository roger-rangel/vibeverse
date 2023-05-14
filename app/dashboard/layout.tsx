// Desc: Layout for dashboard
import Navigation from '../../components/navigation';

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
    <html className="h-full bg-white">   
      <body className="h-full"> 
        {/* eslint-disable-next-line react/no-children-prop */}
        <Navigation children={children} />      
      </body>
    </html>
      
  );
}