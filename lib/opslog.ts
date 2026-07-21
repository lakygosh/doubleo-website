export type OpsLogEntry = {
  time: string;
  kind: "call" | "lead" | "content" | "spam";
  text: { sr: string; en: string };
};

export const logFeed: OpsLogEntry[] = [
  { time: "02:41", kind: "call", text: { sr: "Dolazni poziv preuzet · termin zakazan za četvrtak 14:00", en: "Incoming call answered · appointment booked, Thursday 2 pm" } },
  { time: "03:07", kind: "lead", text: { sr: "Novi lead iz oglasa · pozvan 40 sekundi nakon prijave", en: "New ad lead · called 40 seconds after signup" } },
  { time: "04:56", kind: "spam", text: { sr: "Spam poziv prepoznat i filtriran", en: "Spam call detected and screened out" } },
  { time: "06:12", kind: "lead", text: { sr: "Stari kontakt odgovorio na ponudu · prosleđen vama", en: "Old contact replied to the offer · handed over to you" } },
  { time: "07:30", kind: "content", text: { sr: "Nedeljne objave spremne za pregled", en: "This week’s posts ready for review" } },
  { time: "08:15", kind: "call", text: { sr: "Pitanje o cenama odgovoreno · poslat podsetnik za termin", en: "Pricing question answered · appointment reminder sent" } },
  { time: "09:02", kind: "content", text: { sr: "SEO članak objavljen na sajtu", en: "SEO article published to the site" } },
  { time: "10:44", kind: "lead", text: { sr: "Lead iz forme pozvan · razgovor prebačen na vas", en: "Form lead called · conversation routed to you" } },
];
