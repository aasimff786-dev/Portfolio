"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Video phase = pinned scroll distance while the background video plays
// naturally (no scrubbing). Text phase = the bio card reveal afterwards.
const VIDEO_PHASE = 3;
const TEXT_PHASE = 2;

// oklch(59.71% 0.23 23.86) ≈ #c93a2a — site-wide red accent
const redColor = "oklch(59.71% 0.23 23.86)";

const AboutScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinWrapperRef.current || !textRef.current)
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

      // Scroll hint — stays visible for the first bit of the video phase,
      // then fades out well before the text card starts revealing.
      const scrollHint =
        pinWrapperRef.current.querySelector<HTMLElement>("[data-scroll-hint]");

      if (scrollHint) {
        tl.to(
          scrollHint,
          { opacity: 0, ease: "none", duration: VIDEO_PHASE * 0.5 },
          0,
        );
      }

      // Phase 2 — progressively reveal the about card once the video phase ends
      const overlay = textRef.current.querySelector<HTMLElement>(
        "[data-reveal-overlay]",
      );

      if (overlay) {
        tl.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: TEXT_PHASE / 2 },
          VIDEO_PHASE,
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
        VIDEO_PHASE,
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${(VIDEO_PHASE + TEXT_PHASE) * 100}vh` }}
    >
      {/* Pinned container — holds both the background video and text overlay */}
      <div
        ref={pinWrapperRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        {/* Smooth looping background video — no scrubbing, just plays */}
        <video
          src="/about-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Subtle grade so the video doesn't feel too raw/bright */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Scroll hint — nudges the user to keep scrolling */}
        <div
          data-scroll-hint
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 md:inset-y-auto md:bottom-10 md:justify-start"
        >
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Scroll to continue
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

        {/* Creative about card — revealed once the video phase ends */}
        <div ref={textRef} className="pointer-events-none absolute inset-0">
          {/* Readability gradient over the video */}
          <div
            data-reveal-overlay
            className="absolute inset-0 bg-linear-to-r from-black/80 via-black/35 to-transparent opacity-0"
          />

          <div className="absolute inset-y-0 left-0 flex w-full flex-col justify-center px-6 sm:w-[55%] sm:px-14 lg:px-20">
            <div className="relative max-w-xl p-8 sm:p-10">
              {/* Corner brackets */}
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
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: redColor,
                }}
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

              {/* Accent divider */}
              <div
                data-reveal-line
                className="mb-6 h-px w-24 opacity-0"
                style={{
                  backgroundImage: `linear-gradient(to right, ${redColor}, transparent)`,
                }}
              />

              {/* Discipline chips */}
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
