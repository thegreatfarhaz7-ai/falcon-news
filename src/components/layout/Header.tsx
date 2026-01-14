import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, LogIn, Video } from 'lucide-react';

const Header = () => {
  const navLinks = CATEGORIES.slice(0, 6);
  const isAuthenticated = false; // This will be dynamic later

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
                            <Link key={link} href={link === 'Videos' ? '/videos' : '#'} className="text-lg font-medium hover:text-primary">
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
                <Link key={link} href="#" className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary">
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
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          {!isAuthenticated && (
            <Button asChild>
              <Link href="/dashboard">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
