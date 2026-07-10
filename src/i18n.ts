/**
 * Bilingual copy — Serbian (default) + English.
 * Each language is written natively, not translated word-for-word.
 *
 * Serbian is baked into index.html as the static default (SEO).
 * On toggle, main.ts swaps text for every [data-i18n] / [data-i18n-html]
 * element and every attribute listed in [data-i18n-attr].
 */

export type Lang = "sr" | "en";

type Entry = { sr: string; en: string };

export const meta: Record<"title" | "description", Entry> = {
  title: {
    sr: "Double O — AI sistemi koji pretvaraju pažnju u prihod, 24/7",
    en: "Double O — AI systems that turn attention into revenue, 24/7",
  },
  description: {
    sr: "Gotovi AI sistemi za vaš biznis: recepcioner koji odgovara na svaki poziv, reaktivacija starih lead-ova, trenutni odgovor na upite i sadržaj koji vas drži vidljivim. Zakažite besplatan strateški poziv.",
    en: "Done-for-you AI systems for your business: a receptionist that answers every call, cold-lead reactivation, instant lead response and content that keeps you visible. Book a free strategy call.",
  },
};

export const t: Record<string, Entry> = {
  "skip": { sr: "Preskoči na sadržaj", en: "Skip to content" },

  // ── Header / nav ──────────────────────────────────────────────
  "nav.solutions": { sr: "Rešenja", en: "Solutions" },
  "nav.process": { sr: "Proces", en: "Process" },
  "nav.why": { sr: "Zašto Double O", en: "Why Double O" },
  "nav.contact": { sr: "Kontakt", en: "Contact" },
  "nav.cta": { sr: "Zakaži poziv", en: "Book a call" },
  "nav.menuOpen": { sr: "Otvori meni", en: "Open menu" },
  "nav.menuClose": { sr: "Zatvori meni", en: "Close menu" },
  "nav.langLabel": { sr: "Izbor jezika", en: "Language selection" },

  // ── Hero ──────────────────────────────────────────────────────
  "hero.status": { sr: "Sistem aktivan · 00:00–24:00", en: "System active · 24/7" },
  "hero.h1": {
    sr: "Svaki poziv odgovoren. Svaki lead ispraćen. <em>I u tri ujutru.</em>",
    en: "Every call answered. Every lead followed up. <em>Even at 3 a.m.</em>",
  },
  "hero.sub": {
    sr: "Double O gradi gotove AI sisteme koji rade umesto vas: javljaju se na telefon, zakazuju termine, vraćaju stare lead-ove i drže vaš brend prisutnim — bez ijednog novog zapošljavanja.",
    en: "Double O builds done-for-you AI systems that work in your place: they answer the phone, book appointments, bring old leads back and keep your brand visible — without a single new hire.",
  },
  "hero.ctaPrimary": { sr: "Zakaži besplatan poziv", en: "Book a free call" },
  "hero.ctaSecondary": { sr: "Pogledaj rešenja", en: "See the solutions" },
  "hero.note": {
    sr: "Besplatan strateški poziv · bez obaveze · plan dobijate u svakom slučaju",
    en: "Free strategy call · no obligation · you keep the plan either way",
  },

  // Live ops log (signature element)
  "log.title": { sr: "Dežurni dnevnik", en: "Operations log" },
  "log.shift": { sr: "noćna smena", en: "night shift" },
  "log.caption": {
    sr: "Ovako izgleda tipična noć kad sistem radi za vas.",
    en: "What a typical night looks like once the system runs for you.",
  },

  // Status strip
  "strip.calls": { sr: "Pozivi", en: "Calls" },
  "strip.callsV": { sr: "odgovoreni", en: "answered" },
  "strip.leads": { sr: "Lead-ovi", en: "Leads" },
  "strip.leadsV": { sr: "ispraćeni", en: "followed up" },
  "strip.content": { sr: "Objave", en: "Posts" },
  "strip.contentV": { sr: "zakazane", en: "scheduled" },
  "strip.hours": { sr: "Radno vreme", en: "Business hours" },
  "strip.hoursV": { sr: "ne postoji", en: "don’t exist" },

  // ── Problem → outcome ────────────────────────────────────────
  "problem.kicker": { sr: "Problem", en: "The problem" },
  "problem.h2": {
    sr: "Gde vam <em>curi</em> prihod",
    en: "Where your revenue <em>leaks</em>",
  },
  "problem.intro": {
    sr: "Mali biznisi ne gube poslove zato što loše rade. Gube ih zato što se ne jave na vreme, ne isprate upit i nestanu sa mreža. To nisu tri sitnice — to su tri rupe kroz koje ističe novac koji ste već platili da privučete.",
    en: "Small businesses don’t lose work because they’re bad at it. They lose it because nobody picks up in time, nobody follows up, and the brand goes quiet. Those aren’t three small flaws — they’re three holes draining money you already paid to attract.",
  },
  "problem.l1.time": { sr: "17:32, utorak", en: "5:32 pm, Tuesday" },
  "problem.l1.leak": {
    sr: "Telefon zvoni. Vi ste usred posla. Klijent posle četvrtog zvona zove sledećeg iz Google pretrage — i zakazuje kod njega.",
    en: "The phone rings. You’re mid-job. After the fourth ring the caller dials the next result on Google — and books with them.",
  },
  "problem.l1.fix": {
    sr: "AI recepcioner preuzima poziv na prvo zvono i zakazuje termin pre nego što klijent uopšte pomisli na konkurenciju.",
    en: "The AI receptionist picks up on the first ring and books the appointment before the caller ever thinks of a competitor.",
  },
  "problem.l2.time": { sr: "Baza kontakata", en: "Your contact list" },
  "problem.l2.leak": {
    sr: "Stotine starih upita stoje u tabeli. Svaki od njih ste već platili — oglasima, vremenom, radom. Niko ih više ne zove.",
    en: "Hundreds of old enquiries sit in a spreadsheet. You already paid for every one of them — in ads, time and work. Nobody calls them anymore.",
  },
  "problem.l2.fix": {
    sr: "Reaktivacija ih kontaktira s konkretnim razlogom da se vrate. Prihod iz liste koja je do juče samo stajala.",
    en: "Reactivation reaches out with a concrete reason to come back. Revenue from a list that was just sitting there.",
  },
  "problem.l3.time": { sr: "Nedelje tišine", en: "Weeks of silence" },
  "problem.l3.leak": {
    sr: "Profil koji ćuti izgleda kao zatvorena radnja. Klijenti vas ne nalaze na Google-u, a poverenje se topi sa svakom nedeljom bez objave.",
    en: "A quiet profile looks like a closed shop. Customers can’t find you on Google, and trust erodes with every week you don’t post.",
  },
  "problem.l3.fix": {
    sr: "Sistem za sadržaj objavljuje umesto vas — dosledno, u vašem tonu — i piše SEO tekstove zbog kojih vas Google predlaže.",
    en: "The content system publishes for you — consistently, in your voice — and writes the SEO articles that make Google recommend you.",
  },
  "problem.leakLabel": { sr: "Curenje", en: "The leak" },
  "problem.fixLabel": { sr: "Double O", en: "Double O" },
  "problem.outro": {
    sr: "Rešenje nije još jedno zapošljavanje. Rešenje je sistem koji nikad ne spava, ne zaboravlja i ne traži pauzu.",
    en: "The answer isn’t another hire. It’s a system that never sleeps, never forgets and never asks for a break.",
  },

  // ── Solutions ────────────────────────────────────────────────
  "solutions.kicker": { sr: "Rešenja", en: "Solutions" },
  "solutions.h2": {
    sr: "Pet sistema. Jedan cilj: <em>ništa ne propuštate.</em>",
    en: "Five systems. One goal: <em>you miss nothing.</em>",
  },
  "solutions.intro": {
    sr: "Ne prodajemo softver sa cenovnikom. Biramo sistem koji zatvara najveću rupu u vašem prihodu — i gradimo ga do kraja, u glasu vašeg brenda.",
    en: "We don’t sell software off a price list. We pick the system that closes the biggest hole in your revenue — and build it end to end, in your brand’s voice.",
  },
  "solutions.idealFor": { sr: "Idealno za", en: "Ideal for" },

  // 01 — AI Inbound Receptionist
  "s1.name": { sr: "AI recepcioner", en: "AI Inbound Receptionist" },
  "s1.h3": {
    sr: "Nula propuštenih poziva. Nula izgubljenih termina.",
    en: "Zero missed calls. Zero lost bookings.",
  },
  "s1.body": {
    sr: "Javlja se na svaki dolazni poziv u glasu vašeg brenda — zna vaše usluge, cene i raspored. Zakazuje termine direktno u kalendar, odgovara na česta pitanja, filtrira spam, a poziv koji traži čoveka prosleđuje vama. Radi non-stop: klijent koji zove u 21:40 dobija isti tretman kao onaj u podne.",
    en: "It answers every incoming call in your brand’s voice — it knows your services, prices and schedule. It books appointments straight into your calendar, handles common questions, screens out spam, and hands anything that needs a human over to you. It never clocks out: the caller at 9:40 pm gets the same treatment as the one at noon.",
  },
  "s1.ideal": {
    sr: "ordinacije, salone, stomatologe, servise, restorane — svaki posao gde telefon donosi novac",
    en: "clinics, salons, dental practices, repair shops, restaurants — any business where the phone brings in money",
  },
  // receptionist vignette: call transcript
  "s1.v.header": { sr: "Dolazni poziv · 21:47", en: "Incoming call · 9:47 pm" },
  "s1.v.caller": {
    sr: "Dobro veče, da li radite subotom? Trebalo bi mi šišanje…",
    en: "Hi, are you open Saturdays? I’d need a haircut…",
  },
  "s1.v.agent": {
    sr: "Radimo! Subota u 11:00 je slobodna — da vas upišem?",
    en: "We are! Saturday 11:00 is free — shall I book you in?",
  },
  "s1.v.result": { sr: "✓ Termin zakazan · ubačen u kalendar", en: "✓ Booked · added to calendar" },

  // 02 — Lead Reactivation
  "s2.name": { sr: "Reaktivacija lead-ova", en: "Lead Reactivation" },
  "s2.h3": {
    sr: "Prihod iz baze koju već imate.",
    en: "Revenue from the list you already own.",
  },
  "s2.body": {
    sr: "Glasovni agent (radi i preko emaila) zove vaše stare i neaktivne kontakte s konkretnim razlogom da se vrate — promocija, kontrola, slobodan termin. Poznaje istoriju svakog kontakta i vaš biznis, pa razgovor zvuči kao briga, a ne kao prodaja. Te ljude ste već platili da ih privučete; ovo je naplata drugog dela.",
    en: "A voice agent (email works too) calls your old and inactive contacts with a concrete reason to return — a promotion, a check-up, an open slot. It knows each contact’s history and your business, so the conversation lands as care, not a sales pitch. You already paid to acquire these people; this collects the part you never did.",
  },
  "s2.ideal": {
    sr: "svaki biznis sa bazom starih ili nekonvertovanih upita",
    en: "any business sitting on a database of past or unconverted leads",
  },
  // reactivation vignette: list with statuses
  "s2.v.header": { sr: "Kampanja: stara baza · dan 3", en: "Campaign: old list · day 3" },
  "s2.v.r1n": { sr: "M. Petrović · upit iz marta", en: "M. Harris · enquiry from March" },
  "s2.v.r1s": { sr: "termin zakazan", en: "booked" },
  "s2.v.r2n": { sr: "J. Ilić · neaktivan 14 meseci", en: "J. Cole · inactive 14 months" },
  "s2.v.r2s": { sr: "zainteresovan — prati se", en: "interested — following up" },
  "s2.v.r3n": { sr: "S. Marković · nekonvertovan", en: "S. Brooks · unconverted" },
  "s2.v.r3s": { sr: "poziv zakazan za sutra", en: "call scheduled tomorrow" },

  // 03 — Speed to Lead
  "s3.name": { sr: "Speed to Lead", en: "Speed to Lead" },
  "s3.h3": {
    sr: "Prvi stižete do svakog upita. Uvek.",
    en: "You reach every lead first. Every time.",
  },
  "s3.body": {
    sr: "Onog trenutka kad neko ostavi podatke — kroz oglas, formu ili poruku — sistem ga zove ili mu piše. Ne sutra, ne za dva sata: odmah, dok je interesovanje na vrhuncu i dok konkurencija još nije ni videla upit. Isti budžet za oglase, više zakazanih poslova.",
    en: "The moment someone leaves their details — through an ad, a form, a message — the system calls or writes to them. Not tomorrow, not in two hours: right now, while interest is at its peak and before your competitors have even seen the enquiry. Same ad budget, more booked work.",
  },
  "s3.ideal": {
    sr: "biznise koji vode plaćene oglase ili primaju upite kroz forme",
    en: "businesses running paid ads or collecting inbound form leads",
  },
  // speed vignette: timeline
  "s3.v.header": { sr: "Novi lead · Meta oglas", en: "New lead · Meta ad" },
  "s3.v.t1": { sr: "Prijava primljena", en: "Form submitted" },
  "s3.v.t2": { sr: "Sistem poziva lead", en: "System calls the lead" },
  "s3.v.t3": { sr: "Razgovor u toku…", en: "Conversation running…" },
  "s3.v.note": { sr: "konkurencija: još nije ni otvorila upit", en: "competitors: haven’t even opened it" },

  // 04 — Content Dashboard
  "s4.name": { sr: "Content Dashboard", en: "Content Dashboard" },
  "s4.h3": {
    sr: "Brend koji nikad ne ućuti.",
    en: "A brand that never goes quiet.",
  },
  "s4.body": {
    sr: "Kompletne, spremne objave za društvene mreže — vizual, tekst, raspored — plus SEO blog tekstovi za sajt. Kvalitet i ritam koji se ne oslanjaju na to da li je neko „stigao da objavi“. Publika vas viđa svake nedelje, a Google vas nalazi kad neko traži ono što radite.",
    en: "Complete, ready-to-post social content — visual, copy, schedule — plus SEO blog articles for your site. Quality and rhythm that don’t depend on whether anyone “got around to posting”. Your audience sees you every week, and Google finds you when someone searches for what you do.",
  },
  "s4.ideal": {
    sr: "brendove koji objavljuju neredovno ili su potpuno utihnuli",
    en: "brands that post inconsistently or have gone quiet altogether",
  },
  // content vignette: week strip
  "s4.v.header": { sr: "Ova nedelja · spremno za objavu", en: "This week · ready to post" },
  "s4.v.d1": { sr: "Pon", en: "Mon" },
  "s4.v.d2": { sr: "Uto", en: "Tue" },
  "s4.v.d3": { sr: "Sre", en: "Wed" },
  "s4.v.d4": { sr: "Čet", en: "Thu" },
  "s4.v.d5": { sr: "Pet", en: "Fri" },
  "s4.v.p1": { sr: "objava", en: "post" },
  "s4.v.p2": { sr: "reel", en: "reel" },
  "s4.v.p3": { sr: "objava", en: "post" },
  "s4.v.p4": { sr: "SEO blog", en: "SEO blog" },
  "s4.v.p5": { sr: "objava", en: "post" },

  // 05 — AI UGC Creatives
  "s5.name": { sr: "AI UGC kreative", en: "AI UGC Creatives" },
  "s5.h3": {
    sr: "Više kreativa, brže testiranje, deo cene.",
    en: "More creatives, faster testing, a fraction of the cost.",
  },
  "s5.body": {
    sr: "UGC video oglasi generisani AI-jem — bez potrage za kreatorima, bez čekanja na snimanje, bez honorara po klipu. Kad vaši oglasi žive od obima kreativa, ovo je razlika između tri varijante mesečno i trideset: više testova, brže učenje, niža cena po pobedničkom oglasu.",
    en: "UGC-style video ads generated with AI — no creator hunting, no waiting on shoots, no per-clip fees. When your ads live and die by creative volume, this is the difference between three variants a month and thirty: more tests, faster learning, a lower cost per winning ad.",
  },
  "s5.ideal": {
    sr: "e-commerce i DTC brendove koji se oslanjaju na UGC oglase",
    en: "e-commerce and DTC brands that rely on UGC ads",
  },
  // ugc vignette: variant tiles
  "s5.v.header": { sr: "Serija kreativa · proizvod X", en: "Creative batch · product X" },
  "s5.v.v1": { sr: "hook A", en: "hook A" },
  "s5.v.v2": { sr: "hook B", en: "hook B" },
  "s5.v.v3": { sr: "hook C", en: "hook C" },
  "s5.v.v4": { sr: "+ još 9", en: "+ 9 more" },
  "s5.v.status": { sr: "u testiranju", en: "testing" },

  // ── Process (work order) ─────────────────────────────────────
  "process.kicker": { sr: "Proces", en: "Process" },
  "process.h2": {
    sr: "Od poziva do sistema koji radi",
    en: "From one call to a running system",
  },
  "process.docLabel": { sr: "Radni nalog · Double O", en: "Work order · Double O" },
  "process.docNo": { sr: "br. 00", en: "no. 00" },
  "process.s1.title": { sr: "Besplatan strateški poziv", en: "Free strategy call" },
  "process.s1.body": {
    sr: "Prolazimo kroz vaš način rada i nalazimo tačno gde prihod curi: propušteni pozivi, zaboravljeni upiti, mrtva baza, tišina na mrežama. Izlazite sa konkretnim planom — sarađivali sa nama posle ili ne.",
    en: "We walk through how you operate and pinpoint exactly where revenue leaks: missed calls, forgotten enquiries, a dead list, silence online. You leave with a concrete plan — whether you work with us afterwards or not.",
  },
  "process.s2.title": { sr: "Mi gradimo sistem", en: "We build the system" },
  "process.s2.body": {
    sr: "Sve radimo mi, od početka do kraja: sistem uči vaš glas, vaše usluge i vaša pravila, i povezuje se s alatima koje već koristite — kalendar, telefon, CRM. Vi ne dirate ništa.",
    en: "We do everything, end to end: the system learns your voice, your services and your rules, and plugs into the tools you already use — calendar, phone, CRM. You don’t touch a thing.",
  },
  "process.s3.title": { sr: "Sistem radi — vi gledate rezultate", en: "It runs — you watch the results" },
  "process.s3.body": {
    sr: "Termini se pune, stari kontakti se javljaju, objave izlaze na vreme. Vi se bavite poslom koji znate — sistem se bavi onim što ste do sada propuštali.",
    en: "The calendar fills, old contacts write back, posts go out on time. You do the work you know — the system handles everything you used to miss.",
  },

  // ── Why Double O ─────────────────────────────────────────────
  "why.kicker": { sr: "Zašto Double O", en: "Why Double O" },
  "why.h2": {
    sr: "Ne prodajemo tehnologiju. <em>Prodajemo rezultat.</em>",
    en: "We don’t sell technology. <em>We sell the result.</em>",
  },
  "why.body": {
    sr: "Prvo smo ljudi iz marketinga i operacija, pa tek onda „AI“. Tehnologija je alat — ono što vi dobijate su zakazani termini, vraćeni lead-ovi, veća konverzija iz istog budžeta i brend koji je uvek prisutan. Ako sistem to ne donosi, ne gradimo ga.",
    en: "We’re marketing and operations people first, “AI” second. Technology is the tool — what you get is booked appointments, revived leads, higher conversion from the same budget, and a brand that’s always present. If a system doesn’t deliver that, we don’t build it.",
  },
  "why.p1.t": { sr: "Sve radimo mi", en: "Done for you" },
  "why.p1.b": {
    sr: "Od strategije do puštanja u rad. Vaš posao je da radite svoj posao.",
    en: "From strategy to go-live. Your job is to keep running your business.",
  },
  "why.p2.t": { sr: "Uvek dostupni", en: "Always on" },
  "why.p2.b": {
    sr: "Potpuno remote, na vezi 24/7 — kao i sistemi koje gradimo.",
    en: "Fully remote, reachable 24/7 — same as the systems we build.",
  },
  "why.p3.t": { sr: "Cena po projektu", en: "Priced per project" },
  "why.p3.b": {
    sr: "Bez cenovnika i paketa. Prvo utvrdimo šta vam donosi novac, pa dogovorimo projekat — vrednost koju dobijete uvek premašuje cenu koju platite.",
    en: "No price list, no tiers. We establish what makes you money first, then scope the project — the value you receive always exceeds the price you pay.",
  },

  // ── Final CTA ────────────────────────────────────────────────
  "cta.h2": {
    sr: "Saznajte gde vam <em>curi</em> prihod.",
    en: "Find out where your revenue is <em>leaking.</em>",
  },
  "cta.body": {
    sr: "Kratak poziv, konkretan plan, nula obaveze. Ako posle poziva odlučite da sve uradite sami — plan vam ostaje.",
    en: "A short call, a concrete plan, zero obligation. If you decide to do it all yourself afterwards — the plan is yours to keep.",
  },
  "cta.button": { sr: "Zakaži besplatan strateški poziv", en: "Book a free strategy call" },
  "cta.micro": { sr: "30 minuta · online · bez pripreme", en: "30 minutes · online · no prep needed" },

  // ── Contact ──────────────────────────────────────────────────
  "contact.kicker": { sr: "Kontakt", en: "Contact" },
  "contact.h2": { sr: "Radije pišete nego pričate?", en: "Rather write than talk?" },
  "contact.body": {
    sr: "Opišite nam ukratko čime se bavite i šta vas trenutno koči. Odgovaramo u roku od 24 sata — obično mnogo brže.",
    en: "Tell us briefly what you do and what’s holding you back right now. We reply within 24 hours — usually much faster.",
  },
  "contact.name": { sr: "Ime i prezime", en: "Full name" },
  "contact.email": { sr: "Email adresa", en: "Email address" },
  "contact.business": { sr: "Biznis / sajt", en: "Business / website" },
  "contact.message": { sr: "Poruka", en: "Message" },
  "contact.messagePh": {
    sr: "Npr: vodimo stomatološku ordinaciju, propuštamo pozive posle 17h…",
    en: "E.g. we run a dental practice and miss every call after 5 pm…",
  },
  "contact.send": { sr: "Pošalji poruku", en: "Send message" },
  "contact.sending": { sr: "Šalje se…", en: "Sending…" },
  "contact.success": {
    sr: "Poruka je stigla. Javljamo se u roku od 24 sata — verovatno i brže.",
    en: "Message received. We’ll get back to you within 24 hours — probably sooner.",
  },
  "contact.error": {
    sr: "Nešto je zapelo pri slanju. Pokušajte ponovo — ili nam pišite direktno na hello@doubleo.agency.",
    en: "Something went wrong while sending. Try again — or write to us directly at hello@doubleo.agency.",
  },

  // ── Footer ───────────────────────────────────────────────────
  "footer.tag": {
    sr: "Sistemi koje gradimo ne spavaju. Zato možete vi.",
    en: "The systems we build don’t sleep. So you can.",
  },
  "footer.solutions": { sr: "Rešenja", en: "Solutions" },
  "footer.process": { sr: "Proces", en: "Process" },
  "footer.contact": { sr: "Kontakt", en: "Contact" },
  "footer.rights": { sr: "Sva prava zadržana.", en: "All rights reserved." },
};

/** Live ops-log feed — localized entries cycled by main.ts */
export const logFeed: { time: string; text: Entry; kind: "call" | "lead" | "content" | "spam" }[] = [
  { time: "02:41", kind: "call", text: { sr: "Dolazni poziv preuzet · termin zakazan za četvrtak 14:00", en: "Incoming call answered · appointment booked, Thursday 2 pm" } },
  { time: "03:07", kind: "lead", text: { sr: "Novi lead iz oglasa · pozvan 40 sekundi nakon prijave", en: "New ad lead · called 40 seconds after signup" } },
  { time: "04:56", kind: "spam", text: { sr: "Spam poziv prepoznat i filtriran", en: "Spam call detected and screened out" } },
  { time: "06:12", kind: "lead", text: { sr: "Stari kontakt odgovorio na ponudu · prosleđen vama", en: "Old contact replied to the offer · handed over to you" } },
  { time: "07:30", kind: "content", text: { sr: "Nedeljne objave spremne za pregled", en: "This week’s posts ready for review" } },
  { time: "08:15", kind: "call", text: { sr: "Pitanje o cenama odgovoreno · poslat podsetnik za termin", en: "Pricing question answered · appointment reminder sent" } },
  { time: "09:02", kind: "content", text: { sr: "SEO članak objavljen na sajtu", en: "SEO article published to the site" } },
  { time: "10:44", kind: "lead", text: { sr: "Lead iz forme pozvan · razgovor prebačen na vas", en: "Form lead called · conversation routed to you" } },
];
