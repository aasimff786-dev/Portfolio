"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Site-wide red accent — same literal value in both light & dark mode
// (see globals.css --primary), so it's safe to reference directly here
// for the glow/clip-path layers that plain Tailwind utilities can't reach.
const primaryGlow = "oklch(59.71% 0.23 23.86 / 0.35)";

const AboutScrollSection = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { once: true, amount: 0.4 });

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      <div
        ref={sceneRef}
        className="relative mx-auto flex h-[340px] max-w-4xl items-center justify-center px-6 sm:h-[420px]"
      >
        {/* Center glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${primaryGlow}, transparent 60%)`,
          }}
        />

        {/* Shutter blades — pull open to reveal the section behind them */}
        <motion.div
          initial={{ x: "0%" }}
          animate={isInView ? { x: "-18%" } : {}}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
          className="absolute inset-y-0 left-0 w-1/2 bg-background"
          style={{
            clipPath: "polygon(0 0, 100% 0, 45% 50%, 100% 100%, 0 100%)",
          }}
        />
        <motion.div
          initial={{ x: "0%" }}
          animate={isInView ? { x: "18%" } : {}}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
          className="absolute inset-y-0 right-0 w-1/2 bg-background"
          style={{
            clipPath: "polygon(100% 0, 0 0, 55% 50%, 0 100%, 100% 100%)",
          }}
        />

        {/* Center badge — appears first, before the blades open */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex items-center gap-3.5"
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary">
            <span className="absolute h-2 w-2 animate-pulse rounded-full bg-primary" />
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-foreground">
            About Me
          </span>
        </motion.div>
      </div>

      {/* Bio card — revealed once the blades finish opening */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="container relative mx-auto mt-4 max-w-xl px-6"
      >
        <div className="relative p-8 sm:p-10">
          <div className="absolute left-0 top-0 h-8 w-8 border-l border-t border-primary/60" />
          <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-primary/60" />
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-primary/60" />
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-primary/60" />

          <h2 className="mb-5 text-center text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            I&apos;d rather let the{" "}
            <span className="font-normal italic text-primary">work</span> do
            the talking.
          </h2>

          <p className="mx-auto mb-6 max-w-md text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            I help brands, businesses, and creators stand out with
            high-quality video editing, motion graphics, and graphic design —
            crafted with creativity, precision, and attention to detail.
          </p>

          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {[
              "CREATIVE DIRECTION",
              "MOTION",
              "ANIMATION",
              "EDIT",
              "GRAPHIC DESIGNING",
            ].map((discipline, i) => (
              <span
                key={discipline}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                {i !== 0 && (
                  <span className="h-1 w-1 rounded-full bg-primary" />
                )}
                {discipline}
              </span>
            ))}
          </div>

          <p className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground">
              Happy to collaborate
            </span>{" "}
            <span className="text-primary">✦</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutScrollSection;
