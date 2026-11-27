# Handover – nasazení a provoz webu

Tento dokument je návod **krok za krokem**, abyste web zvládl(a) spravovat a nasazovat
sám/sama, bez pomoci agenta.

## Co dnes kde běží

- **Repozitář:** `https://github.com/lvareka/doucimkv` (větev `main`)
- **Produkce:** Netlify, adresa `https://doucimkv.netlify.app`
- **Stav nasazení k 26. 11. 2026:** na produkci běží starší verze (commit `76a3ad4`).
  Všechny novější změny (kvíz ve třech úrovních, studijní materiály, zásady GDPR,
  opravy SEO) jsou **nahrané na GitHubu**, ale produkční deploy je **pozastavený**,
  protože free plán Netlify vyčerpal kredity. Publikovaný web přitom běží dál.

## Proč je produkční deploy pozastavený

Netlify má v roce 2026 kreditní free plán (~300 kreditů/měsíc). Když tým kredity
vyčerpá:

- **Běží dál:** publikované weby (dál fungují), preview a branch deploye.
- **Pozastaveno:** produkční deploye a Agent Runners.

Nový cyklus začíná **25. 12. 2026** – tehdy se produkční deploye automaticky obnoví.

## Krok za krokem: nasazení po 25. 12.

### 1. Ověřte, že se cyklus obnovil

1. Přihlaste se na https://app.netlify.com.
2. Otevřete **Billing / Team settings** a zkontrolujte, že nový cyklus má kredity.
3. Na záložce **Deploys** projektu `doucimkv` by deploye už neměly hlásit
   „paused due to exhausted credits“.

### 2. Spusťte produkční deploy (nejnovější verze)

Postačí jedna z variant:

**Varianta A – přes webové rozhraní (doporučeno):**
1. Netlify → projekt **doucimkv** → **Deploys**.
2. U posledního buildu (commit `0149b6a` nebo novější) klikněte na **⋯ / Retry deploy**
   (případně **Trigger deploy → Deploy site**).
3. Vyčkejte na zelené **Published**.

**Varianta B – přes Git (automaticky):**
```bash
git push
```
Každý push do `main` spustí build a produkční deploy. Stačí tedy po 25. 12.
poslat libovolný commit (třeba úpravu textu v CMS).

### 3. Zkontrolujte produkci

Otevřete stránky a zkontrolujte, že odpovídají nejnovější verzi:

| URL | Co zkontrolovat |
|---|---|
| `/` | ceny 300/350 v kartě, sekce Co nabízím |
| `/kviz/` | 9 otázek v úrovních **ZŠ / SŠ / VŠ**, tlačítko Vyhodnotit |
| `/forma/` | sekce „Studijní materiály“ s odkazy na Google Drive |
| `/soukromi/` | stránka Ochrana osobních údajů |
| `/kontakt/` | poznámka s odkazem na zásady GDPR |

Ověření sitemap a robotů:
```bash
curl -I https://doucimkv.netlify.app/sitemap-index.xml   # 200
curl -s https://doucimkv.netlify.app/robots.txt
```

### 4. Ověřte formuláře (Netlify Forms)

1. Na `/kontakt/` vyplňte a odešlete **kontaktní** i **rezervační** formulář.
2. Netlify → **Forms** → zkontrolujte, že oba formuláře (`kontakt`, `rezervace`)
   přišly.
3. Nastavte e-mailová oznámení: **Forms → vybraný formulář → Settings & usage →
   Notifications** („Email notification“) a zadejte `petrvareka@seznam.cz`.

> Pozn.: formuláře se registrují až při prvním produkčním deployi, který je obsahuje.
> Před odesláním se proto ujistěte, že deploy z kroku 2 proběhl se stavem Published.

### 5. Ověřte CMS (/admin)

1. Otevřete https://doucimkv.netlify.app/admin/.
2. Klikněte „Přihlásit přes GitHub“ → autorizujte aplikaci.
3. Po přihlášení zkuste upravit a uložit libovolnou položku (např. FAQ). CMS uloží
   změnu jako commit do `main`, čímž zároveň spustí nový deploy.

> Pokud přihlášení hlásí chybu klienta (misconfigured client), znamená to, že
> proměnné `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` nejsou viditelné pro edge
> runtime – v Netlify **Site settings → Environment variables** zkontrolujte hodnoty
> a po případné úpravě proveďte **nový produkční deploy** (změna proměnných u Edge
> Function se projeví až po dalším deployi).

## Proměnné prostředí (Netlify Environment variables)

| Název | Účel | Kde nastavit |
|---|---|---|
| `GITHUB_CLIENT_ID` | OAuth app z GitHubu | Site settings → Environment variables |
| `GITHUB_CLIENT_SECRET` | tajný klíč OAuth app | tamtéž |
| `ALLOWED_DOMAINS` | volitelné omezení domén | tamtéž |
| `GITHUB_ALLOW_WORKFLOW_SCOPE` | volitelné `true` pro `workflow` scope | tamtéž |

Hodnotu `GITHUB_CLIENT_SECRET` **nikam nezveřejňujte** (ani do chatu, ani do repozitáře).

## Lokální vývoj (bez agenta)

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # produkční build do dist/
npm run preview      # náhled buildu
```

Lokální CMS (editace bez přihlášení):
```bash
# terminál 1
npx decap-server
# terminál 2
npm run dev          # http://localhost:4321/admin/
```

## Jak měnit obsah

**Přes CMS (doporučeno):** `/admin` – upravuje soubory v
`src/content/pages/*.md` a `src/data/*.json`, změna se uloží jako commit a sama
spustí deploy.

**Přímo v kódu:** upravte soubor v `src/`, commit a push:
```bash
git add <soubor>
git commit -m "popis změny"
git push
```

## Struktura nejdůležitějších souborů

| Soubor | Obsah |
|---|---|
| `src/data/nastaveni.json` | **Jednotný zdroj pravdy** – jméno, telefon, e-mail, adresa, účet, ceny |
| `src/content/pages/*.md` | texty stránek (uvod, forma, cenik, pravidla, kontakt) |
| `src/data/faq.json` | časté dotazy |
| `src/data/aktuality.json` | oznámení na úvodní stránce |
| `src/data/kviz.json` / `priklady.json` / `zajimavosti.json` | kvíz, příklady, zajímavosti |
| `astro.config.mjs` | `site` (adresa webu) + sitemap |
| `netlify.toml` | build příkaz `npm run build`, adresář `dist`, Node 20 |
| `netlify/edge-functions/oauth.js` | OAuth proxy pro CMS |
| `public/admin/config.yml` | nastavení Sveltia CMS |

## Co udělat po přechodu na vlastní doménu (nepovinné)

Pokud byste v budoucnu chtěli vlastní doménu (např. `www.doucimkv.cz`):

1. Netlify → **Domain management** → Add domain → postupujte podle pokynů.
2. U registrátora nasměrujte DNS (`CNAME` / `ALIAS` na Netlify, doporučený záznam vám Netlify zobrazí).
3. Vyčkejte na vydání HTTPS certifikátu (Let's Encrypt, automaticky).
4. Změňte adresu na jednom místě:
   - `astro.config.mjs` → `site: 'https://www.doucimkv.cz'`
   - `public/admin/config.yml` → `site_url` + `display_url` + `base_url`
   - `public/robots.txt` → nová adresa sitemap
5. Commit, push, deploy.
6. V GitHub OAuth app změňte **Homepage URL** a **Authorization callback URL**
   na novou doménu (`https://www.doucimkv.cz/callback`).