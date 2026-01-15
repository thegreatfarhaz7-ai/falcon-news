import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const navLinks = CATEGORIES.slice(0, 6);

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
              <SheetContent side="left">
                  <SheetHeader className="p-4">
                    <SheetTitle><Logo /></SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                      <nav className="mt-8 flex flex-col gap-4">
                          {CATEGORIES.map(link => (
                          <Link key={link} href={`/category/${link.toLowerCase().replace(' ','-')}`} className="text-lg font-medium hover:text-primary">
                              {link}
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
                <Link key={link} href={`/category/${link.toLowerCase().replace(' ','-')}`} className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary">
                {link}
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
          <Button variant="default" size="sm" asChild>
            <Link href="#">Subscribe</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
