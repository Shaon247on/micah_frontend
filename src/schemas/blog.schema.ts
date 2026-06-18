import { z } from 'zod';

// Helper to calculate reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

// Helper to get plain text from HTML
export const getPlainText = (html: string): string => {
  if (!html) return '';
  // Remove HTML tags and decode entities
  const stripped = html.replace(/<[^>]*>/g, ' ');
  // Decode HTML entities (like &nbsp;, &amp;, etc.)
  const decoded = stripped.replace(/&[a-z]+;/gi, ' ');
  // Remove extra whitespace
  return decoded.replace(/\s+/g, ' ').trim();
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ✅ Updated schema with proper content validation
export const createBlogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters').max(300, 'Excerpt too long'),
  content: z.string()
    .min(1, 'Content is required')
    .refine((val) => {
      const plainText = getPlainText(val);
      return plainText.length >= 30;
    }, {
      message: 'Content must have at least 30 characters of meaningful text.',
    }),
  image: z.string().url('Invalid image URL').optional().nullable(),
  author: z.string().min(2, 'Author name is required'),
  category: z.string().min(2, 'Category is required'),
  readingTime: z.number().int().min(1).optional(),
  relatedBlogIds: z.array(z.string()).optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateBlogSchema = createBlogSchema.partial().extend({
  id: z.string(),
});

export const getBlogsQuerySchema = z.object({
  page: z.string().optional().transform(Number).default(1),
  limit: z.string().optional().transform(Number).default(10),
  category: z.string().optional(),
  search: z.string().optional(),
  isActive: z.string().optional().transform(val => val === 'true'),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type GetBlogsQueryInput = z.infer<typeof getBlogsQuerySchema>;