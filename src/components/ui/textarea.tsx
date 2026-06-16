import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-12 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-gray-400",
        "hover:border-[#E07B3F]/50 hover:shadow-md",
        "focus:outline-none focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
