export const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL ?? "";
export const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://formsubmit.co/ajax/lazar.gosic@doubleo.agency";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://doubleo.agency";

/**
 * n8n chat webhook. Read by both the hero chat card (components/chat) and the
 * floating widget (public/assets/widget.js, via a data attribute) so the two
 * never drift apart.
 */
export const CHAT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL ??
  "https://n8n.doubleo.agency/webhook/11a27b23-153e-4a19-bf67-b83410c1355a/chat";

export const CONTACT_EMAIL = "lazar.gosic@doubleo.agency";

/** GA4 measurement ID. Empty string disables the tag entirely (see app/layout.tsx). */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-QM6DQQGZQC";

/**
 * Google Tag Manager container. Loads alongside the GA4 tag above, for tags
 * managed outside the codebase. Do not add a GA4 config tag for
 * GA_MEASUREMENT_ID inside the container — that measurement ID is already
 * configured here, and both firing would double every page view.
 */
export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-P5FD7ZDS";

export const SOCIALS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  x: process.env.NEXT_PUBLIC_X_URL ?? "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
};
