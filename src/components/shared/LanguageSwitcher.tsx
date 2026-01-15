'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';

  const handleLanguageChange = (newLang: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('lang', newLang);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-1">
          {lang === 'hi' ? 'हिंदी' : 'English'}
          <ChevronDown className="h-4 w-4" />
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
  );
}
