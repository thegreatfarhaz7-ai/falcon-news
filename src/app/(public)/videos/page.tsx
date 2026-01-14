import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

export default function VideoNewsPage() {
  const videoArticles = articles.filter(a => a.category === 'Videos');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-4xl font-bold mb-8 border-b-2 pb-4">Video News</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videoArticles.map(article => {
          const articleImage = PlaceHolderImages.find(img => img.id === article.imageId);
          return (
            <Card key={article.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl group">
              {articleImage && (
                <Link href={`/videos/${article.slug}`} className="relative h-48 w-full block">
                  <Image
                    src={articleImage.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    data-ai-hint={articleImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/80 transform transition-transform group-hover:scale-110" />
                  </div>
                </Link>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  <Link href={`/videos/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
