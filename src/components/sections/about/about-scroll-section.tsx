"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Animation phase = pinned scroll distance while the timeline builds itself.
// Text phase = the bio card reveal afterwards.
const ANIM_PHASE = 3;
const TEXT_PHASE = 2;

const redColor = "oklch(59.71% 0.23 23.86)"; // site-wide red accent

// A row of "clip" segments — mimics an edit timeline in editing software.
// Each row has a different number/width of clips + a color, so the whole
// thing reads as a believable multi-track timeline once assembled.
const TRACKS = [
  { clips: [22, 14, 30, 10, 18], tone: "primary" as const },
  { clips: [14, 28, 12, 24, 16], tone: "muted" as const },
  { clips: [30, 10, 20, 14, 20], tone: "primary" as const },
  { clips: [12, 22, 16, 26, 10], tone: "muted" as const },
];

// Deterministic pseudo-random waveform heights (stable across renders/SSR).
const WAVEFORM = Array.from({ length: 48 }, (_, i) => {
  const v = Math.sin(i * 0.7) * 0.5 + Math.sin(i * 1.9) * 0.3 + 0.5;
  return Math.round(Math.min(1, Math.max(0.12, Math.abs(v))) * 100);
});

const AboutScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinWrapperRef.current ||
        !sceneRef.current ||
        !textRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinWrapperRef.current,
          scrub: 0.5,
        },
      });

      // Clip bars grow in, staggered row by row / clip by clip.
      const clips =
        sceneRef.current.querySelectorAll<HTMLElement>("[data-clip]");
      tl.fromTo(
        clips,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          duration: ANIM_PHASE * 0.85,
          stagger: (ANIM_PHASE * 0.85) / (clips.length * 1.4),
        },
        0,
      );

      // Waveform bars pulse in.
      const wave =
        sceneRef.current.querySelectorAll<HTMLElement>("[data-wave]");
      tl.fromTo(
        wave,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          duration: ANIM_PHASE * 0.7,
          stagger: (ANIM_PHASE * 0.7) / (wave.length * 1.2),
        },
        ANIM_PHASE * 0.15,
      );

      // Playhead sweeps left → right across the whole animation phase, with a
      // ticking timecode readout for a bit of editing-software authenticity.
      if (playheadRef.current) {
        tl.fromTo(
          playheadRef.current,
          { left: "0%" },
          {
            left: "100%",
            ease: "none",
            duration: ANIM_PHASE,
            onUpdate: function () {
              if (!timecodeRef.current) return;
              const progress = this.progress();
              const totalFrames = Math.round(progress * 9 * 30); // ~9s @30fps
              const s = Math.floor(totalFrames / 30);
              const f = totalFrames % 30;
              timecodeRef.current.textContent = `00:0${s}:${String(
                f,
              ).padStart(2, "0")}`;
            },
          },
          0,
        );
      }

      // Scroll hint — fades out early in the animation phase.
      const scrollHint =
        pinWrapperRef.current.querySelector<HTMLElement>("[data-scroll-hint]");
      if (scrollHint) {
        tl.to(
          scrollHint,
          { opacity: 0, ease: "none", duration: ANIM_PHASE * 0.4 },
          0,
        );
      }

      // Whole scene fades/scales back slightly as we move into the text phase.
      tl.to(
        sceneRef.current,
        { opacity: 0.25, scale: 0.97, ease: "power1.inOut", duration: 0.6 },
        ANIM_PHASE - 0.3,
      );

      // Bio card reveal.
      const overlay = textRef.current.querySelector<HTMLElement>(
        "[data-reveal-overlay]",
      );
      if (overlay) {
        tl.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: TEXT_PHASE / 2 },
          ANIM_PHASE,
        );
      }

      const textLines =
        textRef.current.querySelectorAll<HTMLElement>("[data-reveal-line]");
      tl.fromTo(
        textLines.length ? textLines : textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: TEXT_PHASE,
          stagger: textLines.length ? TEXT_PHASE / (textLines.length * 2) : 0,
        },
        ANIM_PHASE,
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${(ANIM_PHASE + TEXT_PHASE) * 100}vh` }}
    >
      <div
        ref={pinWrapperRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        {/* Faint dot-grid backdrop */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* ── Animated "editing timeline" scene ── */}
        <div
          ref={sceneRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 sm:px-12"
        >
          {/* Timecode readout */}
          <div
            className="font-mono text-xs tracking-widest text-white/40 sm:text-sm"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span ref={timecodeRef}>00:00:00</span>
            <span className="mx-2 text-white/20">/</span>
            <span>00:09:00</span>
          </div>

          {/* Timeline tracks */}
          <div className="relative w-full max-w-3xl">
            {/* Playhead */}
            <div
              ref={playheadRef}
              className="absolute -top-2 bottom-0 z-10 w-px"
              style={{ backgroundColor: redColor, left: 0 }}
            >
              <div
                className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45"
                style={{ backgroundColor: redColor }}
              />
            </div>

            <div className="flex flex-col gap-2.5 sm:gap-3">
              {TRACKS.map((track, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex h-6 items-center gap-1.5 sm:h-8 sm:gap-2"
                >
                  {track.clips.map((width, clipIndex) => (
                    <div
                      key={clipIndex}
                      data-clip
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
              <div
                key={i}
                data-wave
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
        </div>

        {/* Scroll hint */}
        <div
          data-scroll-hint
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 md:inset-y-auto md:bottom-10 md:justify-start"
        >
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Scroll to play
          </span>
          <span
            className="flex h-9 w-5.5 items-start justify-center rounded-full border pt-2"
            style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
          >
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full"
              style={{ backgroundColor: redColor }}
            />
          </span>
        </div>

        {/* Creative about card — revealed once the timeline finishes building */}
        <div ref={textRef} className="pointer-events-none absolute inset-0">
          <div
            data-reveal-overlay
            className="absolute inset-0 bg-linear-to-r from-black/85 via-black/40 to-transparent opacity-0"
          />

          <div className="absolute inset-y-0 left-0 flex w-full flex-col justify-center px-6 sm:w-[55%] sm:px-14 lg:px-20">
            <div className="relative max-w-xl p-8 sm:p-10">
              <div
                data-reveal-line
                className="absolute left-0 top-0 h-8 w-8 border-l border-t opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />
              <div
                data-reveal-line
                className="absolute right-0 top-0 h-8 w-8 border-r border-t opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />
              <div
                data-reveal-line
                className="absolute bottom-0 left-0 h-8 w-8 border-b border-l opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />
              <div
                data-reveal-line
                className="absolute bottom-0 right-0 h-8 w-8 border-b border-r opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />

              <p
                data-reveal-line
                className="mb-5 text-[10px] uppercase tracking-[0.3em] opacity-0 md:text-xs"
                style={{ fontFamily: "'DM Mono', monospace", color: redColor }}
              >
                ✦ About Me ✦
              </p>

              <h2
                data-reveal-line
                className="mb-5 text-3xl font-bold leading-[1.08] text-white opacity-0 sm:text-4xl lg:text-5xl"
              >
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

              <p
                data-reveal-line
                className="mb-6 max-w-md text-sm leading-relaxed text-white/60 opacity-0 sm:text-base"
              >
                I help brands, businesses, and creators stand out with
                high-quality video editing, motion graphics, and graphic
                design — crafted with creativity, precision, and attention to
                detail.
              </p>

              <div
                data-reveal-line
                className="mb-6 h-px w-24 opacity-0"
                style={{
                  backgroundImage: `linear-gradient(to right, ${redColor}, transparent)`,
                }}
              />

              <div
                data-reveal-line
                className="mb-8 flex flex-wrap items-center gap-3 opacity-0"
              >
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

              <p data-reveal-line className="opacity-0">
                <span
                  className="text-xs uppercase tracking-[0.25em] text-white"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Happy to collaborate
                </span>{" "}
                <span style={{ color: redColor }}>✦</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScrollSection;
