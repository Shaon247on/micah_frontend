import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogsData } from "@/data/blogs";
import RelatedBlogs from "@/components/features/blog/RelatedBlogs";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";

interface BlogDetailsPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogsData.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = blog.relatedBlogIds
    ?.map((id) => blogsData.find((b) => b.id === id))
    .filter(Boolean) as typeof blogsData;

  return (
    <main className="w-full bg-white">
      {/* <div className="bg-white border-b border-[#E8EEF7] sticky top-20 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#E07B3F] hover:text-[#d66b2f] font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>
        </div>
      </div> */}

      <div className="relative h-96 w-full bg-gray-200 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <span className="inline-block bg-[#E07B3F] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.1em] mb-4">
            {blog.category}
          </span>
        </div>
      </div>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#121F37] leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[#6B6B6B] mb-8 pb-8 border-b border-[#E8EEF7]">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>
                {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={20} />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{blog.readingTime} min read</span>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{
              __html: blog.content
                .replace(/<h2>/g, '<h2 className="text-3xl font-bold text-[#121F37] mt-8 mb-4 leading-tight">')
                .replace(/<p>/g, '<p className="text-[#374151] leading-8 mb-4">')
                .replace(/<ul>/g, '<ul className="list-disc list-inside mb-4 text-[#374151]">')
                .replace(/<li>/g, '<li className="mb-2">')
                .replace(/<strong>/g, '<strong className="font-bold text-[#121F37]">')
            }}
          />

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#E07B3F] to-[#d66b2f] text-white">
            <h3 className="text-2xl font-bold mb-2">Need Professional Help?</h3>
            <p className="mb-4">
              Contact Micah K Official today for expert HVAC, water quality, and indoor air quality solutions.
            </p>
            <Link
              href="/hvac-estimate"
              className="inline-block bg-white text-[#E07B3F] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {relatedBlogs && relatedBlogs.length > 0 && (
          <div className="max-w-3xl mx-auto mt-16">
            <RelatedBlogs blogs={relatedBlogs} />
          </div>
        )}
      </article>
    </main>
  );
}
