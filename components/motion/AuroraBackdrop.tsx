"use client";

import { useEffect, useState } from "react";

/**
 * Hero backdrop.
 *
 * Two modes. `video` plays our own looping cloud MP4; the default rebuilds a
 * similar look from layered radial gradients that drift against each other.
 * Either way a grain overlay sits on top — it also masks any banding in the
 * video's smooth gradients.
 *
 * The video is opt-in per mount and never renders on the server: it starts
 * only after hydration, and only when the visitor hasn't asked for reduced
 * motion. Until then (and always, behind the video) `.aurora`'s own gradient
 * background shows through, so there's no flash and no poster frame needed.
 */
export function AuroraBackdrop({ video = false }: { video?: boolean }) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlayVideo(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [video]);

  return (
    <div className="aurora" aria-hidden="true">
      {playVideo ? (
        <video
          className="aurora__video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src="/videos/hero-video-1080.mp4" type="video/mp4" />
        </video>
      ) : (
        <>
          <span className="aurora__blob aurora__blob--1" />
          <span className="aurora__blob aurora__blob--2" />
          <span className="aurora__blob aurora__blob--3" />
          <span className="aurora__blob aurora__blob--4" />
        </>
      )}
      <span className="aurora__grain u-noise" />
      <span className="aurora__fade" />
    </div>
  );
}
