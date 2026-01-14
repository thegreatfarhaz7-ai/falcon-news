import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { CATEGORIES } from '@/lib/constants';

const Footer = () => {

  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Thoughtful analysis and diverse viewpoints on the stories shaping our world.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-headline font-bold">Categories</h3>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.slice(0, 5).map(category => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase().replace(' ','-')}`} className="text-sm hover:text-primary hover:underline">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-headline font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary hover:underline">Contact</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary hover:underline">Ethics Policy</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary hover:underline">Submission Guidelines</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h3 className="font-headline font-bold">Account</h3>
             <ul className="mt-4 space-y-2">
                <li>
                    <Link href="/dashboard" className="text-sm hover:text-primary hover:underline">Dashboard</Link>
                </li>
                <li><Link href="#" className="text-sm hover:text-primary hover:underline">Subscribe</Link></li>
             </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Falcon News. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
