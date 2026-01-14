import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function HomePage() {
  const heroArticles = articles.slice(0, 4);
  const breakingArticles = articles.slice(4, 8);
  const latestArticles = articles.slice(8, 14);

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Hero Slider Section */}
        <div className="lg:col-span-2">
          <Carousel
            opts={{
              loop: true,
            }}
            className="group relative"
          >
            <CarouselContent>
              {heroArticles.map((article) => {
                const articleImage = PlaceHolderImages.find(img => img.id === article.imageId);
                return (
                  <CarouselItem key={article.id}>
                    <Card className="overflow-hidden border-none shadow-2xl">
                      {articleImage && (
                        <div className="relative h-64 w-full md:h-96">
                          <Image
                            src={articleImage.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            data-ai-hint={articleImage.imageHint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>
                      )}
                      <CardHeader className="relative -mt-24 border-t-4 border-primary bg-background/80 p-6 backdrop-blur-sm md:-mt-32">
                        <Badge variant="destructive" className="absolute -top-4 left-6">
                          {article.category}
                        </Badge>
                        <CardTitle className="font-headline text-3xl md:text-5xl">
                          <Link href="#" className="hover:underline">
                            {article.title}
                          </Link>
                        </CardTitle>
                        <p className="pt-2 text-muted-foreground line-clamp-2">{article.summary}</p>
                        <p className="pt-4 text-sm text-muted-foreground">
                          By {article.author} | {article.publishedDate}
                        </p>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        </div>

        {/* Breaking News Sidebar */}
        <aside>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Breaking News</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {breakingArticles.map((article, index) => (
                <div key={article.id} className={`space-y-2 ${index < breakingArticles.length - 1 ? 'border-b pb-4' : ''}`}>
                  <h3 className="font-headline text-lg font-bold leading-tight">
                    <Link href="#" className="hover:underline">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.summary}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </main>

      {/* Latest News Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between border-b-2 pb-2">
          <h2 className="font-headline text-3xl font-bold">Latest News</h2>
          <Button variant="link" asChild>
            <Link href="#">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map(article => {
            const articleImage = PlaceHolderImages.find(img => img.id === article.imageId);
            return (
              <Card key={article.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                {articleImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={articleImage.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      data-ai-hint={articleImage.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <Badge variant="secondary" className="mb-2 w-fit">{article.category}</Badge>
                  <CardTitle className="font-headline text-xl">
                    <Link href="#" className="hover:underline">
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
      </section>
    </div>
  );
}
