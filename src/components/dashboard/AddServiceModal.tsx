import { X, Image as ImageIcon } from 'lucide-react';

export default function AddServiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] backdrop-blur-sm">
      <div className="bg-(--color-surface) rounded-[var(--radius-lg)] w-[500px] max-w-[90vw] shadow-[var(--shadow-lg)] flex flex-col">
        <div className="px-6 py-6 flex items-center justify-between border-b border-(--color-border)">
          <h2 className="text-xl font-semibold">Add New Service</h2>
          <button className="text-(--color-text-muted) transition-colors duration-200 hover:text-(--color-text-main)" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text-main)">Service Image</label>
            <div className="border border-dashed border-(--color-border) rounded-[var(--radius-md)] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#fafafa] transition-colors duration-200 hover:border-(--color-primary)">
              <ImageIcon size={48} color="var(--color-text-muted)" />
              <p className="text-sm text-(--color-text-muted)"><span className="text-(--color-primary) font-medium">Upload a file</span> or drag and drop</p>
              <p className="text-xs text-(--color-text-muted)">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-(--color-text-main)">Service Title</label>
              <input type="text" className="w-full rounded-lg border border-(--color-border) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20" placeholder="e.g. AC Installation" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-(--color-text-main)">Category</label>
              <input type="text" className="w-full rounded-lg border border-(--color-border) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text-main)">Short Description</label>
            <input type="text" className="w-full rounded-lg border border-(--color-border) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20" placeholder="Brief summary for the card view" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text-main)">Full Description</label>
            <textarea className="w-full rounded-lg border border-(--color-border) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20" placeholder="Detailed description of the service..." rows={4}></textarea>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-(--color-border) flex justify-end gap-3 bg-[#fafafa] rounded-b-[var(--radius-lg)]">
          <button className="rounded-lg border border-(--color-border) px-4 py-2 text-sm font-medium text-(--color-text-main) hover:bg-(--color-bg)" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-lg bg-(--color-primary) px-4 py-2 text-sm font-medium text-white">
            Create Service
          </button>
        </div>
      </div>
    </div>
  );
}
