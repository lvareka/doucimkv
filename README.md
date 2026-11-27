# Doučování matematiky a fyziky – Karlovy Vary (moderní web)

Nová verze webu `doucimkv.wz.cz` postavená na **Astro** + **Sveltia CMS** (nástupce
Decap CMS) + **Netlify**. Web je **hotový**: moderní responzivní design, plný obsah
(Úvod, Forma doučování, Ceník, Kvíz, Pravidla, FAQ, Kontakt), interaktivní kvíz
s příklady a zajímavostmi, formuláře (Netlify Forms), FAQ a SEO (sitemap, JSON-LD, meta).
Obsah lze pohodlně upravovat v prohlížeči přes CMS.

## Je to zdarma?

| Služba | Zdarma? | Poznámka |
|---|---|---|
| **GitHub** | ✅ Ano | Veřejné i soukromé repozitáře zdarma. Netlify staví z Gitu, Actions nejsou potřeba. |
| **Netlify** | ✅ Ano (free plán) | V roce 2026 je free plán **kreditní: ~300 kreditů/měsíc** (cca ~15 GB provozu nebo ~20 produkčních buildů). Pro web s nízkou návštěvností to bohatě stačí. Obsahuje vlastní doménu, SSL, deploy z Gitu a formuláře. |
| **Sveltia CMS** | ✅ Ano | Open-source, běží v prohlížeči, soubory ukládá do Gitu. |
| **Netlify Forms** | ✅ Ano | Kontaktní a rezervační formulář, oznámení na e-mail. |

> ⚠️ Pozn. k CMS: klasická kombinace *Decap + Netlify Identity + Git Gateway* už není
> spolehlivá (Git Gateway byl opuštěn). Proto používáme **Sveltia CMS s GitHub backendem**
> – 100% zdarma a bez závislosti na Git Gateway.

## Požadavky (pro lokální vývoj)

- **Node.js 20+** a npm (stačí jednorázově nainstalovat z nodejs.org)
- Git

> Build byl lokálně ověřen (Astro 5, Node 22 LTS) a web se korektně sestaví i na
> Netlify. Pro lokální vývoj stačí doinstalovat Node z nodejs.org.

## Lokální spuštění

```bash
npm install
npm run dev          # http://localhost:4321
```

### CMS lokálně (volitelné)

```bash
# v jednom terminálu:
npx decap-server
# v druhém:
npm run dev          # admin: http://localhost:4321/admin/
```

(`local_backend: true` v `public/admin/config.yml` umožní editaci bez přihlášení.)

## 1) GitHub – založení repozitáře

1. Přihlaste se / zaregistrujte na **github.com** (zdarma).
2. **New repository** → název `doucimkv` → (nechte prázdné, bez README) → **Create**.
   *(Už hotovo: `https://github.com/lvareka/doucimkv`.)*
3. V kořeni projektu spusťte (git identitu nastavte, jen pokud ještě není):

```bash
git config user.name "Vaše Jméno"
git config user.email "vas@email.cz"
git add .
git commit -m "Moderní web: Astro + Sveltia CMS + Netlify"
git remote add origin https://github.com/lvareka/doucimkv.git
git branch -M main
git push -u origin main
```

> Při prvním `git push` se otevře přihlášení do GitHubu (Git Credential Manager).
> Dokončete ho v prohlížeči. Push spouštějte ve svém terminálu – v sandboxu se
> přihlášení zablokuje.

## 2) Netlify – nasazení

1. Zaregistrujte se na **netlify.com** přes GitHub (zdarma).
2. **Add new site → Import an existing project → GitHub** → vyberte repo `doucimkv`.
3. Build command: `npm run build`, Publish directory: `dist` (už je v `netlify.toml`).
4. **Deploy site**. Adresu webu pak změňte v *Site settings → Change site name*
   (např. `doucimkv.netlify.app`).
5. Až bude hotovo, upravte `site` v `astro.config.mjs` a `site_url`/`display_url`
   v `public/admin/config.yml` na skutečnou adresu.

## 3) CMS – přihlášení (GitHub OAuth)

`repo` v `public/admin/config.yml` je nastavené na `lvareka/doucimkv`. Přihlášení do
`/admin` zajišťuje OAuth proxy, kterou tento repozitář obsahuje jako **Netlify Edge
Function** (`netlify/edge-functions/oauth.js`) – není potřeba Cloudflare ani Jiný účet.

1. Vytvořte **GitHub OAuth App** (*GitHub → Settings → Developer settings → OAuth Apps*):
   - Homepage URL: `https://doucimkv.netlify.app`
   - Authorization callback URL: `https://doucimkv.netlify.app/callback`
2. V Netlify nastavte proměnné prostředí `GITHUB_CLIENT_ID` a `GITHUB_CLIENT_SECRET`
   (volitelně `ALLOWED_DOMAINS`). Po změně proměnných je nutný **nový produkční deploy**,
   aby se Edge Function překreslila s aktuálními hodnotami.
3. `base_url` v `public/admin/config.yml` už míří na `https://doucimkv.netlify.app`
   (stejná adresa jako web).

Adresy proxy: `/auth` (přesměruje na GitHub), `/callback` (výměna kódu za token).

## 4) Formuláře (Netlify Forms)

Na stránce Kontakt jsou dva formuláře: **rezervace termínu** a **kontaktní formulář**.
Netlify je registruje automaticky ze statického HTML (`data-netlify="true"`). Odeslání
se ukládají v Netlify a přeposílají na e-mail – nastavte v *Forms → Notifications*.
Po odeslání se zobrazí stránka `/dekujeme`.

## 5) SEO – co je připraveno a co doplnit

Hotovo:
- `lang="cs"`, unikátní `title`/`description`, canonical, Open Graph, `robots.txt`
- sitemap (`@astrojs/sitemap`) → `/sitemap-index.xml`
- JSON-LD: `EducationalOrganization` + `Person` + `Service` + `Offer` + `FAQPage` (areaServed: Karlovy Vary)
- responzivní design, rychlý statický výstup

Zbývá (mimo kód – pro dosažení #1):
- **Google Business Profile** (Moje firma na Googlu) – klíčové pro lokální SEO
- Zápisy v katalozích (Firmy.cz, Mapy.cz, NajdiUcitele.cz), konzistentní NAP
- Zpětné odkazy a recenze
- Volitelně Open Graph obrázek (1200×630)

## 6) Starý web (doucimkv.wz.cz) a přesměrování

Starý web běží na WZ hostingu (HTTP i port 8080). Aby návštěvníci i vyhledávače
přecházeli na novou verzi, přidejte do `.htaccess` ve složce `web` na WZ tyto přesměrování:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?doucimkv\.wz\.cz(:8080)?$ [NC]
RewriteRule ^forma\.html$ https://doucimkv.netlify.app/forma/ [R=301,L]
RewriteRule ^podminky\.html$ https://doucimkv.netlify.app/pravidla/ [R=301,L]
RewriteRule ^cenik\.html$ https://doucimkv.netlify.app/cenik/ [R=301,L]
RewriteRule ^kontakt\.html$ https://doucimkv.netlify.app/kontakt/ [R=301,L]
RewriteRule ^(index\.html)?$ https://doucimkv.netlify.app/ [R=301,L]
RewriteRule ^ https://doucimkv.netlify.app/ [R=301,L]
```

> ⚠️ Ve starém `forma.html` je zakomentovaný PHP blok s přihlašovacími údaji k databázi
> a soubor je veřejně dostupný. Po nasměrování ho z hostingu smažte a heslo změňte,
> pokud se ještě někde používá.

## Struktura

```
astro.config.mjs        # konfigurace Astro (site = URL webu) + sitemap
netlify.toml            # build příkazy pro Netlify
netlify/edge-functions/ # OAuth proxy pro CMS (bez Cloudflare)
public/admin/           # Sveltia CMS (index.html + config.yml)
public/robots.txt
public/favicon.svg
src/styles/global.css   # design systém
src/layouts/            # BaseLayout.astro (hlavička, patička, <head>, JSON-LD)
src/components/         # Header, Footer, Cta, Quiz
src/pages/              # index, forma, cenik, kviz, pravidla, faq, kontakt, dekujeme, soukromi
src/content/pages/*.md  # editovatelné texty stránek (CMS)
src/data/*.json         # kontakt/ceny, FAQ, aktuality, kvíz, příklady, zajímavosti (CMS)
```
