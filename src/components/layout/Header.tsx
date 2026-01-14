import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Video } from 'lucide-react';

const Header = () => {
  const navLinks = CATEGORIES.slice(0, 6);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
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
                            <Link key={link} href={`/category/${link.toLowerCase()}`} className="text-lg font-medium hover:text-primary">
                                {link}
                            </Link>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden lg:block">
                <Logo />
            </div>
        </div>
        
        <div className="flex-1 flex justify-center">
            <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map(link => (
                <Link key={link} href={`/category/${link.toLowerCase()}`} className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary">
                {link}
                </Link>
            ))}
             <Link href="/videos" className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                <Video className="h-4 w-4" />
                Videos
              </Link>
            </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
