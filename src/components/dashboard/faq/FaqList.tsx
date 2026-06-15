'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Plus, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import FaqModal from '@/components/dashboard/faq/FaqModal';
import AlertDialog from '@/components/dashboard/faq/AlertDialog';
import { deleteFAQ, getFAQs } from '@/actions/faq.actions';
import { FAQ } from '@/types/faq';

interface FaqListProps {
  initialFaqs: FAQ[];
}

export default function FaqList({ initialFaqs }: FaqListProps) {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh FAQs from server
  const refreshFAQs = async () => {
    setIsRefreshing(true);
    const result = await getFAQs({ limit: 100 });
    if (result.status === 'success') {
      setFaqs(result.data.faqs);
    }
    setIsRefreshing(false);
  };

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleEdit = (faq: FAQ) => {
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedFaq) return;
    
    setIsDeleting(true);
    const result = await deleteFAQ(selectedFaq.id);
    
    if (result.status === 'success') {
      toast.success('FAQ deleted successfully');
      await refreshFAQs(); // Refresh the list
      router.refresh(); // Also refresh server component
    } else {
      toast.error(result.message || 'Failed to delete FAQ');
    }
    
    setIsDeleting(false);
    setIsAlertOpen(false);
    setSelectedFaq(null);
  };

  const handleModalSuccess = async () => {
    await refreshFAQs(); // Refresh the list
    router.refresh(); // Also refresh server component
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#121F37]">FAQ Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage frequently asked questions displayed on your website.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedFaq(null);
            setIsModalOpen(true);
          }}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 rounded-lg bg-[#E07B3F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d66b2f] disabled:opacity-50"
        >
          <Plus size={18} />
          Add New FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-4">
        {isRefreshing ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-3 border-gray-200 border-t-[#E07B3F] rounded-full animate-spin" />
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No FAQs found. Click "Add New FAQ" to create one.</p>
          </div>
        ) : (
          faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`
                  overflow-hidden rounded-xl border bg-white transition-all duration-300
                  ${isOpen ? 'border-[#E07B3F] shadow-md' : 'border-gray-200'}
                `}
              >
                {/* Header */}
                <div
                  onClick={() => toggleFaq(faq.id)}
                  className="flex cursor-pointer items-center justify-between px-6 py-5"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="cursor-grab text-gray-400" />
                    <span className="text-[15px] font-medium text-[#121F37]">
                      {faq.question}
                    </span>
                  </div>

                  {/* Actions */}
                  <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="text-gray-400 transition hover:text-[#E07B3F]"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFaq(faq);
                        setIsAlertOpen(true);
                      }}
                      className="text-red-500 transition hover:opacity-80"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="text-gray-400 transition hover:text-[#E07B3F]"
                    >
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Answer */}
                {isOpen && (
                  <div className="mt-3 border-t border-gray-200 px-6 pb-6 pt-5 pl-12">
                    <p className="text-sm leading-7 text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      <FaqModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFaq(null);
        }}
        onSuccess={handleModalSuccess}
        faq={selectedFaq}
      />

      <AlertDialog
        isOpen={isAlertOpen}
        onClose={() => {
          setIsAlertOpen(false);
          setSelectedFaq(null);
        }}
        onConfirm={handleDelete}
        title="Delete FAQ"
        description={`Are you sure you want to delete "${selectedFaq?.question}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
}