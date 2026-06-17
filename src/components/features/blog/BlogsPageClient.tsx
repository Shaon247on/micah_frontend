'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { Blog } from '@/types/blog.types';

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
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [isLoading, setIsLoading] = useState(false);

  const allCategories = ['All', ...categories];

  const updateUrlParams = useCallback((params: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'All') {
        searchParams.set(key, value);
      }
    });
    router.push(`${pathname}?${searchParams.toString()}`);
  }, [router, pathname]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    updateUrlParams({
      category: category === 'All' ? '' : category,
      search: searchTerm,
      page: '1',
    });
  }, [updateUrlParams, searchTerm]);

  // ... rest of the component logic

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

      {/* Category Filter */}
      <section className="bg-white py-8 border-b border-[#E8EEF7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-[#6B6B6B]">
                No blogs found in this category. Try selecting a different one.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}