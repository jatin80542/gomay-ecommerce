# Deploying Gomay — GitHub + Vercel

Copy-paste these in order. Every command is run from inside the `gomay` folder
unless stated otherwise.

---

## Step 0 — Get it running locally first

Unzip the folder, then:

```bash
cd gomay
npm install
npm run dev
```

Open http://localhost:3000 and click around. **Do not proceed until this works.**

Stop the server with `Ctrl + C` when you're done looking.

### Verify the build is clean

```bash
npm run typecheck
npm run lint
npm run build
```

**Expected output from the last command** — confirm you see this before continuing:

```
 ✓ Compiled successfully
 ✓ Generating static pages (63/63)
```

If any of the three commands prints an error, stop and send me the output.

---

## Step 1 — Put it on GitHub

### 1a. Create the empty repository

Go to https://github.com/new and:

- **Repository name:** `gomay-ecommerce`
- **Visibility:** Private (you can flip it public later)
- **Do NOT** tick "Add a README", "Add .gitignore" or "Choose a license" — leave all three off. The folder already has them, and ticking these creates a conflict.

Click **Create repository**. Leave the page open; you'll need the URL.

### 1b. Initialise and commit

```bash
git init
git branch -M main
git add .
git status
```

**Verify before committing.** `git status` should list your source files. It must
**not** list `node_modules`, `.next`, or `.env`. Check with:

```bash
git status --porcelain | grep -E "node_modules|\.next/|\.env" | wc -l
```

**Expected output: `0`**. If it prints anything else, stop — `.gitignore` isn't
being applied and you'd be committing 200MB of dependencies.

Now commit:

```bash
git commit -m "feat: initial Gomay ecommerce frontend

Next.js 15 + TypeScript + Tailwind. Phase 1 frontend only:
40-product mock catalogue, three customer journeys (retail,
corporate gifting, bulk wholesale), full cart and checkout UI,
placeholder art, no backend."
```

### 1c. Push

Replace `<YOUR-USERNAME>` with your GitHub username:

```bash
git remote add origin https://github.com/<YOUR-USERNAME>/gomay-ecommerce.git
git push -u origin main
```

If GitHub asks for a password, it wants a **Personal Access Token**, not your
account password. Create one at https://github.com/settings/tokens → "Generate new
token (classic)" → tick the `repo` scope → copy it and paste it as the password.

**Verify:** refresh your GitHub repo page. You should see the file list and the
README rendered underneath.

---

## Step 2 — Deploy to Vercel

### 2a. Import

1. Go to https://vercel.com/new
2. Sign in with GitHub if you haven't already
3. Find `gomay-ecommerce` in the list and click **Import**

### 2b. Settings

Vercel auto-detects Next.js. **Change nothing.** Specifically:

| Setting | Leave as |
| --- | --- |
| Framework Preset | Next.js |
| Build Command | `next build` (default) |
| Output Directory | (default) |
| Install Command | `npm install` (default) |
| Environment Variables | **none needed** — Phase 1 has no secrets |

Click **Deploy**. It takes 2–4 minutes.

### 2c. Verify the deployment

Once it finishes, Vercel gives you a URL like
`https://gomay-ecommerce-xxxx.vercel.app`.

Open it and check each of these:

- [ ] Homepage loads, hero image visible, no broken images anywhere
- [ ] `/shop` — filters, sort and search all respond
- [ ] Click a product — gallery, variant selector, price changes with pack size
- [ ] Add to cart — cart drawer opens with the right item and total
- [ ] `/bulk` — 28 wholesale cards, MOQ and formats visible
- [ ] `/corporate-gifting` — quote form validates and shows a success state
- [ ] `/checkout` — loads with the Phase 2 notice, Place order is disabled
- [ ] Visit `/some-nonsense-url` — the custom 404 page appears
- [ ] Open it on your phone — no horizontal scrolling on any page

---

## Step 3 — Point `siteUrl` at the real domain

Right now `config/brand.ts` has:

```ts
siteUrl: "https://gomay.vercel.app"
```

This is used for canonical URLs, the sitemap and social cards. Once you know your
real Vercel URL (or attach a custom domain), update it:

```bash
# open config/brand.ts in VS Code and change the siteUrl line, then:
git add config/brand.ts
git commit -m "chore: point siteUrl at production domain"
git push
```

Vercel redeploys automatically on every push to `main`.

**Verify:** visit `https://<your-domain>/sitemap.xml` and confirm the URLs inside
use your real domain, not `gomay.vercel.app`.

---

## Ongoing workflow

Every push to `main` triggers a production deploy. Pushes to any other branch get a
preview URL, which is the safer way to try changes:

```bash
git checkout -b tweak-homepage
# ...make changes...
git add .
git commit -m "feat: reword hero copy"
git push -u origin tweak-homepage
```

Vercel comments a preview link on the branch. Merge to `main` when you're happy.

---

## If something breaks

| Symptom | Cause | Fix |
| --- | --- | --- |
| Build fails on Vercel but works locally | Node version mismatch | Vercel → Settings → General → set Node.js Version to 22.x |
| Fonts look wrong in production | Google Fonts blocked | Fonts load via `<link>`; check the browser console for CSP errors |
| Images missing | Files not committed | `git status` inside `public/` — the SVGs must be tracked |
| `git push` rejected | Repo wasn't empty | `git pull --rebase origin main` then push again |
