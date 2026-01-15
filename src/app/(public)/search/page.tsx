import { Suspense } from 'react';
import SearchClient from './SearchClient';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-4xl font-bold mb-8">Search News</h1>
      <Suspense fallback={<div className="text-center py-16 text-muted-foreground">Loading search...</div>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
