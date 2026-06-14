"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog.types";
import { Calendar, User, Clock } from "lucide-react";

interface RelatedBlogsProps {
  blogs: BlogPost[];
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-[#E8EEF7]">
      <h2 className="text-3xl font-bold text-[#121F37] mb-8">Related Articles</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-xl border border-[#E8EEF7] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Link href={`/blogs/${blog.slug}`} className="group">
              <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <span className="inline-block text-[#E07B3F] text-xs font-semibold uppercase tracking-[0.1em] mb-2">
                {blog.category}
              </span>

              <Link href={`/blogs/${blog.slug}`}>
                <h3 className="text-lg font-bold text-[#121F37] hover:text-[#E07B3F] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
              </Link>

              <div className="mt-3 flex items-center gap-2 text-xs text-[#6B6B6B]">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(blog.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{blog.readingTime} min</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
