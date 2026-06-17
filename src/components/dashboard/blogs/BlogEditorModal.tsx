'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Image from 'next/image';
import { createBlog, updateBlog } from '@/actions/blog.actions';
import { createBlogSchema, CreateBlogInput } from '@/schemas/blog.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dynamic from 'next/dynamic';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#E07B3F]" />
    </div>
  ),
});

import 'react-quill-new/dist/quill.snow.css';
import { Blog } from '@/types/blog.types';

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
  onSuccess: () => void;
  categories: string[];
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'bullet',
  'link', 'image',
];

export default function BlogEditorModal({
  isOpen,
  onClose,
  blog,
  onSuccess,
  categories,
}: BlogEditorModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateBlogInput>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: '',
      category: '',
      readingTime: 5,
      isActive: true,
    },
  });

  const isActive = watch('isActive');
  const imageUrl = watch('image');

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image || '',
        author: blog.author,
        category: blog.category,
        readingTime: blog.readingTime,
        isActive: blog.isActive,
      });
      setContent(blog.content);
      setImagePreview(blog.image || null);
    } else {
      reset({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author: '',
        category: '',
        readingTime: 5,
        isActive: true,
      });
      setContent('');
      setImagePreview(null);
    }
  }, [blog, reset]);

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const onSubmit = async (data: CreateBlogInput) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...data,
        content,
      };
      
      const result = blog 
        ? await updateBlog({ id: blog.id, ...payload })
        : await createBlog(payload);
      
      if (result.status === 'success') {
        toast.success(blog ? 'Blog updated successfully' : 'Blog created successfully');
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || 'Failed to save blog');
      }
    } catch (error) {
      console.error('Save blog error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <h2 className="text-xl font-bold text-[#121F37]">
              {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-[#121F37] font-semibold">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Enter blog title..."
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt" className="text-[#121F37] font-semibold">
                  Excerpt <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="excerpt"
                  {...register('excerpt')}
                  placeholder="Brief summary of the blog post..."
                  rows={2}
                  className="mt-1"
                />
                {errors.excerpt && (
                  <p className="text-xs text-red-500 mt-1">{errors.excerpt.message}</p>
                )}
              </div>

              {/* Content - Rich Text Editor */}
              <div>
                <Label className="text-[#121F37] font-semibold">
                  Content <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 rounded-xl border border-gray-200 overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    formats={quillFormats}
                    className="custom-quill"
                    placeholder="Write your blog content here..."
                  />
                </div>
                {errors.content && (
                  <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
                )}
              </div>

              {/* Image */}
              <div>
                <Label htmlFor="image" className="text-[#121F37] font-semibold">
                  Featured Image URL
                </Label>
                <div className="flex gap-4 items-start mt-1">
                  <div className="flex-1">
                    <Input
                      id="image"
                      {...register('image')}
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors.image && (
                      <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author" className="text-[#121F37] font-semibold">
                    Author <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    {...register('author')}
                    placeholder="Author name..."
                    className="mt-1"
                  />
                  {errors.author && (
                    <p className="text-xs text-red-500 mt-1">{errors.author.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category" className="text-[#121F37] font-semibold">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('category', value)}
                    defaultValue={blog?.category || ''}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem value="new">+ Add New Category</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                  )}
                </div>
              </div>

              {/* Reading Time & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="readingTime" className="text-[#121F37] font-semibold">
                    Reading Time (minutes)
                  </Label>
                  <Input
                    id="readingTime"
                    type="number"
                    {...register('readingTime', { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.readingTime && (
                    <p className="text-xs text-red-500 mt-1">{errors.readingTime.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <Label htmlFor="isActive" className="text-[#121F37] font-semibold">
                    Status
                  </Label>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="isActive"
                      checked={isActive}
                      onCheckedChange={(checked) => setValue('isActive', checked)}
                    />
                    <span className="text-sm text-gray-500">
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-[#E07B3F] hover:bg-[#d66b2f]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {blog ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{blog ? 'Update Blog' : 'Create Blog'}</>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}