# 🧱 **Turborepo + Bun + Next.js + Hardhat + TypeScript**


---

## 📁 Step 1: Create Turborepo (Trust-Cart)

```bash
bunx create-turbo@latest trust-cart
cd trust-cart
```

Choose:

* Package manager → **bun**
* Apps → keep defaults (we’ll modify)
* TypeScript → yes

You’ll get something like:

```txt
trust-cart/
├── apps/
│   ├── web/
│   └── docs/        # can delete later
├── packages/
│   └── ui/          # can keep or remove later
├── turbo.json
├── package.json
├── bun.lockb
└── tsconfig.json
```

---


## 🔗 Step 3: Add Smart Contracts App (Hardhat)

```bash
mkdir apps/contracts
cd apps/contracts
```

Initialize Hardhat:

```bash
bunx hardhat --init
```

Choose:

* **TypeScript**
* tests ✅
* .gitignore ✅

Now you have:

```txt
apps/contracts/
├── contracts/
├── test/
├── scripts/
├── hardhat.config.ts
├── package.json
└── tsconfig.json
```

📌 **IMPORTANT**
This is a **fully isolated blockchain app**.
It does NOT depend on Next.js.
It can be deployed, tested, and run alone.

---

## 🌐 Step 4: Web App (Next.js)

Your `apps/web` already exists (from turbo).
Let’s confirm it’s correct:

```bash
cd apps/web
```

If it’s not Next.js App Router yet, recreate it cleanly:

```bash
cd ..
rm -rf web
bunx create-next-app@latest web
```
Choose:

* TypeScript ✅
* App Router ✅
* ESLint ✅
* Tailwind → your choice (recommended)
* src directory ❌

Now:

```bash
cd web
bun install
```

Or Directly Install NextJS from ShadCN create

```bash
bunx --bun shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=vega&baseColor=gray&theme=orange&iconLibrary=lucide&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next&rtl=false" --template next
```

---

## 🧩 Final Folder Structure (Trust-Cart)

```txt
trust-cart/
│
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/             # ethers / wagmi later
│   │   ├── hooks/
│   │   ├── constants/       # contract addresses + ABIs
│   │   ├── types/
│   │   ├── package.json
│   │   └── .env.local
│   │
│   ├── contracts/           # Hardhat
│   │   ├── contracts/
│   │   ├── test/
│   │   ├── scripts/
│   │   ├── hardhat.config.ts
│   │   ├── package.json
│   │   └── .env
│
├── turbo.json
├── package.json             # ROOT (orchestrator)
├── bun.lockb
└── tsconfig.json
```

This is **clean, modern, production-grade**.

---

## 🧠 NOW Run the Web from Root


```bash
bun dev
```

or

```bash
cd apps/contracts
bunx hardhat test
```

---

### Option B: From ROOT using Turborepo (professional way)

In **root `package.json`**:

```json
{
  "scripts": {
    "dev:web": "turbo run dev --filter=web",
    "dev:contracts": "turbo run dev --filter=contracts",
    "test:contracts": "turbo run test --filter=contracts"
  }
}
```

Now you can do:

```bash
bun run dev:web
bun run test:contracts
```


---

