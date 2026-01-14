import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { CATEGORIES } from '@/lib/constants';
import { Globe, Share2, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerSections = CATEGORIES.slice(0, 4);

  return (
    <footer className="bg-[#111111] text-gray-300 font-sans">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          
          <div className="col-span-2 lg:col-span-2 pr-8">
            <Logo className="text-white text-4xl" />
            <p className="mt-4 text-sm text-gray-400">
              Independent, investigative journalism for a globally minded audience.
              Founded in 2024, reimagined for today.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">Sections</h3>
            <ul className="mt-4 space-y-3">
              {footerSections.map(category => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase().replace(' ','-')}`} className="text-sm text-gray-400 hover:text-white hover:underline">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">About</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white hover:underline">Our Mission</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white hover:underline">Ethics Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white hover:underline">Careers</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-400 hover:text-white hover:underline">Dashboard</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">Support</h3>
             <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white hover:underline">Customer Service</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white hover:underline">Subscription FAQ</Link></li>
                <li>
                    <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white rounded-none mt-2">
                        Gift a Subscription
                    </Button>
                </li>
             </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Falcon News. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
