"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface CreditPlan {
  percentage: string;
  duration: string;
  description: string;
  highlighted?: boolean;
}

const PLANS: CreditPlan[] = [
  {
    percentage: "50%",
    duration: "3-Year Plan",
    description:
      "50% of your Rejuvenation cost applied toward a new system when you upgrade.",
    highlighted: false,
  },
  {
    percentage: "100%",
    duration: "5-Year Plan",
    description:
      "Full Rejuvenation cost back as credit toward a new system when you upgrade.",
    highlighted: true,
  },
];

export function CreditCard() {
  // Promotional credit section intentionally removed per client request.
  // Keep a spacer card to preserve layout spacing.
  return (
    <Card className="overflow-hidden rounded-[20px] border-0 bg-(--primary) p-6 min-h-[120px]" aria-hidden>
      <div className="sr-only">Promotional credit removed</div>
    </Card>
  );
}