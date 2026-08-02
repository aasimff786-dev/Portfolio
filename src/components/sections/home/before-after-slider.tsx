"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Player from "@vimeo/player";

interface BeforeAfterSliderProps {
  beforeSrc: string; // image or video poster for the "raw" side
  afterSrc: string; // image or video poster for the "corrected/graded" side
  beforeVideo?: string; // optional: mp4/webm url for raw footage
  afterVideo?: string; // optional: mp4/webm url for corrected/graded footage
  beforeVimeoId?: string; // optional: Vimeo video ID for raw footage
  afterVimeoId?: string; // optional: Vimeo video ID for corrected/graded footage
  beforeLabel?: string;
  afterLabel?: string;
}

const vimeoEmbedSrc = (id: string) =>
  `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`;

/** How often (ms) we re-check and correct any drift between the two players. */
const SYNC_INTERVAL_MS = 1500;
/** Only correct drift bigger than this many seconds (avoids constant micro-seeks). */
const DRIFT_TOLERANCE_S = 0.15;

const BeforeAfterSlider = ({
  beforeSrc,
  afterSrc,
  beforeVideo,
  afterVideo,
  beforeVimeoId,
  afterVimeoId,
  beforeLabel = "RAW",
  afterLabel = "CORRECTED",
}: BeforeAfterSliderProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage
  const draggingRef = useRef(false);

  const beforeIframeRef = useRef<HTMLIFrameElement>(null);
  const afterIframeRef = useRef<HTMLIFrameElement>(null);
  const beforePlayerRef = useRef<Player | null>(null);
  const afterPlayerRef = useRef<Player | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  // Wire up both Vimeo players, start them together, and keep them in sync.
  useEffect(() => {
    if (!beforeVimeoId || !afterVimeoId) return;
    if (!beforeIframeRef.current || !afterIframeRef.current) return;

    const beforePlayer = new Player(beforeIframeRef.current);
    const afterPlayer = new Player(afterIframeRef.current);
    beforePlayerRef.current = beforePlayer;
    afterPlayerRef.current = afterPlayer;

    let cancelled = false;
    let syncTimer: ReturnType<typeof setInterval> | null = null;

    Promise.all([beforePlayer.ready(), afterPlayer.ready()])
      .then(() => {
        if (cancelled) return;
        // Both iframes already autoplay on their own (background=1&autoplay=1).
        // We just periodically correct any drift between them — network or
        // buffering differences can nudge them apart a moment after they start.
        syncTimer = setInterval(async () => {
          try {
            const [beforeTime, afterTime, beforePaused, afterPaused] =
              await Promise.all([
                beforePlayer.getCurrentTime(),
                afterPlayer.getCurrentTime(),
                beforePlayer.getPaused(),
                afterPlayer.getPaused(),
              ]);

            // If either got paused (e.g. tab was backgrounded), nudge both to play.
            if (beforePaused) beforePlayer.play().catch(() => {});
            if (afterPaused) afterPlayer.play().catch(() => {});

            const drift = afterTime - beforeTime;
            if (Math.abs(drift) > DRIFT_TOLERANCE_S) {
              await beforePlayer.setCurrentTime(afterTime);
            }
          } catch {
            // Player may be mid-teardown — safe to ignore.
          }
        }, SYNC_INTERVAL_MS);
      })
      .catch(() => {
        // Player can fail to load — the poster image fallback is still
        // visible, so we just no-op here.
      });

    return () => {
      cancelled = true;
      if (syncTimer) clearInterval(syncTimer);
      beforePlayerRef.current = null;
      afterPlayerRef.current = null;
    };
  }, [beforeVimeoId, afterVimeoId]);

  return (
    <div className="w-full">
      <div
        ref={wrapRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted select-none touch-none cursor-ew-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* AFTER — full-bleed base layer, same size/position always */}
        <div className="absolute inset-0">
          {afterVimeoId ? (
            <iframe
              ref={afterIframeRef}
              src={vimeoEmbedSrc(afterVimeoId)}
              loading="lazy"
              className="pointer-events-none"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100%, 177.78vh)",
                height: "max(100%, 56.25vw)",
                transform: "translate(-50%, -50%)",
                border: 0,
              }}
              allow="autoplay; fullscreen"
              title={afterLabel}
            />
          ) : afterVideo ? (
            <video
              src={afterVideo}
              poster={afterSrc}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={afterSrc}
              alt={afterLabel}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          )}
        </div>

        {/* BEFORE — identical full-bleed layer, masked via clip-path so it
            never resizes/re-centers itself as the slider moves. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {beforeVimeoId ? (
            <iframe
              ref={beforeIframeRef}
              src={vimeoEmbedSrc(beforeVimeoId)}
              loading="lazy"
              className="pointer-events-none"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100%, 177.78vh)",
                height: "max(100%, 56.25vw)",
                transform: "translate(-50%, -50%)",
                border: 0,
              }}
              allow="autoplay; fullscreen"
              title={beforeLabel}
            />
          ) : beforeVideo ? (
            <video
              src={beforeVideo}
              poster={beforeSrc}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={beforeSrc}
              alt={beforeLabel}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          )}
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white px-2.5 py-1 rounded-full pointer-events-none">
          {beforeLabel}
        </span>
        <span className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/80 text-white px-2.5 py-1 rounded-full pointer-events-none">
          {afterLabel}
        </span>

        {/* Divider + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-primary text-xs font-bold gap-0.5">
            <span>◀</span>
            <span>▶</span>
          </div>
        </div>
      </div>

      {/* Range input for accessibility & mobile */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Before after slider"
        className="w-full mt-3 accent-primary cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>← {beforeLabel === "RAW" ? "Raw footage" : beforeLabel}</span>
        <span>{afterLabel === "CORRECTED" ? "Corrected" : afterLabel} →</span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
