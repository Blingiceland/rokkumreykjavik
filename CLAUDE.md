# Rokk í Reykjavík

Vefsíða fyrir rokkhátíð á Dillon. **Dillon og Rás 2 kynna: Rokk í Reykjavík 2026.** Fjórir laugardagar í júlí. Sextán bönd. Ein borg sem þarf að heyrast.

Nafnið vísar í cult-heimildarmyndina *Rokk í Reykjavík* (1982) og er notað með blessun Rás 2 — farðu vel með það, þetta er ekki orðaleikur. **Aðgangur er alltaf ókeypis — engin miðasala.**

## Stakkur

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (hreyfing)
- lucide-react (ikon)
- Self-hosted fonts, mobile-first, Vercel deploy

## Hvar gögnin liggja

Allt er gagnadrifið — aldrei harðkóða lineup inn í component.

- `src/data/artists.ts` — bönd (16), vísað til með `id`. Hér býr líka `Artist`-týpan (PUBLIC schema — sjá privacy-reglu að neðan).
- `src/data/events.ts` — 4 laugardagar, event-meta, valfrjálsar tímasetningar (`setTimes`).
- `src/data/site.ts` — nafn, ár, kynnendur, venue.
- `src/data/sponsors.ts` — styrktaraðilar.

Til að breyta lineup: editaðu `artists.ts` og `events.ts`. Hver dagur vísar í bönd með `id`. Tímasetningar eru í vinnslu — tómar `setTimes` rendrast snyrtilega sem „væntanlegt".

## ⚠️ Privacy-regla sem má ALDREI brjóta

Innri lineup-gögn innihalda gjöld/kostnað listamanna. **Þetta má aldrei birtast á opinberu síðunni.**

- `Artist` týpan í `types.ts` hefur ENGAN reit fyrir fjárhagstölur — ekki bæta slíkum reit við.
- `scripts/check-no-financials.mjs` keyrir á hverju buildi og fellir buildið ef bannað fjárhagsreitanafn finnst.
- Keyrðu `npm run guard` hvenær sem er til að tékka.

Þegar þú vinnur með gögn listamanna: aldrei flytja kostnaðar-/gjaldaupplýsingar inn í neitt sem rendrast.

## Hönnunarstefna — silkiprent rokk-plakat

Útlitið á að líta út eins og gamalt, handprentað rokk-plakat. Blek á ódýran pappír. Það hefur attitude og handverk — EKKI sleikt, EKKI generískt festival-template.

**Meginreglur:**
- **Týpógrafía ber útlitið.** Stór, þétt, sjálfsörugg. Þjöppuð condensed/extended slabs eða grótesk. Týpó-stigveldi á að vera dramatískt — risastórt á móti smáu, lítið þar á milli.
- **Misregistration.** Litalög sem renna örlítið til, eins og prentvél sem hitti ekki nákvæmlega. Subtílt, ekki glundroði.
- **Takmörkuð paletta.** Silkiprent notar fá blek. 2–3 sterkir litir + svartur + pappírstónn. Litir mega virðast aðeins "óhreinir" / desaturated, ekki neon-skærir.
- **Pappírs- og blek-textúra.** Grain, halftone-dottar, slitin brún á bleki. Bygg ofan á núverandi grain-setup.
- **Lágstemmd hreyfing.** Framer Motion á að styðja, ekki sýna sig. Hægar, þungar transitions sem passa við þéttan plakat-fíling. Virða `prefers-reduced-motion`.
- **Engin gljáandi áhrif.** Engir mjúkir gradient-skuggar, engin glassmorphism, engin sleik SaaS-útlit. Ef það lítur út eins og venjuleg landing page — byrja upp á nýtt.

**Litaval:** frjálst, en haltu þig við silkiprent-rökfræði — fá blek, örlítið desaturated, sterk kontröst. Hugsaðu vintage gig-poster en ekki Pantone-skærleika.

## Vinnubrögð

- Þegar þú breytir útliti: keyrðu síðuna, taktu skjámynd með Playwright og metið út frá því sem SÉST, ekki bara kóðanum.
- Mobile-first. Tékkaðu alltaf á þröngri breidd.
- Haltu accessibility: kontröst, focus-states, alt-textar, semantísk HTML.
- Smáar, afmarkaðar breytingar. Sýndu útkomu áður en haldið er áfram.
