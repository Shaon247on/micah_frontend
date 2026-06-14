"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PhotoGridProps {
  images?: { src: string; alt: string }[];
}

const DEFAULT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
    alt: "HVAC technician inspecting unit",
  },
  {
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
    alt: "HVAC system servicing",
  },
];

export function PhotoGrid({ images = DEFAULT_IMAGES }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 my-6">
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative aspect-4/3 overflow-hidden rounded-[14px] bg-[#C8CEDA]"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 260px"
          />
        </motion.div>
      ))}
    </div>
  );
}