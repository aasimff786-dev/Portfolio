"use client";

import { useRef, useState, useCallback } from "react";

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

/** Renders an image, raw video, or background Vimeo embed — all full-bleed cover. */
function MediaLayer({
  vimeoId,
  video,
  image,
  label,
}: {
  vimeoId?: string;
  video?: string;
  image: string;
  label: string;
}) {
  if (vimeoId) {
    return (
      <iframe
        src={vimeoEmbedSrc(vimeoId)}
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
        title={label}
      />
    );
  }
  if (video) {
    return (
      <video
        src={video}
        poster={image}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={label}
      className="absolute inset-0 w-full h-full object-cover"
      draggable={false}
    />
  );
}

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
          <MediaLayer
            vimeoId={afterVimeoId}
            video={afterVideo}
            image={afterSrc}
            label={afterLabel}
          />
        </div>

        {/* BEFORE — identical full-bleed layer, masked via clip-path so it
            never resizes/re-centers itself as the slider moves. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <MediaLayer
            vimeoId={beforeVimeoId}
            video={beforeVideo}
            image={beforeSrc}
            label={beforeLabel}
          />
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
