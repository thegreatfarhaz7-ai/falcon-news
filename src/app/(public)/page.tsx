
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rss } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export const dynamic = 'force-dynamic';

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

type RssItem = {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    guid: string;
    isoDate: string;
}

async function getNews(language = 'en', category?: string, pageSize = 20): Promise<Article[]> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    let url = `${baseUrl}/api/news?pageSize=${pageSize}&language=${language}`;
    if (category) {
        url += `&category=${category}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch news for category: ${category}`, response.status, response.statusText);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return [];
        }
        const data = await response.json();
        return data.articles.filter((article: Article) => article.urlToImage && article.title && article.description);
    } catch (error) {
        console.error(`Fetch error in getNews for category: ${category}`, error);
        return [];
    }
}

async function getRssFeed(feedKey: string): Promise<RssItem[]> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    let url = `${baseUrl}/api/rss?feed=${feedKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch RSS feed for key: ${feedKey}`, response.status, response.statusText);
            return [];
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(`Fetch error in getRssFeed for key: ${feedKey}`, error);
        return [];
    }
}

const CategorySection = async ({ language, category, title }: { language: string, category: string; title: string }) => {
    const articles = await getNews(language, category, 7);
    if (!articles || articles.length < 1) return null;

    const mainArticle = articles[0];
    const sideArticles = articles.slice(1, 3);
    const bottomArticles = articles.slice(3, 7);

    return (
        <section className="mt-12">
            <div className="flex items-center justify-between border-b-2 pb-2 mb-6">
                <h2 id={category.toLowerCase()} className="font-headline text-3xl font-bold capitalize scroll-mt-24">{title}</h2>
                <Button variant="link" asChild>
                    <Link href={`/articles`}>
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-xl h-full">
                        <Link href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="relative h-64 md:h-auto md:w-1/2 block flex-shrink-0">
                            <Image
                                src={mainArticle.urlToImage}
                                alt={mainArticle.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </Link>
                        <div className="flex flex-col justify-between">
                            <CardHeader>
                                <Badge variant="secondary" className="mb-2 w-fit">{mainArticle.source.name}</Badge>
                                <CardTitle className="font-headline text-2xl">
                                    <Link href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {mainArticle.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">{mainArticle.description}</p>
                                <p className="text-xs text-muted-foreground mt-4">{new Date(mainArticle.publishedAt).toLocaleDateString()}</p>
                            </CardContent>
                        </div>
                    </Card>
                </div>
                <aside className="space-y-4">
                    {sideArticles.map((article, index) => (
                         <div key={article.title + index} className="flex items-start gap-4">
                             <Link href={article.url} target="_blank" rel="noopener noreferrer" className="relative h-16 w-16 flex-shrink-0">
                                 <Image
                                     src={article.urlToImage}
                                     alt={article.title}
                                     fill
                                     className="rounded-md object-cover"
                                     unoptimized
                                 />
                             </Link>
                             <div>
                                 <h3 className="text-sm font-semibold leading-tight">
                                     <Link href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline line-clamp-3">{article.title}</Link>
                                 </h3>
                                 <p className="mt-1 text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString()}</p>
                             </div>
                         </div>
                    ))}
                </aside>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {bottomArticles.map((article, index) => (
                    <Card key={article.title + index} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                        <Link href={article.url} target="_blank" rel="noopener noreferrer" className="relative h-40 w-full block">
                            <Image
                                src={article.urlToImage}
                                alt={article.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </Link>
                        <CardHeader className="flex-grow">
                             <h3 className="text-sm font-semibold leading-tight">
                                <Link href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline line-clamp-3">{article.title}</Link>
                            </h3>
                        </CardHeader>
                        <CardContent>
                           <p className="text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

const RssSection = async ({ feedKey, title }: { feedKey: string; title: string }) => {
    const items = await getRssFeed(feedKey);
    if (!items || items.length === 0) return null;

    return (
        <section className="mt-12">
            <div className="flex items-center justify-between border-b-2 pb-2 mb-6">
                <h2 className="font-headline text-3xl font-bold flex items-center gap-2">
                    <Rss className="h-6 w-6 text-primary" />
                    {title}
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.slice(0, 6).map((item, index) => (
                    <Card key={item.guid + index} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                        <CardHeader className="flex-grow">
                            <CardTitle className="font-headline text-lg">
                                <Link href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline line-clamp-4">
                                    {item.title}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
                            <p className="mt-4 text-xs text-muted-foreground">{new Date(item.isoDate).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};


export default async function HomePage() {
  const lang = 'en';
  const topHeadlines = await getNews(lang, 'general', 10);

  if (!topHeadlines || topHeadlines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Could Not Load News</h1>
        <p>Please try again later or check your API configuration.</p>
      </div>
    );
  }

  const heroArticle = topHeadlines[0];
  const heroSideArticles = topHeadlines.slice(1, 5);
  const trendingArticles = topHeadlines.slice(5, 9);

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <Link href={heroArticle.url} target="_blank" rel="noopener noreferrer" className="relative block h-[500px] w-full group">
                    <Image
                        src={heroArticle.urlToImage}
                        alt={heroArticle.title}
                        fill
                        className="rounded-lg object-cover"
                        unoptimized
                        priority
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                        <Badge variant="destructive" className="mb-2">Top Story</Badge>
                        <h1 className="font-headline text-3xl text-white md:text-5xl group-hover:underline">
                            {heroArticle.title}
                        </h1>
                        <p className="mt-2 text-sm text-gray-300 line-clamp-2 md:text-base">
                            {heroArticle.description}
                        </p>
                    </div>
                </Link>
            </div>
            <aside className="space-y-4">
                {heroSideArticles.map((article, index) => (
                     <Card key={article.title + index} className="flex items-start gap-4 p-4 transition-shadow hover:shadow-md">
                         <Link href={article.url} target="_blank" rel="noopener noreferrer" className="relative h-20 w-20 flex-shrink-0">
                             <Image
                                 src={article.urlToImage}
                                 alt={article.title}
                                 fill
                                 className="rounded-md object-cover"
                                 unoptimized
                             />
                         </Link>
                         <div>
                             <h3 className="text-md font-semibold leading-tight">
                                 <Link href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline line-clamp-3">{article.title}</Link>
                             </h3>
                             <p className="mt-1 text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString()}</p>
                         </div>
                     </Card>
                ))}
            </aside>
        </main>
        
        {/* Trending News Bar */}
        <section className="mt-12">
             <div className="flex items-center justify-between border-b-2 pb-2">
                 <h2 id="trending" className="font-headline text-3xl font-bold scroll-mt-24">Trending</h2>
             </div>
             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {trendingArticles.map((article, index) => {
                 return (
                   <Card key={article.title + index} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                     <Link href={article.url} target="_blank" rel="noopener noreferrer" className="relative h-48 w-full block">
                       <Image
                         src={article.urlToImage}
                         alt={article.title}
                         fill
                         className="object-cover"
                         unoptimized
                       />
                     </Link>
                     <CardHeader className="flex-grow">
                         <CardTitle className="font-headline text-lg">
                           <Link href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline line-clamp-4">
                             {article.title}
                           </Link>
                         </CardTitle>
                     </CardHeader>
                      <CardContent>
                          <p className="text-xs text-muted-foreground">{article.source.name} &bull; {new Date(article.publishedAt).toLocaleDateString()}</p>
                      </CardContent>
                   </Card>
                 );
               })}
             </div>
        </section>

        {/* Category Sections */}
        <CategorySection language={lang} category="technology" title="Technology" />
        <CategorySection language={lang} category="business" title="Business" />

        {/* RSS Feed Section */}
        <RssSection feedKey="hindustan-times" title="Hindustan Times" />
        
        <CategorySection language={lang} category="sports" title="Sports" />

    </div>
  );
}
