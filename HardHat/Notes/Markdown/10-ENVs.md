# Use Modern Hardhat Keystore


> Below is just the example of using .env instead of hardhat keystore </br>
> For using Hardhat keystore, refere `Readme` inside the `Project` folder

# `.env` structure

Your repo:

```
my-dapp/
│
├── contracts/        ← Hardhat (Solidity)
│   ├── contracts/
│   ├── scripts/
|   ├── ignition/
│   ├── test/
│   ├── hardhat.config.ts
│   └── package.json
│
├── frontend/         ← Next.js (UI)
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── next.config.ts
│
├── shared/           ← ABI + addresses (bridge)
│
├── .gitignore
└── README.md
```

You actually have **two different runtimes**:

| Folder       | Runtime        | Env system               |
| ------------ | -------------- | ------------------------ |
| `contracts/` | Node (Hardhat) | `dotenv` / `process.env` |
| `frontend/`  | Next.js        | Built-in env handling    |

They **should NOT share the same `.env` blindly**.

---

## 🟢 Recommended `.env` layout (clean & reliable)

### Separate `.env` per package (BEST PRACTICE)

```
my-dapp/
│
├── contracts/
│   ├── .env
│   ├── hardhat.config.ts
│
├── frontend/
│   ├── .env.local
│   └── next.config.ts
```

### `contracts/.env`

```env
ALCHEMY_API_KEY=xxx
SEPOLIA_PRIVATE_KEY=0xabc...
```

### `frontend/.env.local`

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=xxx
NEXT_PUBLIC_CHAIN_ID=11155111
```

✅ Clean separation
</br>
✅ No accidental private key leaks
</br>
✅ Works everywhere (CI, Docker, local)

---

## 🔧 Hardhat config (contracts)

In `contracts/hardhat.config.ts`:

```ts
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY!;

export default {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
```

Hardhat will automatically load `.env` **from the current working directory (`contracts/`)**.
