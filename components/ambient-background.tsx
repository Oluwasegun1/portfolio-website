/** AmbientBackground — quiet, GPU-cheap backdrop: two drifting gradient blobs plus a static dot-grid, replacing the previous canvas starfield. Pure CSS animation means it's automatically deprioritized in background tabs and collapses to a single frame under prefers-reduced-motion (see globals.css). */
"use client";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Dot-grid texture */}
      <div className="dot-grid absolute inset-0 opacity-60" />

      {/* Drifting accent blobs */}
      <div className="animate-drift-a absolute -left-1/4 top-[-10%] h-[560px] w-[560px] rounded-full bg-primary/[0.08] blur-[120px]" />
      <div className="animate-drift-b absolute right-[-15%] top-1/3 h-[440px] w-[440px] rounded-full bg-primary/[0.06] blur-[110px]" />
      <div className="absolute bottom-[-15%] left-1/3 h-[380px] w-[380px] rounded-full bg-primary/[0.05] blur-[100px]" />

      {/* Fade to background at the very top and bottom so section seams stay clean */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
