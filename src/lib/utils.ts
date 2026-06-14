import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatDate(date: Date | "asap" | null): string {
  if (!date) return "";
  if (date === "asap") return "Today";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
 
export function formatDateShort(date: Date | "asap" | null): string {
  if (!date) return "";
  if (date === "asap") return "As soon as possible – today";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}