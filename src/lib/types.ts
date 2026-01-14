export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageId: string;
  category: string;
  tags: string[];
  author: string;
  publishedDate: string;
  status: 'draft' | 'pending' | 'published';
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Reporter' | 'Contributor' | 'Reader';
};
