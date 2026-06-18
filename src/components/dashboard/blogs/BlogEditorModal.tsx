"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2, Upload, Check, ImageIcon, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import { Blog } from "@/types/blog.types";
import {
  createBlog,
  updateBlog,
  uploadBlogImage,
} from "@/actions/blog.actions";
import { createBlogSchema, CreateBlogInput } from "@/schemas/blog.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { getPlainText } from "@/schemas/blog.schema";

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#E07B3F]" />
    </div>
  ),
});

import "react-quill-new/dist/quill.snow.css";

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
  onSuccess: () => void;
  categories: string[];
}

// ✅ Fixed Quill modules - removed 'bullet' from formats
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

// ✅ Fixed formats - removed 'bullet' (use 'list' instead)
const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list", // ✅ This covers both ordered and bullet lists
  "link",
  "image",
];

export default function BlogEditorModal({
  isOpen,
  onClose,
  blog,
  onSuccess,
  categories,
}: BlogEditorModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState("");

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
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      category: "",
      readingTime: 5,
      isActive: true,
    },
  });

  const isActive = watch("isActive");
  const imageUrl = watch("image");

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image || "",
        author: blog.author,
        category: blog.category,
        readingTime: blog.readingTime,
        isActive: blog.isActive,
      });
      setContent(blog.content);
      setImagePreview(blog.image || null);
    } else {
      reset({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        author: "",
        category: "",
        readingTime: 5,
        isActive: true,
      });
      setContent("");
      setImagePreview(null);
    }
  }, [blog, reset]);

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await uploadBlogImage(formData);

      if (result.status === "success" && result.imageUrl) {
        setImagePreview(result.imageUrl);
        setValue("image", result.imageUrl);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (data: CreateBlogInput) => {
    setIsSubmitting(true);

    try {
      // ✅ Check content length using the helper
      const plainText = getPlainText(content);

      if (plainText.length < 30) {
        toast.error(
          `Content must have at least 30 characters of meaningful text (currently ${plainText.length} characters)`,
        );
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...data,
        content,
      };

      const result = blog
        ? await updateBlog({ id: blog.id, ...payload })
        : await createBlog(payload);

      if (result.status === "success") {
        toast.success(
          blog ? "Blog updated successfully" : "Blog created successfully",
        );
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || "Failed to save blog");
      }
    } catch (error) {
      console.error("Save blog error:", error);
      toast.error("An unexpected error occurred");
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
              {blog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto p-6"
          >
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-[#121F37] font-semibold">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter blog title..."
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <Label
                  htmlFor="excerpt"
                  className="text-[#121F37] font-semibold"
                >
                  Excerpt <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt")}
                  placeholder="Brief summary of the blog post..."
                  rows={2}
                  className="mt-1"
                />
                {errors.excerpt && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.excerpt.message}
                  </p>
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
                    onChange={(value) => {
                      setContent(value);
                      setValue("content", value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    modules={quillModules}
                    formats={quillFormats}
                    className="custom-quill"
                    placeholder="Write your blog content here... (minimum 30 characters)"
                  />
                </div>
                {errors.content && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.content.message}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Minimum 30 characters of meaningful text
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-[#121F37] font-semibold">
                  Featured Image
                </Label>

                {imagePreview ? (
                  <div className="mt-2 relative rounded-xl overflow-hidden border border-gray-200 group">
                    <div className="relative w-full h-56">
                      <Image
                        src={imagePreview}
                        alt="Featured image preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) await handleImageUpload(file);
                          e.target.value = "";
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={isUploadingImage}
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        {isUploadingImage ? (
                          <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 mr-1.5" />
                        )}
                        Replace
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setImagePreview(null);
                          setValue("image", "");
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1.5" />
                        Remove
                      </Button>
                    </div>
                    {isUploadingImage && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-[#E07B3F]" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) await handleImageUpload(file);
                        e.target.value = "";
                      }}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center gap-2 h-40 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#E07B3F]/50 cursor-pointer transition-colors"
                    >
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin text-[#E07B3F]" />
                          <span className="text-sm text-gray-500">
                            Uploading...
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            Click to upload an image
                          </span>
                          <span className="text-xs text-gray-400">
                            PNG, JPG up to 2MB
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                )}
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="author"
                    className="text-[#121F37] font-semibold"
                  >
                    Author <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    {...register("author")}
                    placeholder="Author name..."
                    className="mt-1"
                  />
                  {errors.author && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.author.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="category"
                    className="text-[#121F37] font-semibold"
                  >
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                    defaultValue={blog?.category || ""}
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
                    <p className="text-xs text-red-500 mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Reading Time & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="readingTime"
                    className="text-[#121F37] font-semibold"
                  >
                    Reading Time (minutes)
                  </Label>
                  <Input
                    id="readingTime"
                    type="number"
                    {...register("readingTime", { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.readingTime && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.readingTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-[#121F37] font-semibold">Status</Label>
                  <button
                    type="button"
                    onClick={() => setValue("isActive", !isActive)}
                    className={`mt-1 w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-1 transition-colors ${
                      isActive
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center ${
                          isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {isActive ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-[#121F37]">
                          {isActive ? "Active" : "Inactive"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {isActive
                            ? "Visible to readers"
                            : "Hidden from readers"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                        isActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <Button type="button" variant="outline" onClick={onClose}>
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
                  {blog ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{blog ? "Update Blog" : "Create Blog"}</>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
