/**
 * Google Consent Mode v2, custom banner (no CMP).
 *
 * "Advanced" mode: the Google tag always loads, but every storage signal
 * starts denied, so before a choice is made GA4 only sends cookieless pings
 * (no identifiers, no cookies) and models the gap. Accepting flips
 * analytics_storage to granted for every later hit.
 *
 * The ad_* signals stay denied permanently — the site runs no Google Ads and
 * has nothing to gain from asking for them.
 */

export const CONSENT_KEY = "doubleo-consent";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Must execute before gtag.js — `default` has to land in the dataLayer ahead
 * of the `config` call, otherwise the first page view sets cookies before the
 * visitor has been asked. Rendered inline at the top of <body> in the root
 * layout, so it runs during parse while GA loads afterInteractive.
 *
 * It also replays a stored choice, so a returning visitor who accepted is
 * measured properly from the very first hit rather than from the moment the
 * React banner hydrates.
 */
export const CONSENT_BOOTSTRAP = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{analytics_storage:'granted'})}}catch(e){}
`.trim();

/** null = never asked, so the banner still has to be shown. */
export function readConsent(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    // Safari in private mode throws on localStorage access — treat as unasked.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Not persisting is survivable: the banner reappears next visit.
  }
  // No manual page_view on grant — the cookieless ping for this view has
  // already been counted, and resending would double it.
  window.gtag?.("consent", "update", { analytics_storage: choice });
}
