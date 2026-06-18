import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "@/actions/blog.actions";
import RelatedBlogs from "@/components/features/blog/RelatedBlogs";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const { getBlogs } = await import("@/actions/blog.actions");
    const result = await getBlogs({ limit: 100, isActive: true });
    return (result.data?.blogs || []).map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;

  const result = await getBlogBySlug(slug);

  const blog = result?.data;

  if (!blog || result.status === "error") {
    notFound();
  }

  // ✅ Related blogs are already slim - no extra data
  const relatedBlogs = blog?.relatedBlogs || [];

  return (
    <main className="w-full bg-white">
      {/* Hero Image */}
      <div className="relative h-96 w-full bg-gray-200 overflow-hidden">
        {blog.image && (
          <>
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <span className="inline-block bg-[#E07B3F] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.1em] mb-4">
            {blog.category}
          </span>
        </div>
      </div>

      <article className="max-w-420 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-360 mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#E07B3F] hover:text-[#d66b2f] font-semibold transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>

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
                .replace(
                  /<h2>/g,
                  '<h2 className="text-3xl font-bold text-[#121F37] mt-8 mb-4 leading-tight">',
                )
                .replace(
                  /<p>/g,
                  '<p className="text-[#374151] leading-8 mb-4">',
                )
                .replace(
                  /<ul>/g,
                  '<ul className="list-disc list-inside mb-4 text-[#374151]">',
                )
                .replace(/<li>/g, '<li className="mb-2">')
                .replace(
                  /<strong>/g,
                  '<strong className="font-bold text-[#121F37]">',
                ),
            }}
          />

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#E07B3F] to-[#d66b2f] text-white">
            <h3 className="text-2xl font-bold mb-2">Need Professional Help?</h3>
            <p className="mb-4">
              Contact Micah K Official today for expert HVAC, water quality, and
              indoor air quality solutions.
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
