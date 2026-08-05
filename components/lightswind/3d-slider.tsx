"use client";

import React, { useEffect, useRef, CSSProperties } from "react";

// --- Type Definitions ---
export interface SliderItemData {
  title: string;
  num: string;
  imageUrl: string;
  /** LOCAL PATCH — body copy under the title. See createCard. */
  body?: string;
  data?: any;
}

interface ThreeDSliderProps {
  items: SliderItemData[];
  speedWheel?: number;
  speedDrag?: number;
  containerStyle?: CSSProperties;
  className?: string;
  onItemClick?: (item: SliderItemData, index: number) => void;
  /** LOCAL PATCH — see the wheel handler. Off by default. */
  wheelControl?: boolean;
  /**
   * LOCAL PATCH — how far apart the cards fan out. Upstream hard-codes these,
   * and its defaults throw a neighbouring card a card-and-a-half sideways,
   * which reads as six unrelated cards rather than one deck. Values are
   * percentages of card size, spread across however many items there are.
   */
  spreadX?: number;
  spreadY?: number;
  rotation?: number;
  /** LOCAL PATCH — fires whenever the front-most card changes, by any means. */
  onActiveChange?: (index: number) => void;
}

// ─── Pure DOM card renderer (no React re-renders in the hot path) ────────────
function createCard(item: SliderItemData, index: number): HTMLDivElement {
  const card = document.createElement("div");
  card.className =
    "absolute top-1/2 left-1/2 cursor-pointer select-none rounded-2xl shadow-2xl bg-zinc-900 overflow-hidden border border-white/10";
  /* LOCAL PATCH: cards are bigger than upstream's. They now carry a
     paragraph, not just a title, and the original 180px floor left no room
     to read one. */
  card.style.cssText = `
    --w: clamp(230px, 30vw, 320px);
    --h: clamp(310px, 41vw, 430px);
    width: var(--w); height: var(--h);
    margin-top: calc(var(--h) / -2);
    margin-left: calc(var(--w) / -2);
    will-change: transform, opacity;
    contain: layout style paint;
    transition: none;
    display: block;
  `;

  // inner wrapper
  const inner = document.createElement("div");
  inner.style.cssText = "position:absolute;inset:0;z-index:10;";
  inner.dataset.inner = "true";

  /* LOCAL PATCH: the veil is heavier and starts higher than upstream's,
     because a paragraph needs a readable backdrop where a two-word title
     could get by on a text shadow. */
  const grad = document.createElement("div");
  grad.style.cssText =
    "position:absolute;inset:0;z-index:10;background:linear-gradient(to bottom,rgba(11,5,16,.45) 0%,rgba(11,5,16,.12) 32%,rgba(11,5,16,.82) 68%,rgba(11,5,16,.94) 100%);";

  // number
  const num = document.createElement("div");
  num.style.cssText =
    "position:absolute;z-index:20;color:rgba(255,255,255,.9);font-weight:900;top:12px;left:20px;font-size:clamp(28px,6vw,64px);letter-spacing:-0.04em;opacity:.8;";
  num.textContent = item.num;

  /* LOCAL PATCH: title and body share one bottom-anchored block instead of
     the title being pinned on its own, so the paragraph pushes the title up
     rather than overlapping it. */
  const caption = document.createElement("div");
  caption.style.cssText =
    "position:absolute;z-index:20;left:0;right:0;bottom:0;padding:0 18px 18px;";

  const title = document.createElement("div");
  title.style.cssText =
    "color:#fff;font-weight:700;font-size:clamp(17px,2.2vw,22px);line-height:1.2;letter-spacing:-0.02em;text-shadow:0 2px 8px rgba(0,0,0,.5);";
  title.textContent = item.title;
  caption.appendChild(title);

  if (item.body) {
    const body = document.createElement("div");
    body.style.cssText =
      "margin-top:7px;color:rgba(255,255,255,.82);font-weight:400;font-size:clamp(12px,1.15vw,13.5px);line-height:1.45;text-shadow:0 1px 6px rgba(0,0,0,.6);";
    body.textContent = item.body;
    caption.appendChild(body);
  }

  // image
  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = item.title;
  img.loading = index < 3 ? "eager" : "lazy";
  img.decoding = "async";
  img.style.cssText =
    "width:100%;height:100%;object-fit:cover;pointer-events:none;display:block;";

  inner.appendChild(grad);
  inner.appendChild(num);
  inner.appendChild(caption);
  inner.appendChild(img);
  card.appendChild(inner);

  return card;
}

// ─── Main Component ───────────────────────────────────────────────────────────
const ThreeDSlider: React.FC<ThreeDSliderProps> = ({
  items,
  speedWheel = 0.04,
  speedDrag = -0.15,
  containerStyle = {},
  className = "",
  onItemClick,
  wheelControl = false,
  onActiveChange,
  spreadX = 750,
  spreadY = 180,
  rotation = 110,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep callback ref stable without causing re-renders
  const onItemClickRef = useRef(onItemClick);
  useEffect(() => { onItemClickRef.current = onItemClick; }, [onItemClick]);
  const onActiveChangeRef = useRef(onActiveChange);
  useEffect(() => { onActiveChangeRef.current = onActiveChange; }, [onActiveChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    const numItems = items.length;

    // ── State (all in plain refs, zero React state) ──
    let progress = 50;
    let targetProgress = 50;
    let isDown = false;
    let startX = 0;
    let rafId: number | null = null;
    let isAnimating = false;
    let lastActive = -1;

    // ── Build DOM cards ──
    const cards: HTMLDivElement[] = items.map((item, i) => createCard(item, i));
    cards.forEach((card, i) => {
      card.addEventListener("click", () => {
        const denom = numItems > 1 ? numItems - 1 : 1;
        targetProgress = (i / denom) * 100;
        startLoop();
        onItemClickRef.current?.(items[i], i);
      }, { passive: true });
      container.appendChild(card);
    });

    // ── Transform cache to skip identical writes ──
    const cache: { tx: string; ty: string; rot: string; z: string; op: string }[] =
      items.map(() => ({ tx: "", ty: "", rot: "", z: "", op: "" }));

    // ── Core update — pure math, direct DOM writes ──
    function update() {
      // Responsive lerp: fast while dragging, smooth when releasing
      const lerpFactor = isDown ? 1 : 0.1;
      progress += (targetProgress - progress) * lerpFactor;

      const clamped = Math.max(0, Math.min(100, progress));
      const activeFloat = (clamped / 100) * (numItems - 1);
      const denom = numItems > 1 ? numItems - 1 : 1;

      // LOCAL PATCH: report the front-most card. Upstream only exposes
      // onItemClick, so anything rendered alongside the slider had no way to
      // follow a drag or a wheel.
      const nowActive = Math.round(activeFloat);
      if (nowActive !== lastActive) {
        lastActive = nowActive;
        onActiveChangeRef.current?.(nowActive);
      }

      for (let i = 0; i < numItems; i++) {
        const card = cards[i];
        if (!card) continue;

        const ratio = (i - activeFloat) / denom;
        const tx = (ratio * spreadX).toFixed(2);
        const ty = (ratio * spreadY).toFixed(2);
        const rot = (ratio * rotation).toFixed(2);

        const dist = Math.abs(i - activeFloat);
        const z = numItems - dist;

        /* LOCAL PATCH: cards in the deck are solid. Upstream ramps opacity
           with distance — with six items the first card back sat at 0.70 and
           the second at 0.20, so the third read straight through the second.
           Opacity is only there to retire cards that have left the deck, so
           it now holds at 1 until SOLID_DEPTH and fades out over the step
           after it. */
        const SOLID_DEPTH = 2;
        const op = Math.max(0, Math.min(1, SOLID_DEPTH + 1 - dist)).toFixed(2);
        const zStr = Math.round(z * 10).toString();

        const c = cache[i];

        if (c.tx !== tx || c.ty !== ty || c.rot !== rot) {
          card.style.transform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`;
          c.tx = tx; c.ty = ty; c.rot = rot;
        }
        if (c.z !== zStr) {
          card.style.zIndex = zStr;
          c.z = zStr;
        }
        if (c.op !== op) {
          card.style.opacity = op;
          c.op = op;
        }
      }
    }

    // ── Self-terminating RAF loop ──
    function loop() {
      update();
      const diff = Math.abs(targetProgress - progress);
      if (diff > 0.01 || isDown) {
        rafId = requestAnimationFrame(loop);
      } else {
        progress = targetProgress;
        update();
        isAnimating = false;
        rafId = null;
      }
    }

    function startLoop() {
      if (isAnimating) return;
      isAnimating = true;
      rafId = requestAnimationFrame(loop);
    }

    // ── Initial draw ──
    update();

    // ── Event helpers ──
    function getX(e: MouseEvent | TouchEvent): number | undefined {
      return "touches" in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
    }

    // ── Wheel ──
    function onWheel(e: WheelEvent) {
      const delta = e.deltaY * speedWheel;
      const next = targetProgress + delta;
      if ((next <= 0 && e.deltaY < 0) || (next >= 100 && e.deltaY > 0)) return;
      e.preventDefault();
      targetProgress = Math.max(0, Math.min(100, next));
      startLoop();
    }

    // ── Drag ──
    function onDown(e: MouseEvent | TouchEvent) {
      isDown = true;
      const x = getX(e);
      if (x !== undefined) startX = x;
      // Keep loop alive during drag
      if (!isAnimating) { isAnimating = true; rafId = requestAnimationFrame(loop); }
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (!isDown) return;
      const x = getX(e);
      if (x === undefined) return;
      const diff = (x - startX) * speedDrag;
      targetProgress = Math.max(0, Math.min(100, targetProgress + diff));
      startX = x;
      // No startLoop() — already running, loop checks isDown
    }

    function onUp() {
      if (!isDown) return;
      isDown = false;
      // Don't stop loop; it will self-terminate after settling
    }

    /* LOCAL PATCH: the wheel listener is opt-in. It calls preventDefault on
       every wheel event that lands on the slider, which on a long marketing
       page means the page stops scrolling whenever the cursor crosses this
       section — and with speedWheel at 0 it would swallow the scroll without
       even moving the slider. Drag and click are enough. */
    if (wheelControl) container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("mousedown", onDown, { passive: true });
    container.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      if (rafId) cancelAnimationFrame(rafId);
      cards.forEach(c => c.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, speedWheel, speedDrag, wheelControl, spreadX, spreadY, rotation]);

  return (
    /* LOCAL PATCH: `bg-black/90` dropped from the class list. It is a Tailwind
       utility, so a background passed through containerStyle or a site class
       would have been fighting it. The caller owns the backdrop now. */
    <div
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[620px] overflow-hidden rounded-2xl ${className}`}
      style={{ ...containerStyle, touchAction: "pan-y" }}
    />
  );
};

export default ThreeDSlider;