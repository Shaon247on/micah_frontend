import { Metadata } from 'next';
import { getActiveBlogs, getBlogCategories } from '@/actions/blog.actions';
import BlogsPageClient from '@/components/features/blog/BlogsPageClient';

export const metadata: Metadata = {
  title: 'Blog | HVAC Service',
  description: 'HVAC tips, tricks and industry insights',
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const category = params.category;
  const search = params.search;
  
  const [blogsResult, categoriesResult] = await Promise.all([
    getActiveBlogs({ page, limit: 9, category, search }),
    getBlogCategories(),
  ]);

 console.log("the blog post:",blogsResult)

  return (
    <BlogsPageClient
      initialBlogs={blogsResult.data.blogs}
      initialPagination={blogsResult.data.pagination}
      categories={categoriesResult.data}
      currentCategory={category || 'All'}
      currentSearch={search || ''}
    />
  );
}