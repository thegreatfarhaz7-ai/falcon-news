
'use client';
import * as React from 'react';
import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Video, Globe } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Header = () => {
  const navLinks = CATEGORIES.slice(0, 6);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = (lang: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('lang', lang);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };


  return (
    <header className="border-b bg-background">
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

          <Button variant="default" size="sm" asChild>
            <Link href="#">Subscribe</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

function DropdownMenu(props: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="relative">
            {React.Children.map(props.children, (child) => {
                if (React.isValidElement(child) && child.type === DropdownMenuTrigger) {
                    return React.cloneElement(child, { onClick: () => setOpen(!open) } as any);
                }
                if (React.isValidElement(child) && child.type === DropdownMenuContent) {
                    return open ? child : null;
                }
                return child;
            })}
        </div>
    );
}

function DropdownMenuTrigger(props: { asChild?: boolean, children: React.ReactNode, onClick?: () => void }) {
    const { asChild, children, ...rest } = props;
    if (asChild) {
        return React.cloneElement(children as React.ReactElement, rest);
    }
    return <button {...rest}>{children}</button>;
}

function DropdownMenuContent(props: { align?: 'end' | 'start', children: React.ReactNode }) {
    const alignClass = props.align === 'end' ? 'right-0' : 'left-0';
    return (
        <div className={`absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${alignClass}`}>
            {React.Children.map(props.children, (child) => {
                 if (React.isValidElement(child) && child.type === DropdownMenuItem) {
                    return React.cloneElement(child, {  } as any);
                }
                return child;
            })}
        </div>
    );
}

function DropdownMenuItem(props: { onSelect?: () => void, children: React.ReactNode }) {
    return <div onClick={props.onSelect} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">{props.children}</div>
}


export default Header;
