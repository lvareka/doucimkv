# Doučování matematiky a fyziky – Karlovy Vary (moderní web)

Nová verze webu `doucimkv.wz.cz` postavená na **Astro** + **Sveltia CMS** (nástupce
Decap CMS) + **Netlify**. Tento repozitář je *skeleton připravený k nasazení* –
obsahuje funkční pipeline (GitHub → Netlify), CMS a obsahový model; plný design a
rozšířený obsah se doplní v další fázi.

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

> V tomto prostředí nebyl Node v shellu dostupný, proto první build proběhne až na
> Netlify. Projekt je triviální Astro aplikace – riziko selhání buildu je minimální.

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
git commit -m "Iniciální skeleton: Astro + Sveltia CMS + Netlify"
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

`repo` v `public/admin/config.yml` je už nastavené na `lvareka/doucimkv`.
Pro přihlášení do `/admin` je potřeba OAuth proxy (zdarma):

**Doporučeno – `sveltia-cms-auth` (Cloudflare Worker, free):**
1. Vytvořte **GitHub OAuth App** (*GitHub → Settings → Developer settings → OAuth Apps*):
   - Homepage URL: `https://<vas-web>.netlify.app`
   - Authorization callback URL: URL workeru z kroku 2
2. Nasaďte `https://github.com/sveltia/sveltia-cms-auth` tlačítkem *Deploy to Cloudflare*.
3. Do workeru nastavte `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_DOMAINS`.
4. URL workeru vložte do `base_url` v `public/admin/config.yml`.

*(Alternativa bez Cloudflare: malá Netlify Function pro OAuth v tomto repu – doplníme
ve fázi implementace.)*

## 4) Formuláře (Netlify Forms)

Kontaktní a rezervační formulář přidáme do stránek ve fázi implementace. Netlify je
registruje automaticky ze statického HTML (`data-netlify="true"`). Odeslání se ukládají
v Netlify a přeposílají na e-mail (*Forms → Notifications*).

## 5) SEO – co je připraveno a co doplnit

Připraveno: `lang="cs"`, meta popisy, `robots.txt`, vlastní doména/SSL.
Doplnit ve fázi implementace:
- `@astrojs/sitemap` + `sitemap-index.xml`
- JSON-LD: `Person` + `Service` + `Offer` + `FAQPage` (+ `areaServed: Karlovy Vary`)
- Open Graph obrázek, interní prolinkování, klíčová slova
- Po spuštění **odstranit** `<meta name="robots" content="noindex" />` v `BaseLayout.astro`
- **Mimo kód:** založit Google Business Profile (Moje firma), zápisy Firmy.cz / Mapy.cz

## Struktura

```
astro.config.mjs        # konfigurace Astro (site = URL webu)
netlify.toml            # build příkazy pro Netlify
public/admin/           # Sveltia CMS (index.html + config.yml)
public/robots.txt
src/layouts/            # BaseLayout.astro
src/pages/index.astro   # úvodní stránka (skeleton)
src/content/            # obsah pro CMS (nastaveni, faq, aktuality, pages/*.md)
```
