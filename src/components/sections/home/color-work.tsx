"use client";

import { motion } from "framer-motion";
import BeforeAfterSlider from "./before-after-slider";

// TODO: Replace these placeholder images/videos with your own raw vs
// corrected/graded footage. You can pass beforeVideo/afterVideo (mp4/webm
// urls) for real video comparisons — poster images below are shown until
// then and as a fallback while the video loads.
const colorWork = [
  {
    id: "correction",
    title: "Color Correction",
    tagline: "Drag the slider to see the raw vs corrected footage.",
    context:
      "Corrected for a fashion brand commercial — fixing white balance, exposure & skin tones for a clean, professional look.",
    beforeSrc:
      "https://placehold.co/1280x720/1a1a1a/8a8a8a?text=RAW+FOOTAGE",
    afterSrc:
      "https://placehold.co/1280x720/0284c7/f0f9ff?text=CORRECTED+FOOTAGE",
    beforeLabel: "RAW",
    afterLabel: "CORRECTED",
  },
  {
    id: "grading",
    title: "Color Grading",
    tagline: "Drag the slider to see the transformation.",
    context:
      "Graded for a cinematic short film — adding mood, contrast & a signature look using LUTs and a manual grade in DaVinci Resolve.",
    beforeSrc:
      "https://placehold.co/1280x720/1a1a1a/8a8a8a?text=RAW+FOOTAGE",
    afterSrc:
      "https://placehold.co/1280x720/0ea5e9/07172a?text=GRADED+FOOTAGE",
    beforeLabel: "RAW",
    afterLabel: "GRADED",
  },
];

const ColorWorkSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 w-fit mx-auto px-4 py-1.5 mb-5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono uppercase tracking-widest text-primary"
          >
            Color Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
          >
            Before <span className="text-primary">& After.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-24">
          {colorWork.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-1">
                {item.tagline}
              </p>
              <p className="text-xs text-muted-foreground/70 text-center max-w-lg mx-auto mb-8">
                {item.context}
              </p>
              <BeforeAfterSlider
                beforeSrc={item.beforeSrc}
                afterSrc={item.afterSrc}
                beforeLabel={item.beforeLabel}
                afterLabel={item.afterLabel}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorWorkSection;
