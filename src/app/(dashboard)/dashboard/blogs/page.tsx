import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth.actions';
import { getBlogs, getBlogCategories } from '@/actions/blog.actions';
import BlogManagementClient from '@/components/dashboard/blogs/BlogManagementClient';

export const metadata: Metadata = {
  title: 'Blog Management | HVAC Service',
  description: 'Manage blog posts',
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function BlogManagementPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Only super admin can access this page
  if (user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }
  
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const category = params.category;
  const search = params.search;
  const isActive = params.status === 'active' ? true : params.status === 'inactive' ? false : undefined;
  
  const [blogsResult, categoriesResult] = await Promise.all([
    getBlogs({ page, limit: 10, category, search, isActive }),
    getBlogCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogManagementClient
        initialBlogs={blogsResult.data.blogs}
        initialPagination={blogsResult.data.pagination}
        categories={categoriesResult.data}
        currentCategory={category || ''}
        currentSearch={search || ''}
        currentStatus={params.status || 'all'}
      />
    </div>
  );
}