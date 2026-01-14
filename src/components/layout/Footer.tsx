import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const Footer = () => {
  const isAuthenticated = false; // This will be dynamic later

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Your source for breaking news, analysis, and everything in between.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-headline font-bold">Categories</h3>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.slice(0, 5).map(category => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase()}`} className="text-sm hover:text-primary hover:underline">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-headline font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary hover:underline">Contact</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary hover:underline">Careers</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h3 className="font-headline font-bold">Account</h3>
             <ul className="mt-4 space-y-2">
                {!isAuthenticated ? (
                    <li>
                        <Button asChild variant="outline">
                            <Link href="/login">
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </Link>
                        </Button>
                    </li>
                ) : (
                    <li>
                        <Link href="/dashboard" className="text-sm hover:text-primary hover:underline">Dashboard</Link>
                    </li>
                )}
                <li><Link href="#" className="text-sm hover:text-primary hover:underline">Subscribe</Link></li>
             </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Falcon News. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-primary hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
