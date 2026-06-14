export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedDate: string;
  category: string;
  readingTime: number;
  relatedBlogIds?: string[];
}
