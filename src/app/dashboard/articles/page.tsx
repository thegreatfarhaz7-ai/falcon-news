import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/placeholder-data';
import ArticlesTable from '@/components/dashboard/articles/ArticlesTable';
import Link from 'next/link';

export default function ArticlesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold">Manage Articles</h1>
          <p className="mt-2 text-muted-foreground">
            Here you can create, edit, and manage all news articles.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/articles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Article
          </Link>
        </Button>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Articles</CardTitle>
          <CardDescription>
            A list of all articles in your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArticlesTable articles={articles} />
        </CardContent>
      </Card>
    </div>
  );
}
