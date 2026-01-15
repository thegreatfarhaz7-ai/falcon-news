import { articles } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ArticlesPage() {
  if (!articles || articles.length === 0) {
    notFound();
  }

  const getArticleLink = (article: (typeof articles)[0]) => {
    return article.category === 'Videos' ? `/videos/${article.slug}` : `/article/${article.slug}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border-b-2 pb-4 mb-8">
        <h1 className="font-headline text-4xl font-bold">All Articles</h1>
        <p className="mt-2 text-muted-foreground">
          Explore all {articles.length} articles from our archives.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(article => {
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
    </div>
  );
}
