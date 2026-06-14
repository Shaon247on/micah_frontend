"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { blogsData } from "@/data/blogs";
import BlogCard from "@/components/features/blog/BlogCard";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = blogsData.map((blog) => blog.category);
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") {
      return blogsData;
    }
    return blogsData.filter((blog) => blog.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#121F37] to-[#1a2a4a] py-16 md:py-24">
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
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              HVAC Tips, Tricks & Industry Insights
            </h1>
            <p className="mt-4 text-lg text-gray-300 leading-8">
              Stay informed with expert advice on air conditioning, heating, water quality, and maintaining your home comfort systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8 border-b border-[#E8EEF7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#E07B3F] text-white"
                    : "bg-[#F8F9FB] text-[#121F37] border border-[#E8EEF7] hover:border-[#E07B3F]"
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
          {filteredBlogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
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
