'use client';

import { useState } from 'react';

import {
  Edit,
  Trash2,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import AddFaqModal from '@/components/dashboard/AddFaqModal';

const initialFaqs = [
  {
    id: 1,
    question: 'How often should I have my HVAC system serviced?',
    answer:
      'It is recommended to have your HVAC system serviced at least once a year, preferably in the spring for cooling and fall for heating.',
    category: null,
  },
  {
    id: 2,
    question: 'What are the signs that I need a new air conditioner?',
    answer:
      'Signs include frequent breakdowns, rising energy bills, uneven cooling, and if your system is over 10-15 years old.',
    category: null,
  },
  {
    id: 3,
    question: 'How often should I change my air filters?',
    answer:
      'Air filters should be changed every 1-3 months depending on usage, pets, and indoor air quality needs.',
    category: 'General',
  },
  {
    id: 4,
    question: 'Do you offer emergency repair services?',
    answer:
      'Yes, we offer 24/7 emergency HVAC repair services for all our customers.',
    category: 'Repairs',
  },
];

export default function FaqManagement() {
  const [faqs] = useState(initialFaqs);

  const [openId, setOpenId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--color-text-main)">
            FAQ Management
          </h1>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Manage frequently asked questions displayed on your website.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-(--color-primary) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Add New FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`
                overflow-hidden rounded-xl border bg-white transition-all duration-300
                ${
                  isOpen
                    ? 'border-(--color-primary) shadow-md'
                    : 'border-(--color-border)'
                }
              `}
            >
              {/* Header */}
              <div
                onClick={() => toggleFaq(faq.id)}
                className="flex cursor-pointer items-center justify-between px-6 py-5"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <GripVertical
                    size={16}
                    className="cursor-grab text-(--color-text-muted)"
                  />

                  <span className="text-[15px] font-medium text-(--color-text-main)">
                    {faq.question}
                  </span>

                  {faq.category && (
                    <span className="rounded-full border border-(--color-border) bg-(--color-bg) px-2 py-1 text-[11px] font-semibold text-(--color-text-muted)">
                      {faq.category}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-4"
                >
                  <button className="text-(--color-text-muted) transition hover:text-(--color-primary)">
                    <Edit size={16} />
                  </button>

                  <button className="text-red-500 transition hover:opacity-80">
                    <Trash2 size={16} />
                  </button>

                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="text-(--color-text-muted) transition hover:text-(--color-primary)"
                  >
                    {isOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Answer */}
              {isOpen && (
                <div className="mt-3 border-t border-(--color-border) px-6 pb-6 pt-5 pl-12">
                  <p className="text-sm leading-7 text-(--color-text-muted)">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AddFaqModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}