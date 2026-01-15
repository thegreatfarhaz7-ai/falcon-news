import { articles } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article || article.category === 'Videos') {
    notFound();
  }

  const articleImage = PlaceHolderImages.find(img => img.id === article.imageId);
  const relatedArticles = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  const getArticleLink = (article: (typeof articles)[0]) => {
    return article.category === 'Videos' ? `/videos/${article.slug}` : `/article/${article.slug}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        <article className="lg:col-span-3">
          <header className="mb-8">
            <Badge variant="secondary" className="mb-2">
                {article.category}
            </Badge>
            <h1 className="font-headline text-4xl font-bold md:text-6xl">{article.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{article.summary}</p>
            <div className="mt-6 flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?u=${article.author}`} alt={article.author} />
                <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">
                    <Link href={`/author/${encodeURIComponent(article.author)}`} className="hover:underline">{article.author}</Link>
                </p>
                <p className="text-sm text-muted-foreground">{article.publishedDate}</p>
              </div>
            </div>
          </header>

          {articleImage && (
            <div className="relative mb-8 h-[300px] w-full md:h-[500px]">
              <Image
                src={articleImage.imageUrl}
                alt={article.title}
                fill
                className="rounded-lg object-cover"
                data-ai-hint={articleImage.imageHint}
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{article.content}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>A Subheading for More Detail</h3>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.</p>
            <blockquote>"This is an insightful blockquote that adds emphasis to a key point in the article."</blockquote>
            <p>Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Praesent vitae quam quis diam laoreet vestibulum. In pellen tesque, purus ut tincidunt vehicula, leo leo commodo nunc, at molestie elit lectus nec sapien. Cras ut enim.</p>
          </div>

          <div className="mt-8">
            <h4 className="font-bold">Tags:</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Badge key={tag} variant="outline">
                    <Link href={`/tag/${tag.toLowerCase().replace(/ /g, '-')}`}>{tag}</Link>
                </Badge>
              ))}
            </div>
          </div>
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedArticles.map(related => {
                    const relatedImage = PlaceHolderImages.find(img => img.id === related.imageId);
                    return (
                        <div key={related.id} className="flex items-start gap-4">
                            {relatedImage && (
                                <div className="relative h-16 w-16 flex-shrink-0">
                                <Image 
                                    src={relatedImage.imageUrl}
                                    alt={related.title}
                                    fill
                                    className="rounded-md object-cover"
                                    data-ai-hint={relatedImage.imageHint}
                                />
                                </div>
                            )}
                            <div>
                                <h3 className="text-sm font-semibold leading-tight">
                                    <Link href={getArticleLink(related)} className="hover:underline">{related.title}</Link>
                                </h3>
                                <p className="mt-1 text-xs text-muted-foreground">{related.publishedDate}</p>
                            </div>
                        </div>
                    )
                })}
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
