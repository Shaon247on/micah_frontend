'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import BlogCard from './BlogCard';
import { Blog } from '@/types/blog.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

interface BlogsPageClientProps {
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
}

export default function BlogsPageClient({
  initialBlogs,
  initialPagination,
  categories,
  currentCategory,
  currentSearch,
}: BlogsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // ✅ Use props directly - no local state for data
  const blogs = initialBlogs;
  const pagination = initialPagination;
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || 'All');
  const [searchTerm, setSearchTerm] = useState(currentSearch || '');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Debounce search term (500ms delay)
  const debouncedSearch = useDebounce(searchTerm, 500);

  const allCategories = ['All', ...categories];

  // ✅ Update URL with params
  const updateUrlParams = useCallback((params: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== '') {
        searchParams.set(key, value);
      }
    });
    router.push(`${pathname}?${searchParams.toString()}`);
  }, [router, pathname]);

  // ✅ Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    updateUrlParams({
      category: category === 'All' ? '' : category,
      search: searchTerm,
      page: '1',
    });
    router.refresh();
  }, [updateUrlParams, searchTerm, router]);

  // ✅ Handle page change
  const handlePageChange = useCallback((page: number) => {
    updateUrlParams({
      category: selectedCategory === 'All' ? '' : selectedCategory,
      search: searchTerm,
      page: page.toString(),
    });
    router.refresh();
  }, [updateUrlParams, selectedCategory, searchTerm, router]);

  // ✅ Clear search
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    // The debounce will handle the update
  }, []);

  // ✅ Auto-search when debounced search changes
  useEffect(() => {
    setIsLoading(true);
    updateUrlParams({
      category: selectedCategory === 'All' ? '' : selectedCategory,
      search: debouncedSearch,
      page: '1',
    });
    router.refresh();
    // Small delay to show loading state
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch, selectedCategory, updateUrlParams, router]);

  // ✅ Sync URL params with state on mount
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) setSelectedCategory(category);
    if (search) setSearchTerm(search);
  }, [searchParams]);

  // Format page info
  const startItem = pagination.total === 0 ? 0 : ((pagination.page - 1) * pagination.limit) + 1;
  const endItem = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-[#E07B3F]/10 to-transparent py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07B3F]">
              Our Blog
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              HVAC Tips, Tricks & Industry Insights
            </h1>
            <p className="mt-4 text-lg text-gray-500 leading-8">
              Stay informed with expert advice on air conditioning, heating, water quality, and maintaining your home comfort systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & Search */}
      <section className="bg-white py-8 border-b border-[#E8EEF7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {allCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#E07B3F] text-white'
                      : 'bg-[#F8F9FB] text-[#121F37] border border-[#E8EEF7] hover:border-[#E07B3F]'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Search with Clear Button */}
            <div className="relative w-full md:w-56">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-9 w-full"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-[#E07B3F] rounded-full animate-spin" />
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 0 && (
                <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {startItem} to {endItem} of {pagination.total} blogs
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
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
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-[#6B6B6B]">
                No blogs found matching your criteria. Try adjusting your search or category.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}