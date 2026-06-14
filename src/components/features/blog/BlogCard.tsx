"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog.types";
import { Calendar, User, Clock } from "lucide-react";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-[#E8EEF7] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link href={`/blogs/${blog.slug}`} className="group">
        <div className="relative h-64 w-full overflow-hidden bg-gray-200">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className="inline-block bg-[#E07B3F] text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.1em]">
              {blog.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/blogs/${blog.slug}`}>
          <h3 className="text-xl font-bold text-[#121F37] hover:text-[#E07B3F] transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        <p className="mt-3 text-[#6B6B6B] text-base line-clamp-3 leading-6">
          {blog.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#6B6B6B]">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{new Date(blog.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{blog.readingTime} min read</span>
          </div>
        </div>

        <Link
          href={`/blogs/${blog.slug}`}
          className="mt-4 inline-block text-[#E07B3F] font-semibold hover:text-[#d66b2f] transition-colors"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}
