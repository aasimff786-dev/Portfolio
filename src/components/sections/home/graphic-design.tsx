"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// Swap these placeholder images for your own graphic design work.
// Each item needs: src (image url), title, tag (category used for filtering), description.
const graphicDesignWork = [
  {
    src: "/graphic-design/muze-headphones-ad.jpeg",
    title: "Muze Headphones",
    tag: "Ad Design",
    description: "Product ad campaign design",
  },
  {
    src: "/graphic-design/green-fashion-poster.jpeg",
    title: "Gen Green",
    tag: "Poster",
    description: "Fashion campaign poster",
  },
  {
    src: "/graphic-design/infographic-template.jpeg",
    title: "Infographic Template",
    tag: "Infographic",
    description: "Data visualization design",
  },
];

const filters = [
  "All",
  ...Array.from(new Set(graphicDesignWork.map((item) => item.tag))),
];

const GraphicDesignSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<
    (typeof graphicDesignWork)[number] | null
  >(null);

  const visibleItems =
    activeFilter === "All"
      ? graphicDesignWork
      : graphicDesignWork.filter((item) => item.tag === activeFilter);

  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 w-fit mx-auto px-4 py-1.5 mb-5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono uppercase tracking-widest text-primary"
          >
            Graphic Design
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
          >
            Beyond the <span className="text-primary">Timeline.</span>
          </motion.h2>
          <p className="text-muted-foreground max-w-md mx-auto mt-4 text-sm md:text-base">
            Posters, social creatives, and brand visuals — where design meets
            motion.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => (
              <motion.button
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightboxItem(item)}
                className="group relative aspect-4/5 rounded-2xl overflow-hidden border border-border bg-muted cursor-pointer text-left"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108 group-hover:brightness-[0.55]"
                />
                <div className="absolute inset-0 flex flex-col justify-end gap-1 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-t from-black/90 via-black/10 to-transparent">
                  <span className="self-start text-[10px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/15 border border-primary/50 px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                  <h3 className="text-white font-bold text-sm mt-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs">{item.description}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-black/90 backdrop-blur-md p-8"
          >
            <button
              onClick={() => setLightboxItem(null)}
              aria-label="Close"
              className="absolute top-6 right-6 text-white/70 hover:text-primary transition-colors cursor-pointer"
            >
              <X className="size-7" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              src={lightboxItem.src}
              alt={lightboxItem.title}
              className="max-w-[90vw] max-h-[75vh] rounded-2xl border border-primary/30 shadow-2xl object-contain"
            />
            <p className="text-white/70 text-sm text-center">
              {lightboxItem.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GraphicDesignSection;
