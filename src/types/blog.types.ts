export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  author: string;
  publishedDate: string;
  category: string;
  readingTime: number;
  relatedBlogIds: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface BlogResponse {
  status: string;
  data: {
    blogs: Blog[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface BlogSingleResponse {
  status: string;
  data: Blog;
}

export interface BlogMutationResponse {
  status: string;
  message: string;
  data?: Blog;
}

export interface BlogCategoriesResponse {
  status: string;
  data: string[];
}

export interface CreateBlogInput {
  title: string;
  excerpt: string;
  content: string;
  image?: string | null;
  author: string;
  category: string;
  readingTime: number;
  relatedBlogIds?: string[];
  isActive?: boolean;
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
  id: string;
}