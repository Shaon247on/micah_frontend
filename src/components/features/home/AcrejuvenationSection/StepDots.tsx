import { cn } from "@/lib/utils";

interface StepDotsProps {
  total: number;
  current: number;
  className?: string;
}

export function StepDots({ total, current, className }: StepDotsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors duration-300",
            i < current ? "bg-[#DE7B42]" : "bg-[#D7DCE5]"
          )}
        />
      ))}
    </div>
  );
}