"use client";

import { motion } from "framer-motion";
import { Film, Sparkles, Palette, SlidersHorizontal } from "lucide-react";

const WHATSAPP_NUMBER = "917861888848";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    description:
      "Reels, YouTube videos, brand films & corporate explainers — cut clean, paced right.",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    description:
      "Animated logos, titles, and explainer visuals that bring static ideas to life.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Posters, social creatives, and branding assets designed to actually get noticed.",
  },
  {
    icon: SlidersHorizontal,
    title: "Color Correction & Grading",
    description:
      "Fixing exposure and white balance, then grading for mood and a consistent look.",
  },
];

const getQuoteHref = (service: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Aasim! I'd like a quote for ${service}.`,
  )}`;

const ServicesSection = () => {
  return (
    <section className="relative w-full bg-background py-24 md:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 w-fit rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary"
          >
            Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-black uppercase tracking-tighter md:text-6xl"
          >
            What I <span className="text-primary">Offer.</span>
          </motion.h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-muted/30 p-7 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </span>
                <div>
                  <h3 className="mb-1.5 text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <a
                  href={getQuoteHref(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-fit items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-transform group-hover:translate-x-1"
                >
                  Get Quote →
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
