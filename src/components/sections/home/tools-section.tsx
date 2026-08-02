"use client";

import { motion } from "framer-motion";
import {
  Film,
  Sparkles,
  AudioLines,
  Image as ImageIcon,
  PenTool,
  LayoutGrid,
} from "lucide-react";

const tools = [
  { name: "Premiere Pro", icon: Film },
  { name: "After Effects", icon: Sparkles },
  { name: "Adobe Audition", icon: AudioLines },
  { name: "Photoshop", icon: ImageIcon },
  { name: "Illustrator", icon: PenTool },
  { name: "InDesign", icon: LayoutGrid },
];

const ToolsSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 w-fit mx-auto px-4 py-1.5 mb-5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono uppercase tracking-widest text-primary"
          >
            Toolkit
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
          >
            Software I <span className="text-primary">Work With.</span>
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-primary/25 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <Icon className="size-4 text-primary" />
                <span className="text-sm font-semibold">{tool.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
