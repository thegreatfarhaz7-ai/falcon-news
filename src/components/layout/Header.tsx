'use client';
import * as React from 'react';
import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Video, Globe } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  const navLinks = [
    { name: 'Technology', href: '/#technology' },
    { name: 'Business', href: '/#business' },
    { name: 'Sports', href: '/#sports' },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mobileNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/articles', label: 'All Articles' },
    { href: '/editorial', label: 'Editorial' },
    { href: '/videos', label: 'Videos' },
    { href: '/contact', label: 'Contact' },
    ...navLinks.map(cat => ({ href: cat.href, label: cat.name }))
  ]

  const handleLanguageChange = (lang: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('lang', lang);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };


  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 lg:flex-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader className="p-4">
                    <SheetTitle><Logo /></SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                      <nav className="mt-8 flex flex-col gap-4">
                          {mobileNavLinks.map(link => (
                          <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary">
                              {link.label}
                          </Link>
                          ))}
                      </nav>
                  </div>
              </SheetContent>
            </Sheet>
            <Logo className="text-2xl font-bold font-logo tracking-normal" />
        </div>
        
        <div className="hidden flex-1 justify-center lg:flex">
            <nav className="flex items-center gap-6">
            {navLinks.map(link => (
                <Link key={link.name} href={link.href} className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary">
                {link.name}
                </Link>
            ))}
             <Link href="/videos" className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                <Video className="h-4 w-4" />
                Videos
              </Link>
            </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => handleLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleLanguageChange('hi')}>
                Hindi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
};

export default Header;
