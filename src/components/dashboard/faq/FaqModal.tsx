'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { createFAQ, updateFAQ } from '@/actions/faq.actions';
import { FAQ } from '@/types/faq';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  faq?: FAQ | null;
}

export default function FaqModal({ isOpen, onClose, onSuccess, faq }: FaqModalProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [faq]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    
    if (!answer.trim()) {
      toast.error('Please enter an answer');
      return;
    }
    
    setIsLoading(true);
    
    const result = faq 
      ? await updateFAQ(faq.id, { question: question.trim(), answer: answer.trim() })
      : await createFAQ({ question: question.trim(), answer: answer.trim(), order: 0, isActive: true });
    
    if (result.status === 'success') {
      toast.success(faq ? 'FAQ updated successfully' : 'FAQ created successfully');
      onSuccess();
      onClose();
    } else {
      toast.error(result.message || 'Something went wrong');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] backdrop-blur-sm">
      <div className="bg-white rounded-xl w-[500px] max-w-[90vw] shadow-xl flex flex-col">
        <div className="px-6 py-6 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#121F37]">
            {faq ? 'Edit FAQ' : 'Add New FAQ'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors duration-200 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#121F37]">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
              placeholder="e.g. How often should I service my AC?"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#121F37]">
              Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
              rows={5}
              placeholder="Provide a clear, helpful answer..."
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#121F37] hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-lg bg-[#E07B3F] px-4 py-2 text-sm font-medium text-white hover:bg-[#d66b2f] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (faq ? 'Updating...' : 'Adding...') : (faq ? 'Update FAQ' : 'Add FAQ')}
          </button>
        </div>
      </div>
    </div>
  );
}