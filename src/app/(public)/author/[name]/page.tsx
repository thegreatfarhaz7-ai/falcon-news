import { articles } from '@/lib/placeholder-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export default function AuthorPage({ params }: { params: { name: string } }) {
  const authorName = decodeURIComponent(params.name);
  const authorArticles = articles.filter(article => article.author === authorName);

  if (authorArticles.length === 0) {
    notFound();
  }
  
  const getArticleLink = (article: (typeof articles)[0]) => {
    return article.category === 'Videos' ? `/videos/${article.slug}` : `/article/${article.slug}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${authorName}`} alt={authorName} />
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="font-headline text-4xl font-bold">{authorName}</h1>
        <p className="mt-2 text-muted-foreground">
          {authorArticles.length} articles published
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {authorArticles.map(article => {
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
                <p className="mt-4 text-xs text-muted-foreground">{article.publishedDate}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
