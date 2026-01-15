'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { articles } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const filteredArticles = searchTerm
    ? articles.filter(
        article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(query);
    // Update URL without reloading page
    window.history.pushState(null, '', `?q=${encodeURIComponent(query)}`);
  };

  const getArticleLink = (article: (typeof articles)[0]) => {
    return article.category === 'Videos' ? `/videos/${article.slug}` : `/article/${article.slug}`;
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex w-full max-w-2xl mx-auto mb-12">
        <Input
          type="search"
          placeholder="Search for articles, authors, or topics..."
          className="rounded-r-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" className="rounded-l-none">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </form>

      {searchTerm && (
        <div className="border-b-2 pb-4 mb-8">
            <h2 className="font-headline text-3xl font-bold">
                {filteredArticles.length} results for "{searchTerm}"
            </h2>
        </div>
      )}

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map(article => {
            const articleImage = PlaceHolderImages.find(img => img.id === article.imageId);
            return (
                <Card key={article.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                {articleImage && (
                  <Link href={getArticleLink(article)} className="relative h-48 w-full block">
                    <Image
                      src={articleImage.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      data-ai-hint={articleImage.imageHint}
                    />
                  </Link>
                )}
                <CardHeader>
                  <Badge variant="secondary" className="mb-2 w-fit">
                      {article.category}
                  </Badge>
                  <CardTitle className="font-headline text-xl">
                    <Link href={getArticleLink(article)} className="hover:underline">
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                      By <Link href={`/author/${encodeURIComponent(article.author)}`} className="hover:underline">{article.author}</Link> | {article.publishedDate}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : searchTerm && (
        <div className="text-center py-16 text-muted-foreground">
          <p>No articles found matching your search.</p>
        </div>
      )}
    </>
  );
}
