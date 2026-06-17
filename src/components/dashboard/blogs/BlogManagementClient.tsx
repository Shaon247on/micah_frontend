'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteBlog, bulkDeleteBlogs } from '@/actions/blog.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import BlogEditorModal from './BlogEditorModal';
import { Blog } from '@/types/blog.types';

interface BlogManagementClientProps {
  initialBlogs: Blog[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  categories: string[];
  currentCategory: string;
  currentSearch: string;
  currentStatus: string;
}

export default function BlogManagementClient({
  initialBlogs,
  initialPagination,
  categories,
  currentCategory,
  currentSearch,
  currentStatus,
}: BlogManagementClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    category: currentCategory,
    search: currentSearch,
    status: currentStatus,
  });

  // Update URL with filters
  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (pagination.page > 1) params.set('page', pagination.page.toString());
    
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, filters, pagination.page]);

  useEffect(() => {
    updateUrlParams();
  }, [updateUrlParams]);

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    // Trigger refresh via URL update
    updateUrlParams();
    // Refresh the page data
    router.refresh();
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
    // Refresh the page data
    setTimeout(() => router.refresh(), 100);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    updateUrlParams();
    router.refresh();
  };

  const handleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(blogs.map(b => b.id));
    }
  };

  const handleSelectBlog = (id: string) => {
    setSelectedBlogs(prev => 
      prev.includes(id) ? prev.filter(b => b.id !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    
    setIsLoading(true);
    const result = await deleteBlog(blogToDelete.id);
    if (result.status === 'success') {
      toast.success('Blog deleted successfully');
      router.refresh();
    } else {
      toast.error(result.message || 'Failed to delete blog');
    }
    setIsLoading(false);
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  const handleBulkDelete = async () => {
    if (selectedBlogs.length === 0) return;
    
    setIsLoading(true);
    const result = await bulkDeleteBlogs(selectedBlogs);
    if (result.status === 'success') {
      toast.success(`${selectedBlogs.length} blogs deleted successfully`);
      setSelectedBlogs([]);
      router.refresh();
    } else {
      toast.error(result.message || 'Failed to delete blogs');
    }
    setIsLoading(false);
    setBulkDeleteDialogOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  const handleModalSuccess = () => {
    router.refresh();
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 border-none">
        <CheckCircle className="h-3 w-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-none">
        <XCircle className="h-3 w-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#121F37]">Blog Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-[#E07B3F] hover:bg-[#d66b2f]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Blog
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-9 w-56"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedBlogs.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {selectedBlogs.length} selected
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setBulkDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <Checkbox
                    checked={selectedBlogs.length === blogs.length && blogs.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    No blogs found. Create your first blog post!
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedBlogs.includes(blog.id)}
                        onCheckedChange={() => handleSelectBlog(blog.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {blog.image && (
                          <div className="relative h-12 w-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-[#121F37] line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            By {blog.author} • {blog.readingTime} min read
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="bg-[#F8F9FB] text-[#121F37]">
                        {blog.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(blog.isActive)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(blog.publishedDate)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(blog)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/blogs/${blog.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setBlogToDelete(blog);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <div className="text-sm text-gray-500">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} blogs
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={pagination.page === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={pagination.page === pageNum ? 'bg-[#E07B3F] hover:bg-[#d66b2f]' : ''}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Blog Editor Modal */}
      <BlogEditorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        blog={editingBlog}
        onSuccess={handleModalSuccess}
        categories={categories}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post &quot;{blogToDelete?.title}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              {isLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Blogs?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedBlogs.length} blog posts. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
              {isLoading ? 'Deleting...' : `Delete ${selectedBlogs.length} Blogs`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}