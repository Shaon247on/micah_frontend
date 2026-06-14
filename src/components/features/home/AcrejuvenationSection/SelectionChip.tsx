import { cn } from "@/lib/utils";

interface SelectionChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectionChip({
  label,
  selected,
  onClick,
  className,
}: SelectionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE7B42]/50",
        selected
          ? "border-[#DE7B42] bg-[#FEF0E8] font-bold text-[#DE7B42]"
          : "border-[#D7DCE5] bg-white text-[#121F37] hover:border-[#DE7B42]/50",
        className
      )}
    >
      {label}
    </button>
  );
}