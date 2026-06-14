'use client';

import { X } from 'lucide-react';

interface AddFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFaqModal({ isOpen, onClose }: AddFaqModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] backdrop-blur-sm">
      <div className="bg-(--color-surface) rounded-[var(--radius-lg)] w-[500px] max-w-[90vw] shadow-[var(--shadow-lg)] flex flex-col">
        <div className="px-6 py-6 flex items-center justify-between border-b border-(--color-border)">
          <h2 className="text-xl font-semibold">Add New FAQ</h2>
          <button onClick={onClose} className="text-(--color-text-muted) transition-colors duration-200 hover:text-(--color-text-main)">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text-main)">Question</label>
            <input
              type="text"
              className="w-full rounded-lg border border-(--color-border) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
              placeholder="e.g. How often should I service my AC?"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text-main)">Category</label>
            <input
              type="text"
              className="w-full rounded-lg border border-(--color-border) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text-main)">Answer</label>
            <textarea
              className="w-full rounded-lg border border-(--color-border) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
              rows={5}
              placeholder="Provide a clear, helpful answer..."
            ></textarea>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-(--color-border) flex justify-end gap-3 bg-[#fafafa] rounded-b-[var(--radius-lg)]">
          <button onClick={onClose} className="rounded-lg border border-(--color-border) px-4 py-2 text-sm font-medium text-(--color-text-main) hover:bg-(--color-bg)">
            Cancel
          </button>
          <button className="rounded-lg bg-(--color-primary) px-4 py-2 text-sm font-medium text-white">
            Add FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
