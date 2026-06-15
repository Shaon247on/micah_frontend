export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQResponse {
  status: string;
  data: {
    faqs: FAQ[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface FAQSingleResponse {
  status: string;
  data: FAQ;
}

export interface FAQMutationResponse {
  status: string;
  message: string;
  data?: FAQ;
}