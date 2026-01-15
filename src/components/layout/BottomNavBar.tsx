'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, TrendingUp, Video } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/shared/Logo';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/category/trending', label: 'Trending', icon: TrendingUp },
  { href: '/videos', label: 'Videos', icon: Video },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
      <div className="grid h-16 grid-cols-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group inline-flex flex-col items-center justify-center p-2 text-center",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        <Sheet>
            <SheetTrigger asChild>
                <button className="group inline-flex flex-col items-center justify-center p-2 text-center text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <LayoutGrid className="h-6 w-6" />
                    <span className="text-xs">Menu</span>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader className="p-4 text-left">
                <SheetTitle><Logo /></SheetTitle>
                </SheetHeader>
                <div className="p-4 overflow-y-auto">
                    <nav className="grid grid-cols-2 gap-4">
                        {CATEGORIES.map(link => (
                        <Link key={link} href={`/category/${link.toLowerCase().replace(' ','-')}`} className="text-lg font-medium hover:text-primary p-2 rounded-md hover:bg-accent">
                            {link}
                        </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
