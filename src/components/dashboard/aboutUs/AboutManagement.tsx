'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { updateAboutUsStory } from '@/actions/aboutUs.actions';
import { AboutUsStory, Card } from '@/types/aboutUs';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

interface AboutManagementProps {
  initialData: AboutUsStory;
}

export default function AboutManagement({ initialData }: AboutManagementProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialData.title || '');
  const [subtitle, setSubtitle] = useState(initialData.subtitle || '');
  const [storyTitle, setStoryTitle] = useState(initialData.storyTitle || '');
  const [storySubtitle, setStorySubtitle] = useState(initialData.storySubtitle || '');
  const [cards, setCards] = useState<Card[]>(initialData.cards || []);

  const handleAddCard = () => {
    if (cards.length >= 3) {
      toast.error('Maximum 3 cards allowed');
      return;
    }
    setCards([...cards, { cardTitle: '', cardSubtitle: '' }]);
  };

  const handleRemoveCard = (index: number) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleCardChange = (index: number, field: keyof Card, value: string) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!storyTitle.trim()) {
      toast.error('Please enter a story title');
      return;
    }
    
    if (cards.length === 0) {
      toast.error('Please add at least one card');
      return;
    }
    
    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].cardTitle.trim()) {
        toast.error(`Card ${i + 1}: Please enter a title`);
        return;
      }
      if (!cards[i].cardSubtitle.trim()) {
        toast.error(`Card ${i + 1}: Please enter a subtitle`);
        return;
      }
    }
    
    setIsLoading(true);
    
    const result = await updateAboutUsStory({
      title: title.trim(),
      subtitle: subtitle.trim(),
      storyTitle: storyTitle.trim(),
      storySubtitle: storySubtitle.trim(),
      cards: cards,
    });
    
    if (result.status === 'success') {
      toast.success('About Us content updated successfully');
      router.refresh();
    } else {
      toast.error(result.message || 'Failed to update about us content');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#121F37]">About Us Content</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the content on your company&apos;s About page.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#E07B3F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d66b2f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {isLoading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Main Content Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
          <h2 className="text-base font-semibold text-[#121F37]">Main Content</h2>
        </div>

        <div className="flex flex-col gap-6 p-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#121F37]">Main Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ABOUT US"
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#121F37]">Subtitle (Hero Text)</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Local service with honest recommendations and real homeowner trust."
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
            />
          </div>
        </div>
      </div>

      {/* Story Section Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
          <h2 className="text-base font-semibold text-[#121F37]">Story Section</h2>
        </div>

        <div className="flex flex-col gap-6 p-6">
          {/* Story Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#121F37]">Story Title</label>
            <input
              type="text"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="e.g. OUR STORY"
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
            />
          </div>

          {/* Story Subtitle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#121F37]">Story Subtitle</label>
            <input
              type="text"
              value={storySubtitle}
              onChange={(e) => setStorySubtitle(e.target.value)}
              placeholder="e.g. Fast, fair HVAC service built for Joliet Area homeowners."
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
            />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#121F37]">Cards Section (Max 3)</h2>
          <button
            onClick={handleAddCard}
            disabled={cards.length >= 3}
            className="inline-flex items-center gap-2 rounded-lg bg-[#E07B3F] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#d66b2f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add Card
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          {cards.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No cards added. Click "Add Card" to create one.
            </div>
          ) : (
            cards.map((card, index) => (
              <div
                key={index}
                className="relative rounded-lg border border-gray-200 bg-gray-50 p-6"
              >
                <div className="absolute left-3 top-3 cursor-grab text-gray-400">
                  <GripVertical size={20} />
                </div>
                
                <button
                  onClick={() => handleRemoveCard(index)}
                  className="absolute right-3 top-3 text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>

                <div className="space-y-4 pl-8 pr-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#121F37]">
                      Card Title {index + 1}
                    </label>
                    <input
                      type="text"
                      value={card.cardTitle}
                      onChange={(e) => handleCardChange(index, 'cardTitle', e.target.value)}
                      placeholder="e.g. LOCAL FAMILY-OWNED"
                      className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#121F37]">
                      Card Subtitle {index + 1}
                    </label>
                    <textarea
                      value={card.cardSubtitle}
                      onChange={(e) => handleCardChange(index, 'cardSubtitle', e.target.value)}
                      placeholder="e.g. We live and work in the area, not a national call center. Every job gets personal attention."
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}