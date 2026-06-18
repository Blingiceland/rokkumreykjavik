---
name: silkiprent-design
description: Use when designing, styling, or refining the visual look of the Rokk(um) Reykjavík site — any work on layout, typography, color, texture, hero sections, posters, components, or overall aesthetic. Encodes the vintage silkscreen rock-poster design language for the festival.
---

# Silkiprent rokk-plakat — hönnunarmál

Útlit Rokk(um) Reykjavík hermir eftir gömlu, handprentuðu silkiprent rokk-plakati. Markmið: handverk og attitude. Anti-markmið: sleikt, generískt, SaaS-legt festival-template.

## Týpógrafía (ber útlitið)

- Stór, þétt, sjálfsörugg fyrirsagnaletur. Condensed grótesk eða þung slab. Plakatið "öskrar" með stærð.
- Dramatískt stigveldi: risastórt vs. smátt, lítið þar á milli. Bandanöfn og dagsetningar mega vera gríðarstór.
- Þétt letterspacing á fyrirsögnum, jafnvel örlítið of þétt — plakat-tilfinning.
- Texti má brjótast yfir margar línur sem blokk, eins og settur í höndunum.
- Forðastu létt, loftkennt sans-serif sem lítur út eins og tæknifyrirtæki.

## Litir (silkiprent-rökfræði)

- Fá blek: 2–3 sterkir litir + svartur + pappírstónn. Aldrei full litaregnbogi.
- Örlítið desaturated / "óhrein" blek frekar en neon. Hugsaðu vintage prentblek.
- Hár kontröst milli bleks og pappírs.
- Pappírstónn er sjaldan hreinhvítur — beinhvítur, krem, eða gráleitur.

## Textúra og prentáhrif

- Misregistration: litalög örlítið úr stillingu (1–3px offset, kannski mismunandi mix-blend). Subtílt.
- Halftone-dottar eða grain ofan á fleti og myndir.
- Slitin/óregluleg brún á bleki þar sem það á við (rough edges, ekki pixel-skarpt alls staðar).
- Bygg ofan á núverandi grain-texture í `globals.css` — ekki skipta út, magnaðu.
- `mix-blend-mode: multiply` virkar vel fyrir silkiprent-lagskiptingu.

## Layout

- Plakat-uppbygging: sterkar blokkir, þétt grid, fyllt rými. Ekki hræðast stór svæði af lit.
- Dagskráin (4 nætur) má líta út eins og prentuð setlist.
- Asymmetría og handsett tilfinning > fullkomið miðjað grid.

## Hreyfing (Framer Motion)

- Lágstemmd og þung. Hægar transitions, lítið af spring-bounce.
- Styður stemninguna, sýnir sig ekki. Engin flashy parallax-sirkus.
- Virða alltaf `prefers-reduced-motion`.

## Rauð flögg — byrja upp á nýtt ef:

- Mjúkir gradient-skuggar / glassmorphism
- Skæri neon-litir án prent-rökfræði
- Þunnt loftkennt letur, mikið hvítt rými, "clean SaaS" fíling
- Útlit sem gæti verið hvaða viðburða-síða sem er

## Vinnubrögð

Eftir hverja útlitsbreytingu: keyrðu síðuna og taktu skjámynd (Playwright) til að meta út frá því sem sést — silkiprent-áhrif dæmast með augunum, ekki í kóða. Tékkaðu líka á þröngri (mobile) breidd.
