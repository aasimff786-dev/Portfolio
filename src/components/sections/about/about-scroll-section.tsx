"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const redColor = "oklch(59.71% 0.23 23.86)"; // site-wide red accent

// A row of "clip" segments — mimics an edit timeline in editing software.
const TRACKS = [
  { clips: [22, 14, 30, 10, 18], tone: "primary" as const },
  { clips: [14, 28, 12, 24, 16], tone: "muted" as const },
  { clips: [30, 10, 20, 14, 20], tone: "primary" as const },
  { clips: [12, 22, 16, 26, 10], tone: "muted" as const },
];

// Deterministic pseudo-random waveform heights (stable across renders/SSR).
const WAVEFORM = Array.from({ length: 40 }, (_, i) => {
  const v = Math.sin(i * 0.7) * 0.5 + Math.sin(i * 1.9) * 0.3 + 0.5;
  return Math.round(Math.min(1, Math.max(0.12, Math.abs(v))) * 100);
});

const AboutScrollSection = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { once: true, amount: 0.35 });

  // Ticking timecode readout — runs once the scene comes into view.
  const [timecode, setTimecode] = useState("00:00:00");
  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const id = setInterval(() => {
      frame = (frame + 1) % (9 * 30); // loop over ~9s @ 30fps
      const s = Math.floor(frame / 30);
      const f = frame % 30;
      setTimecode(`00:0${s}:${String(f).padStart(2, "0")}`);
    }, 1000 / 30);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <section className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      {/* Faint dot-grid backdrop */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div
        ref={sceneRef}
        className="container relative mx-auto flex flex-col items-center gap-10 px-6"
      >
        {/* Timecode readout */}
        <div
          className="font-mono text-xs tracking-widest text-white/40 sm:text-sm"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <span>{timecode}</span>
          <span className="mx-2 text-white/20">/</span>
          <span>00:09:00</span>
        </div>

        {/* Timeline tracks */}
        <div className="relative w-full max-w-3xl">
          {/* Playhead — sweeps left to right once in view */}
          <motion.div
            initial={{ left: "0%" }}
            animate={isInView ? { left: "100%" } : {}}
            transition={{ duration: 3, ease: "linear", delay: 0.2 }}
            className="absolute -top-2 bottom-0 z-10 w-px"
            style={{ backgroundColor: redColor }}
          >
            <div
              className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45"
              style={{ backgroundColor: redColor }}
            />
          </motion.div>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            {TRACKS.map((track, rowIndex) => (
              <div
                key={rowIndex}
                className="flex h-6 items-center gap-1.5 sm:h-8 sm:gap-2"
              >
                {track.clips.map((width, clipIndex) => (
                  <motion.div
                    key={clipIndex}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.15 + (rowIndex * 5 + clipIndex) * 0.06,
                    }}
                    className="h-full origin-left rounded-sm"
                    style={{
                      width: `${width}%`,
                      maxWidth: 220,
                      backgroundColor:
                        track.tone === "primary"
                          ? "oklch(59.71% 0.23 23.86 / 0.55)"
                          : "rgba(255,255,255,0.12)",
                      border: `1px solid ${
                        track.tone === "primary"
                          ? "oklch(59.71% 0.23 23.86 / 0.8)"
                          : "rgba(255,255,255,0.25)"
                      }`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Audio waveform */}
        <div className="flex h-14 items-end gap-1 sm:h-16">
          {WAVEFORM.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.3 + i * 0.02,
              }}
              className="w-1 origin-bottom rounded-full sm:w-1.5"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i % 5 === 0
                    ? "oklch(59.71% 0.23 23.86 / 0.9)"
                    : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 w-full max-w-xl p-8 sm:p-10"
        >
          <div
            className="absolute left-0 top-0 h-8 w-8 border-l border-t"
            style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
          />
          <div
            className="absolute right-0 top-0 h-8 w-8 border-r border-t"
            style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-8 w-8 border-b border-l"
            style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-8 w-8 border-b border-r"
            style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
          />

          <p
            className="mb-5 text-center text-[10px] uppercase tracking-[0.3em] md:text-xs"
            style={{ fontFamily: "'DM Mono', monospace", color: redColor }}
          >
            ✦ About Me ✦
          </p>

          <h2 className="mb-5 text-center text-3xl font-bold leading-[1.08] text-white sm:text-4xl lg:text-5xl">
            I&apos;d rather let the{" "}
            <span
              className="font-normal italic"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                color: redColor,
              }}
            >
              work
            </span>{" "}
            do the talking.
          </h2>

          <p className="mx-auto mb-6 max-w-md text-center text-sm leading-relaxed text-white/60 sm:text-base">
            I help brands, businesses, and creators stand out with
            high-quality video editing, motion graphics, and graphic design —
            crafted with creativity, precision, and attention to detail.
          </p>

          <div
            className="mx-auto mb-6 h-px w-24"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${redColor}, transparent)`,
            }}
          />

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
                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {i !== 0 && (
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: redColor }}
                  />
                )}
                {discipline}
              </span>
            ))}
          </div>

          <p className="text-center">
            <span
              className="text-xs uppercase tracking-[0.25em] text-white"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Happy to collaborate
            </span>{" "}
            <span style={{ color: redColor }}>✦</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutScrollSection;
