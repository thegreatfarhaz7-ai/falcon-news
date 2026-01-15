'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Article } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';

interface ArticlesTableProps {
  articles: Article[];
}

export default function ArticlesTable({ articles }: ArticlesTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(articles.map(a => a.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  }

  const getStatusBadgeVariant = (status: Article['status']) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getArticleLink = (article: Article) => {
    return article.category === 'Videos' ? `/videos/${article.slug}` : `/article/${article.slug}`;
  };

  const isAllSelected = selectedRows.length > 0 && selectedRows.length === articles.length;
  const isSomeSelected = selectedRows.length > 0 && selectedRows.length < articles.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input placeholder="Filter articles by title..." className="max-w-sm" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  aria-label="Select all"
                  checked={isSomeSelected ? 'indeterminate' : isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Published</TableHead>
              <TableHead className="w-[40px]">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} data-state={selectedRows.includes(article.id) ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    aria-label={`Select article ${article.title}`}
                    checked={selectedRows.includes(article.id)}
                    onCheckedChange={(checked) => handleSelectRow(article.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium max-w-[300px] truncate">
                    <Link href={getArticleLink(article)} className="hover:underline">{article.title}</Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">{article.author}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline">
                    {article.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(article.status)}>
                    {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{article.publishedDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={getArticleLink(article)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/articles/edit/${article.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
            {selectedRows.length} of {articles.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">Page 1 of 1</div>
            <Button variant="outline" size="sm" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}
