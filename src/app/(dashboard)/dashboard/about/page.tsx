'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Save } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

export default function AboutManagement() {
  const [description, setDescription] = useState(
    'At CoolAir HVAC, we believe that everyone deserves a comfortable indoor environment. Founded over two decades ago, our family-owned business has grown from a single truck operation to a full fleet of certified technicians. We pride ourselves on honest pricing, exceptional workmanship, and a commitment to customer satisfaction that sets us apart in the industry.'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--color-text-main)">
            About Us Content
          </h1>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Manage the content on your company&apos;s About page.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-md bg-(--color-primary) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
          <Save size={18} />
          Save All Changes
        </button>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)">
        {/* Card Header */}
        <div className="border-b border-(--color-border) bg-(--color-surface) px-6 py-5">
          <h2 className="text-base font-semibold text-(--color-text-main)">
            Main Content
          </h2>
        </div>

        {/* Card Body */}
        <div className="flex flex-col gap-6 p-6">
          {/* Main Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-(--color-text-main)">
              Main Title
            </label>

            <input
              type="text"
              placeholder="e.g. Your Comfort, Our Priority"
              className="h-11 w-full rounded-md border border-(--color-border) bg-white px-4 text-sm outline-none transition focus:border-(--color-primary)"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-(--color-text-main)">
              Subtitle
            </label>

            <input
              type="text"
              placeholder="e.g. Providing top-tier HVAC services since 1998."
              className="h-11 w-full rounded-md border border-(--color-border) bg-white px-4 text-sm outline-none transition focus:border-(--color-primary)"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-(--color-text-main)">
              Description (Rich Text)
            </label>

            <div className="overflow-hidden rounded-md border border-(--color-border) bg-(--color-surface)">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="custom-quill"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quill Custom Styling */}
      <style jsx global>{`
        .custom-quill .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid var(--color-border) !important;
          background-color: #fafafa;
          padding: 8px 12px !important;
        }

        .custom-quill .ql-container {
          border: none !important;
          min-height: 250px;
          font-family: inherit !important;
          font-size: 14px !important;
        }

        .custom-quill .ql-editor {
          padding: 16px 20px !important;
          line-height: 1.6;
          color: var(--color-text-main);
        }

        .custom-quill .ql-editor.ql-blank::before {
          color: var(--color-text-muted);
          font-style: normal;
          left: 20px;
        }

        .custom-quill .ql-snow .ql-stroke {
          stroke: var(--color-text-muted);
        }

        .custom-quill .ql-snow .ql-fill {
          fill: var(--color-text-muted);
        }

        .custom-quill .ql-snow.ql-toolbar button:hover .ql-stroke,
        .custom-quill .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: var(--color-primary);
        }

        .custom-quill .ql-snow.ql-toolbar button:hover .ql-fill,
        .custom-quill .ql-snow.ql-toolbar button.ql-active .ql-fill {
          fill: var(--color-primary);
        }
      `}</style>
    </div>
  );
}