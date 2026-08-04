# Double O — Design System

Extracted from the live site (`app/styles/*`, `components/*`). Everything below is
copy-pasteable. Hand this whole file to an agent building a page (offer, proposal,
landing) that must look like doubleo.agency.

**The look in one sentence:** pastel-aurora gradients on a warm off-white page, near-black
inverted blocks for emphasis, soft neumorphic pill buttons, generous rounding, and one
single fade-up animation used everywhere.

---

## 1. Tokens

Drop this straight into a stylesheet. Nothing else in this doc works without it.

```css
:root {
  /* ── Surfaces ───────────────────────────────── */
  --page:         #f7f6f7;   /* body background — warm off-white, never pure white */
  --surface:      #ffffff;   /* cards */
  --surface-2:    #faf9fa;
  --surface-sunk: #f2f0f3;   /* recessed panels, hover wells */

  /* ── Ink (text) ─────────────────────────────── */
  --ink:    #1b0c27;                    /* headings, primary text — near-black w/ purple cast */
  --ink-80: rgba(28, 12, 38, 0.8);      /* list items, dense body */
  --ink-70: rgba(28, 12, 38, 0.7);      /* lead paragraphs, button label */
  --ink-60: rgba(28, 12, 38, 0.6);      /* secondary/supporting copy */
  --ink-40: rgba(28, 12, 38, 0.4);      /* placeholders, kickers, disabled */

  /* ── Lines ──────────────────────────────────── */
  --line:        #edebee;               /* default card border */
  --line-strong: #ddd9e0;               /* input border */
  --line-glass:  rgba(255, 255, 255, 0.3);

  /* ── Accent + aurora ────────────────────────── */
  --accent:      #d37bff;   /* primary accent — orchid */
  --accent-soft: #f3e9fa;   /* focus ring wash */
  --accent-ink:  #7a2ea8;   /* accent text on light (AA-safe) */

  --c-blue:   #80aafd;
  --c-purple: #d37bff;
  --c-peach:  #fcac84;
  --c-pink:   #ff49d4;

  /* The signature gradient. Use it for: brand tile, gradient text, 3px card
     hairlines, pill dots, ticks, badges. Never as a large flat fill. */
  --aurora:      linear-gradient(143deg, #80a9fc 0%, #d37bff 31%, #fcab83 70%, #ff49d4 100%);
  --aurora-soft: linear-gradient(140deg, #efe8f6 0%, #d588fb 61%, #ff49d4 100%);
  --aurora-wash: linear-gradient(140deg, #efe8f6 0%, #f3e9fa 45%, #f7e6dd 100%);

  /* Pastel tints for card art / category backgrounds */
  --tint-lilac:  #eae2f2;
  --tint-violet: #f3e9fa;
  --tint-rose:   #f5e4ef;
  --tint-peach:  #f7e6dd;
  --tint-sky:    #dfe9fd;

  /* ── Inverted blocks (About, final CTA, footer) ─ */
  --dark:         #0b0510;
  --dark-2:       #1b0c27;
  --on-dark:      #ffffff;
  --on-dark-70:   rgba(255, 255, 255, 0.7);
  --on-dark-50:   rgba(255, 255, 255, 0.5);
  --on-dark-line: rgba(255, 255, 255, 0.12);

  /* ── State ──────────────────────────────────── */
  --success: #1f9254;
  --error:   #cb272f;

  /* ── Radius ─────────────────────────────────── */
  --r-xs:   8px;    /* nav links, chips */
  --r-sm:   12px;   /* inputs, small list rows */
  --r-md:   16px;   /* accordion items, nav bar */
  --r-lg:   24px;   /* cards — the default */
  --r-xl:   40px;   /* large frosted panels */
  --r-pill: 999px;  /* every button, badge, tag */

  /* ── Elevation ──────────────────────────────── */
  --shadow-sm:   0 1px 2px rgba(0,0,0,.06), 0 2px 5px rgba(0,0,0,.04);
  --shadow-card: 0 2px 5px rgba(0,0,0,.07), 0 8px 8px rgba(0,0,0,.06),
                 0 19px 11px rgba(0,0,0,.04), 0 33px 13px rgba(0,0,0,.01);
  --shadow-float: 0 5px 20px rgba(0,0,0,.06);
  --shadow-glass: inset 0 4px 4px rgba(255,255,255,.3), 0 1px 2px rgba(0,0,0,.1);

  /* ── Glass ──────────────────────────────────── */
  --glass-bg:        rgba(255, 255, 255, 0.2);
  --glass-bg-strong: rgba(255, 255, 255, 0.8);
  --glass-blur:      blur(10px);

  /* ── Neumorphism (buttons) ──────────────────── */
  --neu-surface: #f2f0f4;
  --neu-light:   rgba(255, 255, 255, 0.8);
  --neu-dark:    rgba(0, 0, 0, 0.25);
  --neu-raised:  -5px -5px 10px var(--neu-light), 5px 5px 10px var(--neu-dark);
  --neu-pressed: -1px -1px 5px rgba(255,255,255,.6), 1px 1px 5px rgba(0,0,0,.3),
                 inset -2px -2px 5px rgba(255,255,255,1), inset 2px 2px 4px rgba(0,0,0,.3);

  --neu-surface-dark: #191122;
  --neu-raised-dark:  -5px -5px 10px rgba(255,255,255,.06), 5px 5px 12px rgba(0,0,0,.7);
  --neu-pressed-dark: -1px -1px 4px rgba(255,255,255,.05), 1px 1px 4px rgba(0,0,0,.6),
                      inset -2px -2px 5px rgba(255,255,255,.09), inset 2px 2px 5px rgba(0,0,0,.75);

  /* ── Layout ─────────────────────────────────── */
  --wrap:        1240px;
  --wrap-narrow: 800px;
  --gutter:      clamp(1.25rem, 4vw, 2.5rem);
  --section-y:   clamp(4.5rem, 9vw, 8.5rem);
  --nav-h:       72px;

  /* ── Type scale (fluid) ─────────────────────── */
  --fs-display: clamp(2.5rem, 6vw, 4.25rem);
  --fs-h1:      clamp(2.25rem, 5.2vw, 3.75rem);
  --fs-h2:      clamp(1.95rem, 4.2vw, 3.25rem);
  --fs-h3:      clamp(1.35rem, 2.2vw, 1.75rem);
  --fs-h4:      clamp(1.1rem, 1.6vw, 1.3rem);
  --fs-lead:    clamp(1rem, 1.25vw, 1.15rem);
  --fs-body:    1rem;
  --fs-sm:      0.9rem;
  --fs-xs:      0.8rem;
  --fs-mono:    0.72rem;

  /* ── Motion ─────────────────────────────────── */
  --ease:     cubic-bezier(0.12, 0.23, 0.5, 1);   /* the site's signature ease */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 0.18s;
  --dur:      0.35s;
  --dur-slow: 0.6s;

  /* ── Z-index ────────────────────────────────── */
  --z-nav: 100;  --z-menu: 110;  --z-widget: 90;
}
```

---

## 2. Typography

| Role | Family | Where |
|---|---|---|
| Display | **General Sans** (Fontshare, free commercial) — 400 / 500 / 600 | All headings, button labels, brand text, prices, stat values, nav item names |
| Body | **Inter Variable** | Paragraphs, lists, form fields |
| Mono | **Fragment Mono** 400 | Eyebrows, kickers, badges, step numbers — always UPPERCASE + tracked |

Fallback chains: `var(--font-display), system-ui, sans-serif` · `var(--font-body), system-ui, -apple-system, sans-serif` · `var(--font-mono), ui-monospace, monospace`.

**Heading rules (non-negotiable — this is most of the "feel"):**

```css
h1, h2, h3, h4, h5 {
  font-family: var(--font-display), system-ui, sans-serif;
  font-weight: 500;              /* NEVER 700 — medium is the house weight */
  line-height: 1.08;             /* very tight */
  letter-spacing: -0.025em;      /* negative tracking on all headings */
  text-wrap: balance;
  color: var(--ink);
}
h1 { font-size: var(--fs-h1); }
h2 { font-size: var(--fs-h2); }
h3 { font-size: var(--fs-h3); }
h4 { font-size: var(--fs-h4); }

body { line-height: 1.6; }
p    { text-wrap: pretty; }
```

Big numerals (prices, stats) go **600 weight, `letter-spacing: -0.03em`**, display family.

Measure caps: headline `max-width: 22ch`, subhead `52ch`, section subtitle `42rem`, centred heading blocks `46rem`.

Gradient text — use once per page, max:
```css
.u-gradient-text {
  background: var(--aurora);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
```

---

## 3. Layout

```css
.wrap          { width: 100%; max-width: var(--wrap); margin-inline: auto; padding-inline: var(--gutter); }
.wrap--narrow  { max-width: var(--wrap-narrow); }
.section       { padding-block: var(--section-y); position: relative; }
.section--tight{ padding-block: clamp(3rem, 6vw, 5.5rem); }
```

Breakpoints used across the site: **1080px** (nav collapses), **900px** (pricing → 1 col),
**809px** (main tablet/mobile break — grids collapse, floating shapes hidden), **560px** (small phone).

Grid defaults: bento `repeat(2, minmax(0,1fr))`, steps & pricing `repeat(3, minmax(0,1fr))`,
gap `clamp(1rem, 2vw, 1.5rem)`. Grids sit `margin-top: clamp(2.5rem, 5vw, 4rem)` below their heading block.

### Inverted (dark) sections

Used for About, final CTA, footer. Always carries two blurred corner glows.

```css
.section--dark {
  background: var(--dark);
  color: var(--on-dark);
  overflow: clip;                /* clip, not hidden — glows sit outside the box */
}
.section--dark h1, .section--dark h2,
.section--dark h3, .section--dark h4 { color: var(--on-dark); }

.section--dark::before, .section--dark::after {
  content: ""; position: absolute; inset-block-start: 0;
  width: min(46vw, 620px); aspect-ratio: 1;
  filter: blur(80px); opacity: 0.28; pointer-events: none;
}
.section--dark::before { inset-inline-start: -12%; background: radial-gradient(circle, var(--c-peach) 0%, transparent 68%); }
.section--dark::after  { inset-inline-end:   -12%; background: radial-gradient(circle, var(--c-purple) 0%, transparent 68%); }
```

---

## 4. Components

### 4.1 Section heading block

```html
<div class="sec-head">
  <span class="pill"><i class="pill__dot"></i>EYEBROW TEXT</span>
  <h2>The headline</h2>
  <p class="sec-head__sub">One or two lines of supporting copy.</p>
</div>
```
```css
.sec-head { display:flex; flex-direction:column; align-items:center; gap:1.1rem;
            text-align:center; max-width:46rem; margin-inline:auto; }
.sec-head--start { align-items:flex-start; text-align:left; margin-inline:0; }
.sec-head__sub { color:var(--ink-60); font-size:var(--fs-lead); max-width:42rem; }
.section--dark .sec-head__sub { color: var(--on-dark-70); }
```

### 4.2 Eyebrow pill

```css
.pill {
  display:inline-flex; align-items:center; gap:.45rem;
  padding:.32rem .85rem; border-radius:var(--r-pill);
  border:1px solid var(--accent); background:var(--surface); color:var(--ink);
  font-family:var(--font-mono), monospace; font-size:var(--fs-mono); line-height:1.4;
  text-transform:uppercase; letter-spacing:.08em; white-space:nowrap;
  box-shadow:var(--shadow-sm);
}
.pill__dot { width:.5rem; height:.5rem; border-radius:50%; background:var(--aurora); flex-shrink:0; }

.pill--glass { background:var(--glass-bg); border-color:var(--line-glass);
               backdrop-filter:blur(6px); box-shadow:var(--shadow-glass); }
.pill--dark  { background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.28);
               color:var(--on-dark); backdrop-filter:blur(6px); }
```

### 4.3 Buttons — neumorphic pills

The single most recognisable element. **Raised at rest → pressed (inset) on hover.**
Never a flat filled rectangle.

```css
.btn, .neu {
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  padding:.62rem 1.25rem; border:0; border-radius:var(--r-pill);
  background:var(--neu-surface); color:var(--ink-70);
  font-family:var(--font-display), sans-serif; font-weight:600; font-size:.9rem; line-height:1.2;
  white-space:nowrap; cursor:pointer;
  box-shadow:var(--neu-raised);
  transition: box-shadow var(--dur) var(--ease-out), color var(--dur-fast), background-color var(--dur-fast);
}
.btn:hover, .btn:focus-visible { box-shadow:var(--neu-pressed); color:var(--accent-ink); }
.btn:disabled { opacity:.5; cursor:default; box-shadow:var(--neu-raised); color:var(--ink-40); }

.btn--lg { padding:.85rem 1.6rem; font-size:.98rem; }

/* primary — dark fill, same raised→pressed physics */
.btn--primary { background:var(--ink); color:#fff;
  box-shadow:-4px -4px 10px rgba(255,255,255,.55), 5px 5px 12px rgba(0,0,0,.35); }
.btn--primary:hover, .btn--primary:focus-visible { color:#fff;
  box-shadow:-1px -1px 4px rgba(255,255,255,.4), 1px 1px 4px rgba(0,0,0,.35),
             inset -2px -2px 6px rgba(255,255,255,.14), inset 2px 2px 6px rgba(0,0,0,.55); }

.btn--secondary { background:var(--neu-surface); }

/* on gradient imagery */
.btn--ghost { background:rgba(250,249,251,.92); color:var(--ink-70); backdrop-filter:blur(8px); }

/* on near-black sections */
.btn--light { background:#fff; color:var(--ink-70);
  box-shadow:-5px -5px 12px rgba(255,255,255,.12), 5px 5px 14px rgba(0,0,0,.6); }
.btn--light:hover { color:var(--accent-ink);
  box-shadow:-1px -1px 4px rgba(255,255,255,.1), 1px 1px 4px rgba(0,0,0,.5),
             inset -2px -2px 5px rgba(255,255,255,1), inset 2px 2px 4px rgba(0,0,0,.28); }

/* any neu control inside a dark section */
.section--dark .btn:not(.btn--light):not(.btn--primary), .section--dark .neu {
  background:var(--neu-surface-dark); color:var(--on-dark-70); box-shadow:var(--neu-raised-dark); }
.section--dark .btn:not(.btn--light):not(.btn--primary):hover, .section--dark .neu:hover {
  color:var(--accent); box-shadow:var(--neu-pressed-dark); }

.neu--round { padding:0; width:42px; height:42px; border-radius:50%; flex-shrink:0; }
.cta-row    { display:flex; flex-wrap:wrap; gap:.7rem; }

/* arrow nudges right on hover */
.btn__arrow { transition: transform var(--dur-fast) var(--ease-out); }
.btn:hover .btn__arrow { transform: translateX(3px); }
```

> **Critical rule:** `--neu-surface` must sit close to the colour behind it or the illusion
> breaks. Override it per context — e.g. inside a sunken panel: `--neu-surface: #eeecf1;`

Arrow icon (15×15, `stroke-width 2`, round caps): `<path d="M5 12h14M13 6l6 6-6 6"/>`

### 4.4 Cards

```css
.card          { background:var(--surface); border:1px solid var(--line);
                 border-radius:var(--r-lg); box-shadow:var(--shadow-sm); }
.card--flat    { box-shadow:none; }
.card--pad     { padding: clamp(1.25rem, 2.4vw, 1.85rem); }

/* gradient hairline along the top edge — marks the highlighted item */
.card--featured { position:relative; overflow:hidden; }
.card--featured::before { content:""; position:absolute; inset:0 0 auto 0;
                          height:3px; background:var(--aurora); }
```

Hover lift (bento, benefits, blog cards):
```css
transition: transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out);
:hover { transform: translateY(-3px); box-shadow: var(--shadow-card); }
```

### 4.5 Pricing / offer plan card ← **use this for offers**

```html
<article class="plan plan--featured">
  <div class="plan__head">
    <h3 class="plan__name">Growth <span class="plan__badge">Most popular</span></h3>
    <p class="plan__tagline">One line on who it's for.</p>
  </div>
  <div class="plan__price">€1,200 <span>/ month</span></div>
  <a class="btn btn--primary plan__cta">Book a call</a>
  <p class="plan__inclabel">What's included</p>
  <ul class="plan__list">
    <li><i class="plan__tick">✓</i>Deliverable one</li>
  </ul>
</article>
```
```css
.plans { display:grid; grid-template-columns:repeat(3, minmax(0,1fr));
         gap:clamp(1rem,2vw,1.5rem); margin-top:clamp(2.5rem,5vw,4rem); align-items:start; }

.plan { height:100%; display:flex; flex-direction:column;
        padding:clamp(1.4rem,2.6vw,2rem); border-radius:var(--r-lg);
        border:1px solid var(--line); background:var(--surface);
        position:relative; overflow:hidden; }

/* featured: aurora 1px gradient BORDER (mask trick) + soft top glow */
.plan--featured { box-shadow:var(--shadow-card); border-color:transparent; }
.plan--featured::before {
  content:""; position:absolute; inset:0; padding:1px; border-radius:inherit;
  background:var(--aurora);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none; }
.plan--featured::after {
  content:""; position:absolute; inset:0 0 auto 0; height:130px;
  background:linear-gradient(180deg, rgba(211,123,255,.12), transparent); pointer-events:none; }

.plan__head, .plan__price, .plan__cta, .plan__inclabel, .plan__list { position:relative; z-index:1; }

.plan__name    { display:flex; align-items:center; gap:.45rem; font-size:1.25rem; }
.plan__badge   { font-family:var(--font-mono), monospace; font-size:.58rem;
                 text-transform:uppercase; letter-spacing:.08em; padding:.18rem .5rem;
                 border-radius:var(--r-pill); background:var(--ink); color:#fff; }
.plan__tagline { margin-top:.4rem; font-size:.9rem; color:var(--ink-60); }

.plan__price   { display:flex; align-items:baseline; gap:.5rem; flex-wrap:wrap;
                 margin:1.6rem 0 1.2rem; font-family:var(--font-display), sans-serif;
                 font-weight:600; font-size:clamp(1.6rem,2.6vw,2rem); letter-spacing:-.03em; }
.plan__price span { font-family:var(--font-body), sans-serif; font-weight:400;
                    font-size:.85rem; color:var(--ink-60); letter-spacing:0; }

.plan__cta     { width:100%; }
.plan__inclabel{ margin:1.5rem 0 .8rem; font-size:.82rem; color:var(--ink-60); }
.plan__list    { display:grid; gap:.6rem; }
.plan__list li { display:flex; align-items:flex-start; gap:.55rem; font-size:.92rem; color:var(--ink-80); }
.plan__tick    { color:var(--accent); display:inline-flex; margin-top:.16rem; flex-shrink:0; }

.engage__note  { margin-top:1.75rem; text-align:center; font-size:.88rem; color:var(--ink-60); }

@media (max-width:900px) { .plans { grid-template-columns:1fr; max-width:30rem; margin-inline:auto; } }
```

### 4.6 Numbered process steps ← **use this for offer scope / timeline**

```css
.how__steps { display:grid; grid-template-columns:repeat(3, minmax(0,1fr));
              gap:clamp(1rem,2.5vw,1.75rem); margin-top:clamp(2.5rem,5vw,4rem); }

.step { height:100%; padding:clamp(1.4rem,2.6vw,2rem); border-radius:var(--r-lg);
        border:1px solid var(--line); background:var(--surface);
        position:relative; overflow:hidden; }
.step::before { content:""; position:absolute; inset:0 0 auto 0; height:3px;
                background:var(--aurora); opacity:.75; }
.step__no { display:inline-block; font-family:var(--font-mono), monospace;
            font-size:.85rem; color:var(--accent-ink); margin-bottom:.9rem; }  /* "01" */
.step h3  { font-size:1.2rem; margin-bottom:.5rem; }
.step p   { font-size:.95rem; color:var(--ink-60); }

@media (max-width:809px) { .how__steps { grid-template-columns:1fr; } }
```

### 4.7 Stats row

```css
.stats { display:flex; justify-content:center; flex-wrap:wrap;
         gap:clamp(2rem,6vw,5rem); margin-top:clamp(2.5rem,5vw,3.5rem); text-align:center; }
.stats__value { display:block; font-family:var(--font-display), sans-serif; font-weight:600;
                font-size:clamp(1.8rem,3.4vw,2.6rem); letter-spacing:-.03em; }
.stats__label { font-size:.88rem; color:var(--ink-60); }
```

### 4.8 Accordion (FAQ / terms)

```css
.acc       { display:grid; gap:.6rem; }
.acc__item { border:1px solid var(--line); border-radius:var(--r-md); background:var(--surface);
             overflow:hidden; transition:border-color var(--dur-fast), box-shadow var(--dur-fast); }
.acc__item.is-open { border-color:var(--accent); box-shadow:var(--shadow-sm); }
.acc__q    { width:100%; display:flex; align-items:center; justify-content:space-between; gap:1rem;
             padding:1.05rem 1.25rem; text-align:left;
             font-family:var(--font-display), sans-serif; font-weight:500; font-size:1.02rem; color:var(--ink); }
.acc__a    { padding:0 1.25rem 1.25rem; color:var(--ink-60); font-size:.96rem; line-height:1.65; }

/* plus → minus sign */
.acc__sign { position:relative; width:18px; height:18px; flex-shrink:0; }
.acc__sign::before, .acc__sign::after {
  content:""; position:absolute; inset:50% 0 auto 0; height:1.8px; border-radius:2px;
  background:var(--ink); transition:transform var(--dur) var(--ease-out); }
.acc__sign::after { transform:rotate(90deg); }
.acc__item.is-open .acc__sign::after { transform:rotate(0deg); }
```

### 4.9 Forms

```css
.field { display:grid; gap:.35rem; }
.field label { font-size:.85rem; font-weight:500; color:var(--ink-70); }
.field input, .field textarea {
  width:100%; padding:.7rem .9rem; border-radius:var(--r-sm);
  border:1px solid var(--line-strong); background:var(--surface); color:var(--ink); font-size:.95rem;
  transition:border-color var(--dur-fast), box-shadow var(--dur-fast); }
.field input::placeholder, .field textarea::placeholder { color:var(--ink-40); }
.field input:focus, .field textarea:focus {
  outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-soft); }
.field textarea { min-height:8rem; resize:vertical; }
```

### 4.10 Small shared bits

```css
.kicker { font-family:var(--font-mono), monospace; font-size:var(--fs-mono);
          text-transform:uppercase; letter-spacing:.1em; color:var(--ink-40); }

/* aurora check bullet */
.tick { display:grid; place-items:center; width:18px; height:18px; border-radius:50%;
        background:var(--aurora); color:#fff; flex-shrink:0; }

/* film grain overlay — sits over any gradient panel */
.u-noise {
  position:absolute; inset:0; pointer-events:none; opacity:.4; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E"); }
```

Focus & selection:
```css
::selection    { background:var(--accent); color:#fff; }
:focus-visible { outline:2px solid var(--accent); outline-offset:3px; border-radius:4px; }
```

---

## 5. Signature backdrops

### Aurora hero backdrop
Base gradient + four drifting blurred blobs + grain + bottom fade into the page colour.

```css
.aurora { position:absolute; inset:0; overflow:hidden; border-radius:inherit;
  background:linear-gradient(165deg, #e9def5 0%, #efe4f3 38%, #f8e3e0 68%, #fdefe0 100%); }

.aurora__blob { position:absolute; border-radius:50%; filter:blur(80px); opacity:.75; will-change:transform; }
.aurora__blob--1 { width:62%; aspect-ratio:1.2; left:-12%; top:-18%;
  background:radial-gradient(circle,#cfa8f5 0%, rgba(207,168,245,0) 68%);
  animation:aurora-drift-a 26s ease-in-out infinite alternate; }
.aurora__blob--2 { width:58%; aspect-ratio:1; right:-10%; top:-8%;
  background:radial-gradient(circle,#ffd3b0 0%, rgba(255,211,176,0) 70%);
  animation:aurora-drift-b 32s ease-in-out infinite alternate; }
.aurora__blob--3 { width:70%; aspect-ratio:1.4; left:8%; bottom:-28%;
  background:radial-gradient(circle,#e3c9f7 0%, rgba(227,201,247,0) 66%);
  animation:aurora-drift-c 29s ease-in-out infinite alternate; }
.aurora__blob--4 { width:44%; aspect-ratio:1; right:14%; bottom:-12%;
  background:radial-gradient(circle,#ffc2e9 0%, rgba(255,194,233,0) 70%);
  animation:aurora-drift-a 35s ease-in-out infinite alternate-reverse; }

.aurora__grain { opacity:.16; }   /* .u-noise at lower opacity */
.aurora__fade  { position:absolute; inset-inline:0; bottom:0; height:28%;
  background:linear-gradient(180deg, rgba(247,246,247,0) 0%, var(--page) 96%); pointer-events:none; }

@keyframes aurora-drift-a { from{transform:translate3d(0,0,0) scale(1)}    to{transform:translate3d(6%,8%,0) scale(1.14)} }
@keyframes aurora-drift-b { from{transform:translate3d(0,0,0) scale(1.08)} to{transform:translate3d(-8%,6%,0) scale(.95)} }
@keyframes aurora-drift-c { from{transform:translate3d(0,0,0) scale(1)}    to{transform:translate3d(4%,-7%,0) scale(1.1)} }
```

### Frosted glass panel (hero chat frame)
```css
.glassframe {
  position:relative; isolation:isolate; overflow:hidden;
  padding:clamp(1.5rem,3.5vw,3.25rem) clamp(1rem,2.5vw,2.5rem);
  border-radius:var(--r-xl); border:1px solid rgba(255,255,255,.6);
  background:rgba(255,255,255,.16);
  backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
  box-shadow:var(--shadow-glass), 0 24px 60px rgba(90,40,140,.1); }
@media (max-width:809px) { .glassframe { border-radius:var(--r-lg); } }
```

### Floating glass shapes
PNG artwork in `public/Shapes/` (`Shape1_1@4x.png` … `Shape4@4x.png`), absolutely positioned,
hidden below 809px.
```css
.shape { --shape-size:160px; position:absolute; width:var(--shape-size); height:auto;
  pointer-events:none; user-select:none;
  animation:shape-float 8.5s ease-in-out infinite alternate;
  filter:drop-shadow(0 18px 34px rgba(120,60,180,.16)); }

@keyframes shape-float { from{transform:translate3d(-7px,19px,0) rotate(-9deg)}
                         to  {transform:translate3d(7px,-35px,0) rotate(9deg)} }
@keyframes shape-spin  { 0%{transform:translate3d(0,0,0) rotate(0deg)}
                         50%{transform:translate3d(0,-20px,0) rotate(180deg)}
                         100%{transform:translate3d(0,0,0) rotate(360deg)} }
@media (max-width:809px) { .shape { display:none; } }
```

### Ghost wordmark (footer)
Oversized brand name at 3.8% white, bleeding off the bottom edge.
```css
.footer__ghost { position:absolute; left:50%; bottom:-.22em; transform:translateX(-50%);
  font-family:var(--font-display), sans-serif; font-weight:600;
  font-size:clamp(5rem,19vw,17rem); line-height:.8; letter-spacing:-.04em; white-space:nowrap;
  color:rgba(255,255,255,.038); pointer-events:none; user-select:none; }
```

---

## 6. Motion

**One appear animation for the whole site.** Do not invent others.

```
opacity: 0.001 → 1
y:       20px (small elements) or 40px (blocks) → 0
duration: 0.6s
ease:     cubic-bezier(0.12, 0.23, 0.5, 1)
```

- Hero elements fire **on load** with a cascade: delays `0.4 / 0.8 / 1.2 / 1.3`.
- Everything below the fold fires **once on scroll into view**, viewport margin `0px 0px -12% 0px`.

React (motion/react):
```tsx
<motion.div
  initial={{ opacity: 0.001, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
  transition={{ delay, duration: 0.6, ease: [0.12, 0.23, 0.5, 1] }}
/>
```

Interaction timings: hover/colour changes `--dur-fast` (0.18s), shadow & transform `--dur` (0.35s) with `--ease-out`.

Smooth scrolling uses **Lenis**; sticky card stacks use `perspective: 1200px` with
`position: sticky` slots (last slot static). Marquees translate `-50%` on a duplicated
track with an edge mask: `linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)`.

Always ship:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior:auto; }
  *, *::before, *::after {
    animation-duration:.001ms !important; animation-iteration-count:1 !important;
    transition-duration:.001ms !important; }
}
```

---

## 7. Brand

**Double O** — two rings ("OO") in a rounded aurora tile beside the wordmark.

```html
<span class="brand">
  <span class="brand__tile" style="width:34px;height:34px">
    <svg viewBox="0 0 44 24" width="22" height="12">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="#fff" stroke-width="3"/>
      <circle cx="30" cy="12" r="8.5" fill="none" stroke="#fff" stroke-width="3"/>
    </svg>
  </span>
  <span class="brand__text">Double O</span>
</span>
```
```css
.brand       { display:inline-flex; align-items:center; gap:.55rem; }
.brand__tile { display:grid; place-items:center; border-radius:9px; background:var(--aurora);
               box-shadow:inset 0 -2px 4px rgba(255,255,255,.25), inset 0 1px 1px rgba(255,255,255,.4);
               flex-shrink:0; }
.brand__text { font-family:var(--font-display), sans-serif; font-weight:600;
               font-size:1.06rem; letter-spacing:-.02em; white-space:nowrap; }
```

Per-solution accent colours (for colour-coding offer line items):

| Solution | Accent | Tint |
|---|---|---|
| Chatbot *(flagship)* | `#d37bff` | `--tint-violet` |
| Content Dashboard | `#80aafd` | `--tint-sky` |
| Lead Reactivation | `#ff49d4` | `--tint-rose` |
| Speed-to-Lead | `#fcac84` | `--tint-peach` |
| AI UGC Creatives | — | `--tint-lilac` |
| AI Receptionist | — | `--tint-lilac` |

---

## 8. Rules of thumb

**Do**
- Warm off-white page (`--page`), white cards. Big radii (24px cards, pill buttons).
- Use the aurora gradient as an *accent*: 3px hairlines, 1px masked borders, tiny dots, ticks, the brand tile, one gradient headline word.
- Alternate light sections with 1–2 near-black `.section--dark` blocks for rhythm; the final CTA is always dark.
- Headings at weight 500 with negative tracking. Never bold-shout.
- Every clickable pill uses the raised → pressed neumorphic physics.
- Pastel tints (`--tint-*`) for category/art backgrounds; add `.u-noise` grain over any large gradient.
- One fade-up animation, one signature ease.

**Don't**
- Pure `#ffffff` page background, or `#000` text.
- Weight 700+ headings, or positive letter-spacing on headings.
- Flat rectangular buttons, hard drop shadows, or more than one gradient text run per page.
- Large flat aurora fills — it's an accent gradient, not a background wash (use `--aurora-wash` when you need a soft field).
- Sharp corners anywhere except hairlines.

---

## 9. Ready-made offer page skeleton

```html
<header class="hero">
  <div class="hero__bg"><!-- .aurora backdrop --></div>
  <div class="wrap hero__inner">
    <span class="pill"><i class="pill__dot"></i>PROPOSAL · ACME CORP</span>
    <h1 class="hero__title">AI chatbot that books <span class="u-gradient-text">qualified calls</span></h1>
    <p class="hero__sub">Prepared for Acme Corp · Valid 30 days</p>
    <div class="cta-row hero__cta">
      <a class="btn btn--primary btn--lg">Accept offer</a>
      <a class="btn btn--secondary btn--lg">Book a call</a>
    </div>
  </div>
</header>

<section class="section">      <!-- Problem / context: .sec-head + .card grid -->
<section class="section">      <!-- Scope: .how__steps with 01/02/03 -->
<section class="section--dark"><!-- Why us: stats row on black -->
<section class="section">      <!-- Pricing: .plans with one .plan--featured -->
<section class="section">      <!-- FAQ / terms: .acc accordion -->
<section class="section--dark"><!-- Final CTA: centred, .btn--light -->
```

Recommended density for a one-page offer: hero → 4–6 sections → dark CTA. Body copy in
`--ink-60`, key deliverables as `.plan__list` rows with aurora ticks, price in display
600 / `-0.03em`.
