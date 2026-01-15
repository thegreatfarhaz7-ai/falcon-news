import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNavBar from '@/components/layout/BottomNavBar';
import CategoryNav from '@/components/layout/CategoryNav';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <CategoryNav />
      <main className="flex-1 pb-16 pt-16 md:pt-0 md:pb-0">{children}</main>
      <Footer />
      <BottomNavBar />
    </div>
  );
}
