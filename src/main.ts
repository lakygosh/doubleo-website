import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "./style.css";

import { t, meta, logFeed, type Lang } from "./i18n";
import { CALCOM_URL, FORM_ENDPOINT } from "./config";

// Mark JS as available (CSS only hides .reveal elements under html.js)
document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Language state (kept in app state, per spec — no localStorage) ── */
let lang: Lang = "sr";

function applyLang(next: Lang): void {
  lang = next;
  document.documentElement.lang = next;

  document.title = meta.title[next];
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description[next]);

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const entry = t[el.dataset.i18n!];
    if (entry) el.textContent = entry[next];
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-html]").forEach((el) => {
    const entry = t[el.dataset.i18nHtml!];
    if (entry) el.innerHTML = entry[next]; // dictionary-only HTML, never user input
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((el) => {
    for (const pair of el.dataset.i18nAttr!.split(";")) {
      const [attr, key] = pair.split(":");
      const entry = t[key?.trim()];
      if (attr && entry) el.setAttribute(attr.trim(), entry[next]);
    }
  });

  document.querySelectorAll<HTMLButtonElement>(".lang__btn").forEach((btn) => {
    const active = btn.dataset.lang === next;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  renderLog();
}

document.querySelectorAll<HTMLButtonElement>(".lang__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.lang as Lang;
    if (next !== lang) applyLang(next);
  });
});

/* ── Language gate — pick SR/EN before entering ─────────────────
   The inline head script sets html.gate-open pre-paint (JS only,
   so no-JS visitors and crawlers are never blocked). */
const gate = document.getElementById("lang-gate");
gate?.querySelectorAll<HTMLButtonElement>("[data-gate-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLang(btn.dataset.gateLang as Lang);
    document.documentElement.classList.remove("gate-open"); // unlock scroll
    gate.classList.add("gate--closing"); // fade out
    window.setTimeout(() => gate.classList.remove("gate--closing"), 400);
    document.querySelector<HTMLElement>(".hero__h1")?.focus();
  });
});

/* ── CTA + form endpoints (single source: src/config.ts) ───────── */
if (!CALCOM_URL.startsWith("<<")) {
  document.querySelectorAll<HTMLAnchorElement>("[data-calcom]").forEach((a) => {
    a.href = CALCOM_URL;
    a.target = "_blank";
    a.rel = "noopener";
  });
}

/* ── Live operations log (signature element) ───────────────────── */
const logEl = document.getElementById("ops-log");
const VISIBLE = 5;
let logHead = 0; // index of the entry shown at the top

function renderLog(): void {
  if (!logEl) return;
  logEl.innerHTML = "";
  for (let i = 0; i < VISIBLE; i++) {
    const entry = logFeed[(logHead + i) % logFeed.length];
    const li = document.createElement("li");
    li.className = "opslog__item";
    li.dataset.kind = entry.kind;
    const time = document.createElement("time");
    time.textContent = entry.time;
    const span = document.createElement("span");
    span.textContent = entry.text[lang];
    li.append(time, span);
    logEl.appendChild(li);
  }
}

function tickLog(): void {
  logHead = (logHead - 1 + logFeed.length) % logFeed.length;
  renderLog();
  logEl?.firstElementChild?.classList.add("is-new");
}

if (logEl && !prefersReducedMotion) {
  let timer: number | undefined;
  const start = () => {
    if (timer === undefined) timer = window.setInterval(tickLog, 3800);
  };
  const stop = () => {
    if (timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
  // Tick only while visible and while the tab is in the foreground
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 }).observe(logEl);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
}

/* ── Scroll reveal ──────────────────────────────────────────────── */
const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ── Mobile menu ────────────────────────────────────────────────── */
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

function setMenu(open: boolean): void {
  if (!navToggle || !mobileMenu) return;
  navToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.hidden = !open;
  mobileMenu.classList.toggle("is-open", open);
  const key = open ? "nav.menuClose" : "nav.menuOpen";
  navToggle.setAttribute("aria-label", t[key][lang]);
}

navToggle?.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});
mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu && !mobileMenu.hidden) setMenu(false);
});

/* ── Contact form (no backend — posts to FORM_ENDPOINT) ────────── */
const form = document.getElementById("contact-form") as HTMLFormElement | null;
const statusEl = form?.querySelector<HTMLElement>(".form__status") ?? null;
const submitBtn = form?.querySelector<HTMLButtonElement>(".form__submit") ?? null;

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.reportValidity() || !statusEl || !submitBtn) return;

  statusEl.className = "form__status";
  statusEl.textContent = "";
  submitBtn.disabled = true;
  const restoreLabel = () => {
    submitBtn.disabled = false;
    submitBtn.textContent = t["contact.send"][lang];
  };
  submitBtn.textContent = t["contact.sending"][lang];

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(String(res.status));
    statusEl.textContent = t["contact.success"][lang];
    statusEl.classList.add("is-ok");
    form.reset();
  } catch {
    statusEl.textContent = t["contact.error"][lang];
    statusEl.classList.add("is-err");
  } finally {
    restoreLabel();
  }
});

/* Initial render (Serbian is already baked into the HTML) */
renderLog();
