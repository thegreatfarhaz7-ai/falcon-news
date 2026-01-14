import { articles } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bookmark, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EditorialPage() {
  const editorialArticles = articles.filter(a => a.category === 'Editorial');

  if (editorialArticles.length === 0) {
    notFound();
  }

  const leadArticle = editorialArticles.find(a => a.slug === 'future-of-global-cooperation');
  const latestPerspectives = editorialArticles.filter(a => a.id !== leadArticle?.id).slice(0, 3);
  
  if (!leadArticle) {
    // Fallback if lead article isn't found
    return notFound();
  }

  const leadImage = PlaceHolderImages.find(img => img.id === leadArticle.imageId);

  return (
    <div className="bg-[hsl(var(--background))] font-serif text-gray-800">
      <div className="container mx-auto px-4 py-12 md:px-8">
        
        {/* Page Header */}
        <header className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Perspectives</p>
          <h1 className="font-headline text-5xl md:text-7xl font-bold mt-2">Opinion &amp; Editorial</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughtful analysis and diverse viewpoints on the stories shaping our world.
          </p>
        </header>

        {/* Lead Editorial Section */}
        <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-3">
                    <div className="flex items-center gap-4 mb-4">
                        <Badge variant="destructive" className="bg-primary text-primary-foreground text-xs uppercase">The Lead Editorial</Badge>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{leadArticle.publishedDate}</span>
                    </div>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight">
                        <Link href={`/article/${leadArticle.slug}`} className="hover:underline">
                            "{leadArticle.title}"
                        </Link>
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground font-sans">
                        {leadArticle.summary}
                    </p>
                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <p className="font-bold">{leadArticle.author}</p>
                            <p className="text-sm text-muted-foreground font-sans">Policy &amp; Governance</p>
                        </div>
                        <Link href={`/article/${leadArticle.slug}`} className="flex items-center gap-2 font-bold text-primary hover:underline">
                            Read Editorial <ArrowRight className="h-4 w-4"/>
                        </Link>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    {leadImage && (
                        <div className="relative">
                            <Image 
                                src={leadImage.imageUrl}
                                alt={leadArticle.title}
                                width={600}
                                height={400}
                                className="rounded-lg object-cover w-full h-auto"
                                data-ai-hint={leadImage.imageHint}
                            />
                            <div className="absolute -bottom-6 right-6 w-3/4 bg-background p-4 rounded-md shadow-lg border">
                                <p className="text-md italic text-center">"Isolation is the silent architect of modern decay."</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Latest Perspectives Section */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <div>
              <h2 className="font-headline text-4xl font-bold">Latest Perspectives</h2>
              <p className="text-muted-foreground mt-1 font-sans">Voices from the staff and around the globe</p>
            </div>
            <Button variant="link" className="text-primary font-bold" asChild>
                <Link href="/category/editorial">VIEW ALL OPINIONS</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPerspectives.map(article => {
              const articleImage = PlaceHolderImages.find(img => img.id === article.imageId);
              return (
                <Card key={article.id} className="border-none bg-transparent shadow-none overflow-visible">
                  <CardContent className="p-0">
                    {articleImage && (
                      <Link href={`/article/${article.slug}`}>
                        <Image 
                          src={articleImage.imageUrl} 
                          alt={article.title} 
                          width={400} 
                          height={400} 
                          className="w-full object-cover rounded-lg mb-4 grayscale"
                          data-ai-hint={articleImage.imageHint}
                        />
                      </Link>
                    )}
                    <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">{article.tags[0]}</p>
                    <h3 className="font-headline text-2xl font-bold mb-2">
                        <Link href={`/article/${article.slug}`} className="hover:underline">
                            {article.title}
                        </Link>
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm mb-4 line-clamp-3">{article.summary}</p>
                    <div className="flex justify-between items-center font-sans text-sm">
                        <div>
                            <p className="font-bold">{article.author}</p>
                            <p className="text-muted-foreground">Guest Contributor - 5 min read</p>
                        </div>
                        <Button variant="ghost" size="icon">
                            <Bookmark className="h-5 w-5 text-muted-foreground hover:text-primary"/>
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Weekly Perspective Newsletter */}
        <section className="bg-secondary rounded-lg py-16 px-8 text-center">
            <Mail className="h-10 w-10 text-primary mx-auto mb-4"/>
            <h2 className="font-headline text-4xl font-bold">The Weekly Perspective</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto font-sans">
                Get our editors' most thought-provoking columns and guest essays delivered to your inbox every Sunday morning.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input type="email" placeholder="Email address" className="bg-background font-sans text-base md:text-sm" />
                <Button type="submit" className="font-sans">Join the Dialogue</Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground uppercase tracking-widest font-sans">JOIN 150,000+ REGULAR READERS</p>
        </section>

      </div>
    </div>
  );
}
