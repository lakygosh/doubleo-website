export type OpsLogEntry = {
  time: string;
  kind: "call" | "lead" | "content" | "spam";
  text: { sr: string; en: string };
};

export const logFeed: OpsLogEntry[] = [
  { time: "02:41", kind: "lead", text: { sr: "Upit sa sajta · termin zakazan za četvrtak 14:00", en: "Website enquiry · appointment booked, Thursday 2 pm" } },
  { time: "03:07", kind: "lead", text: { sr: "Instagram DM · odgovoreno na pitanje o cenama", en: "Instagram DM · pricing question answered" } },
  { time: "04:56", kind: "spam", text: { sr: "Spam poruka prepoznata i filtrirana", en: "Spam message detected and screened out" } },
  { time: "06:12", kind: "lead", text: { sr: "Viber poruka · klijent zakazao kontrolu", en: "Viber message · customer booked a check-up" } },
  { time: "07:30", kind: "content", text: { sr: "Nedeljne objave spremne za pregled", en: "This week’s posts ready for review" } },
  { time: "08:15", kind: "lead", text: { sr: "Novi lead iz oglasa · pozvan 40 sekundi nakon prijave", en: "New ad lead · called 40 seconds after signup" } },
  { time: "09:02", kind: "content", text: { sr: "SEO članak objavljen na sajtu", en: "SEO article published to the site" } },
  { time: "10:44", kind: "call", text: { sr: "Propušten poziv · poslat SMS sa linkom za zakazivanje", en: "Missed call · booking-link text sent" } },
];
