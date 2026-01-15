import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import HeroSlider from '@/components/page/HeroSlider';

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

async function getNews(): Promise<{ articles: Article[] }> {
  try {
    const response = await fetch(`${process.env.APP_URL}/api/news`, { cache: 'no-store' });
    if (!response.ok) {
      console.error("Failed to fetch news:", response.status, response.statusText);
      const errorBody = await response.text();
      console.error("Error body:", errorBody);
      return { articles: [] };
    }
    const data = await response.json();
    // Filter out articles without images
    const articlesWithImages = data.articles.filter((article: Article) => article.urlToImage);
    return { articles: articlesWithImages };
  } catch (error) {
    console.error("Fetch error in getNews:", error);
    return { articles: [] };
  }
}

export default async function HomePage() {
  const { articles } = await getNews();
  
  if (!articles || articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Could Not Load News</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
  
  const heroArticles = articles.slice(0, 5);
  const breakingArticles = articles.slice(5, 9);
  const latestArticles = articles.slice(9, 15);

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Hero Slider Section */}
        <div className="lg:col-span-2">
          <HeroSlider articles={heroArticles} />
        </div>

        {/* Breaking News Sidebar */}
        <aside>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Breaking News</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {breakingArticles.map((article, index) => (
                <div key={article.title + index} className={`space-y-2 ${index < breakingArticles.length - 1 ? 'border-b pb-4' : ''}`}>
                  <h3 className="font-headline text-lg font-bold leading-tight">
                    <Link href={`/article/${encodeURIComponent(article.title)}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
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
            <Link href="/category/all">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article, index) => {
            return (
              <Card key={article.title + index} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                {article.urlToImage && (
                  <Link href={`/article/${encodeURIComponent(article.title)}`} className="relative h-48 w-full block">
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </Link>
                )}
                <CardHeader>
                    <Badge variant="secondary" className="mb-2 w-fit">
                        <Link href={`/category/${article.source.name?.toLowerCase().replace(/ /g, '-') || 'general'}`}>{article.source.name}</Link>
                    </Badge>
                  <CardTitle className="font-headline text-xl">
                    <Link href={`/article/${encodeURIComponent(article.title)}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{article.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
