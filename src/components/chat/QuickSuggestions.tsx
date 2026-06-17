'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuickSuggestionsProps {
  onSelect: (message: string) => void;
  className?: string;
}

const suggestions = [
  { label: 'What services do you offer?', message: 'What services do you offer?' },
  { label: 'How to schedule a repair?', message: 'How can I schedule an appointment?' },
  { label: 'AC not cooling?', message: 'My AC is not cooling properly. What should I do?' },
  { label: 'Emergency service', message: 'Do you offer emergency service?' },
  { label: 'Pricing info', message: 'What are your service prices?' },
  { label: 'Service area', message: 'What areas do you serve?' },
];

export function QuickSuggestions({ onSelect, className }: QuickSuggestionsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2 px-4 py-3 border-t border-gray-100', className)}>
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(suggestion.message)}
          className="px-3 py-1.5 text-xs font-medium text-[#121F37] bg-gray-50 hover:bg-[#FFF4EC] border border-gray-200 hover:border-[#E07B3F] rounded-full transition-all duration-200 whitespace-nowrap"
        >
          {suggestion.label}
        </motion.button>
      ))}
    </div>
  );
}