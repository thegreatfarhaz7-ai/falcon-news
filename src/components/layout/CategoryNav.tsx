import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function CategoryNav() {
  const displayCategories = CATEGORIES.filter(
    (c) => !['Editorial', 'Videos', 'Fact Check'].includes(c)
  );

  return (
    <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <nav className="flex w-max space-x-6 py-3">
            {displayCategories.map((category) => (
              <Link
                key={category}
                href={`/tag/${category.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                {category}
              </Link>
            ))}
          </nav>
          <ScrollBar orientation="horizontal" className="h-0" />
        </ScrollArea>
      </div>
    </div>
  );
}
