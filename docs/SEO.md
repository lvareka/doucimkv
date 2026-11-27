# SEO a viditelnost – plán krok za krokem

Cíl: objevit se na 1. místě pro **„doučování matematiky Karlovy Vary“** a podobné
fráze. Pro lokální službu je nejdůležitější **Google Business Profile** a **konzistentní
NAP** (jméno, adresa, telefon), teprve potom on-page a zpětné odkazy.

## Základní údaje (NAP) – držte je všude STEJNÉ

| Údaj | Hodnota |
|---|---|
| Název firmy | Doučování matematiky a fyziky – RNDr. Petr Vařeka (zkráceně „Doučování KV“) |
| Osoba | RNDr. Petr Vařeka |
| Telefon | 774 195 713 |
| E-mail | petrvareka@seznam.cz |
| Adresa | Konečná 897/9, 360 05 Karlovy Vary |
| Web | https://doucimkv.netlify.app |

> Pravidlo: na všech katalozích, profilech a odkazech uvádějte úplně stejný tvar
> (hlavně telefon `774 195 713` a adresu `Konečná 897/9`). Odlišnosti oslabují lokální SEO.

## Klíčové fráze (na co cílit)

1. doučování matematiky Karlovy Vary
2. doučování fyziky Karlovy Vary
3. doučování matematiky SŠ Karlovy Vary
4. doučování matematiky ZŠ Karlovy Vary
5. příprava na maturitu z matematiky Karlovy Vary
6. doučování matematiky online (pro distanční výuku)
7. reparát z matematiky Karlovy Vary

Tyto fráze by se měly přirozeně objevovat v nadpisech a textech (už se částečně
objevují v `src/content/pages/*.md`).

---

## Krok 1 – Google Business Profile (nejvyšší priorita)

Profi "Moje firma na Googlu" je pro lokální vyhledávání klíčové (mapa + lokální pack).

1. Jděte na https://business.google.com a přihlaste se.
2. **Vytvořit profil** – zadejte:
   - Název: **Doučování KV** (nebo celý název výše)
   - Kategorie: primární **„Soukromý učitel (Private tutor)“**, sekundární **„Doučovací centrum / Tutoring service“** (pokud kategorie v rozhraní existuje) – vyberte nejbližší dostupné.
   - Adresa: Konečná 897/9, 360 05 Karlovy Vary
   - Oblast služeb: Karlovy Vary a okolí (distančně celá ČR)
   - Telefon + web
3. **Ověření (verifikace):** Google nabídne video/telefon/pohlednici. Pro domácí
   službu obvykle stačí video, kde je vidět pracovní prostor, materiály a okolí.
   *IČO podmínkou není* – profil může mít i fyzická osoba.
4. Vyplňte **popis** (cca 600–700 znaků) – česky, s klíčovými frázemi, věcně.
   Vzor:
   > „Individuální doučování matematiky a fyziky v Karlových Varech pro ZŠ, SŠ i VŠ.
   > Absolvent MFF UK s více než 15 lety praxe. Příprava na maturitu, reparát a přijímací
   > zkoušky, pomoc s VŠ příklady i matematickou olympiádou. Prezenčně v Karlových Varech
   > i online. Domluvte si termín telefonicky nebo přes web.“
5. Přidejte **fotky**: portrét, tabule/výuka, pracovní místo. Reálné snímky,
   ne ilustrace.
6. Přidejte **služby + ceny**: „Doučování matematiky (prezenčně) 300 Kč/hod“,
   „Doučování fyziky“, „Distanční výuka 350 Kč/hod“, „Příprava na maturitu“,
   „Příklady na zakázku“.
7. **Pravidelně publikujte** (příspěvky „Post“): aktualizace ceníku, přijímám nové
   žáky, zajímavosti z matematiky. Ideálně 1× měsíčně.

## Krok 2 – firmy.cz, Mapy.cz a katalogy

Zápis do českých katalogů s NAP (a odkazem na web):

1. **Firmy.cz** (https://firmy.cz) – registrace, kategorie *Vzdělávání / doučování*.
2. **Mapy.cz** – nahlášení/oprava firmy na adrese.
3. **NajdiUcitele.cz** – profil doučovatele (matematika + fyzika, Karlovy Vary).
4. Volitelně: ZiveFirmy.cz, najisto.cz, regionální portály Karlových Varů.

Cíl: 5–10 konzistentních zápisů s odkazem → tzv. citace posilují NAP.

## Krok 3 – Google Search Console

1. https://search.google.com/search-console
2. **Add property** → zvolte **URL prefix** a zadejte `https://doucimkv.netlify.app/`.
3. **Ověření:** doporučeno přes **DNS** (při použití vlastní domény) nebo přes
   **HTML soubor** (nahrajte ověřovací soubor do `public/` a commit+push+deploy).
   U Netlify subdomény funguje i HTML meta „HTML tag“ vložený do `<head>` (BaseLayout).
4. Po ověření: **Sitemaps** → přidejte `sitemap-index.xml` → **Submit**.
5. **URL inspection** → zadejte hlavní URL → **Request indexing** (u nových stránek).
6. Sledujte: **Performance** (dotazy, pozice), **Coverage** (chyby), **Core Web Vitals**.

## Krok 4 – Bing Webmaster Tools

1. https://www.bing.com/webmasters → **Import from Google Search Console** (nejrychlejší).
2. Zalogujte sitemap (stejný jako u Googlu).

## Krok 5 – On-page (co už je hotové vs. co zbývá)

**Hotovo:** unikátní `title`/`description`, canonical, Open Graph, `lang="cs"`,
`robots.txt`, sitemap, JSON-LD (`EducationalOrganization` s adresou, GPS, `sameAs`,
`priceRange`; `FAQPage`; `Service`+`Offer`), responzivní a rychlé statické stránky,
stránka `/soukromi/` (GDPR).

**Zbývá:**

1. **Open Graph obrázek** 1200×630 px (`public/og-cover.jpg`) – ideálně fotka tabule
   nebo portrét. Až ho budete mít, přidejte do `BaseLayout.astro`:
   ```html
   <meta property="og:image" content="https://doucimkv.netlify.app/og-cover.jpg" />
   <meta name="twitter:image" content="https://doucimkv.netlify.app/og-cover.jpg" />
   ```
2. **Zpětný odkaz ze starého webu:** nasměrujte `doucimkv.wz.cz` na nový web 301
   (viz `README.md`, sekce 6) – převede to stávající návštěvnost a signály.
3. **Čerstvý obsah:** pravidelně aktualizujte `src/data/aktuality.json` (např. „přijímám
   nové žáky od září“). Aktivní web se řadí lépe.

## Krok 6 – recenze (nejsilnější lokální signál)

1. Po každém spokojeném doučování požádejte o recenzi na Googlu (pošlete přímý odkaz
   na profil z Business Profile → „Ask for reviews“).
2. Cíl: 5–10 recenzí postupně. Nejednorázově shánět hromadu (podezřelé).
3. Reagujte na každou recenzi (poděkujte), i na kritickou.

## Krok 7 – zpětné odkazy

- Zápisy z kroků 2 (katalogy) samy vytvoří odkazy.
- Facebook stránka firmy + skupiny Karlových Varů (nabídka doučování).
- Spolupráce s místními školami / stánky s letáky (offline → lidé napíšou web).
- Užitečný obsah na stránce Kvíz/příklady se dá sdílet (zajímavosti).

## Krok 8 – měření návštěvnosti (volitelné, později)

Web dnes **neužívá žádné analytické cookies** (záměrně, kvůli GDPR). Až budete chtít
statistiky bez consent banneru, nasaďte privacy-friendly nástroj **Plausible** nebo
**Umami** (bez cookies). Vyhněte se Google Analytics bez souhlasu – v ČR/EU to
vyžaduje obtěžující lištu.

## Kontrolní seznam po nasazení

- [ ] Produkce běží na nejnovější verzi (kvíz ZŠ/SŠ/VŠ, materiály, /soukromi).
- [ ] Formuláře odesílají a chodí e-mailová oznámení.
- [ ] `/sitemap-index.xml` vrací 200 a obsahuje všechny stránky.
- [ ] Google Search Console má nahraný sitemap.
- [ ] Google Business Profile založený a ověřený, s fotkami.
- [ ] Recenze přibývají.
- [ ] Starý web `doucimkv.wz.cz` přesměrovává 301 na nový.

## Jak pracovat dlouhodobě

| Frekvence | Akce |
|---|---|
| Týdně | Odpovídat na recenze a dotazy z formulářů |
| Měsíčně | 1 příspěvek na Business Profile, kontrola Search Console |
| Čtvrtletně | 1 nová aktualita / příklad, kontrola pozic klíčových frází |
| Pololetně | Zkontrolovat NAP ve všech katalozích, doplnit recenze |