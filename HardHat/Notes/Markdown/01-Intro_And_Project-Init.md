# [HardHat](https://hardhat.org/)
# [HardHat Docs](https://hardhat.org/docs/getting-started)
# [Alchemy](https://www.alchemy.com/)
# [Alchemy Docs](https://www.alchemy.com/docs)
# [Alchemy Faucet](https://www.alchemy.com/faucets)
# [Sepolia Testnet](https://sepolia.etherscan.io/)
# [My-EtherScan](https://etherscan.io/address/0x886b573a777CD0C8d9195dC9FFB4498c51AE0723)
# [My-Metamask-Dash](https://developer.metamask.io/)
# [My-Alchemy-Dash](https://dashboard.alchemy.com/)
# [ChainStack](https://chainstack.com/)
# [My-ChainStack-Dash](https://console.chainstack.com/projects)
# [ChainStack Faucet Free Ethers](https://faucet.chainstack.com/)
<!--3j2PMX9l.hjWXkeTRh6SNen9KjiEsf9RNMpIVzh5Z-->
# [Google Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)


</br>
</br>
</br>
</br>
</br>

# [HardHat 3 Beta Docs](https://v2.hardhat.org/tutorial)
# [Turbo Starter Kit](https://github.com/memoriaXII/create-web3-turbo)
# [Chaijs](https://www.chaijs.com/)
# [Mocha](https://mochajs.org/)
# [Metamsk-Basics-GPT](https://chatgpt.com/c/697ccf2a-f440-8320-aad3-1bc1ee41e9ff)

</br>
</br>
</br>
</br>
</br>

---

# 📘 HARDHAT 

---

## 1️⃣ What is Hardhat? (From absolute zero)

**Hardhat** is a **development environment** for Ethereum smart contracts.

Think of Hardhat as:

> 🧰 A toolbox that helps you **write, compile, test, debug, and deploy** smart contracts.

Without Hardhat:

* You manually compile Solidity
* You manually deploy using raw RPC calls
* Debugging is painful

With Hardhat:

* One command → local blockchain
* One command → deploy
* Built-in testing + debugging
* Plugin-based (you add only what you need)

📌 **Official definition (simplified from docs):**
Hardhat is flexible and extensible because **most features come from plugins**.

---

## 2️⃣ Why Hardhat is needed in a DApp

A DApp has **two worlds**:

### 🔹 Blockchain World

* Solidity contracts
* Deployment
* Gas, accounts, networks

### 🔹 Frontend World

* Next.js UI
* MetaMask
* ethers.js

👉 **Hardhat lives in the Blockchain World**, but it also:

* Generates ABI for frontend
* Gives addresses after deployment
* Provides local Ethereum network for testing

---

## 3️⃣ Industry-Standard Project Structure (Monorepo)

We **DO NOT** mix frontend and contracts.

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

---

## 4️⃣ Prerequisites (Adjusted for YOU)

Official docs say:

* Node.js
* npm / pnpm

👉 **WE REPLACE THIS WITH:**

* ✅ **Bun**
* ✅ TypeScript everywhere

---

## 5️⃣ Initialize Hardhat Project (Using Bun)

### Step 1: Create contracts folder

```bash
mkdir contracts
cd contracts
```

### Step 2: Initialize bun

```bash
bun init -y
```

This creates:

```
package.json
```

### Step 3: Install Hardhat

```bash
bun add -D hardhat
```

### Step 4: Initialize Hardhat

```bash
bunx hardhat --init
```

Choose defaults:

* TypeScript ✅
* Sample project ✅

---

## 6️⃣ What Hardhat Init Generates (VERY IMPORTANT)

After init, structure becomes:

```
contracts/
├── package.json
├── hardhat.config.ts
├── contracts/
│   └── Counter.sol
├── test/
│   └── Counter.ts
├── ignition/
│   └── modules/
│       └── Counter.ts
└── scripts/
    └── send-op-tx.ts
```

---

## 7️⃣ Understanding Each Folder (FROM SCRATCH)

---

### 📂 `contracts/`

This folder contains **Solidity smart contracts**.

Example:

```solidity
contract Counter {
  uint public x;
}
```

📌 Solidity files:

* Define blockchain logic
* State lives on Ethereum
* Cannot be changed after deployment

---

### 📂 `test/`

This folder contains **tests**.

Why tests?

* Smart contracts are **immutable**
* Bugs = money lost
* Tests simulate blockchain behavior safely

Uses:

* Mocha → test runner
* Chai → assertions
* ethers.js → interact with contracts

---

### 📂 `hardhat.config.ts`

This is the **brain of Hardhat**.

It defines:

* Solidity compiler version
* Networks (localhost, testnet, mainnet)
* Plugins (ethers, ignition, testing)

📌 Nothing runs without this file.

---

### 📂 `scripts/` (OLD-STYLE DEPLOYMENT)

Contains **imperative deployment scripts**.

Example:

```ts
const contract = await ethers.deployContract("Counter");
```

You:

* Control execution order
* Manually manage dependencies

Used when:

* You want full control
* One-off scripts
* Migrations

---

### 📂 `ignition/` (NEW-STYLE DEPLOYMENT ⭐)

This is **Hardhat Ignition**.

👉 Ignition is:

> A **declarative deployment system**

Instead of saying *how* to deploy step by step,
you declare *what* should exist.

📌 Ignition:

* Handles dependencies automatically
* Remembers previous deployments
* Safe, repeatable, production-grade

**THIS IS WHAT MODERN HARDHAT WANTS YOU TO USE**

---

## 8️⃣ Writing Your First Contract (From Scratch)

Create:

```
contracts/contracts/Counter.sol
```

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    uint public x;

    event Increment(uint by);

    function inc() public {
        x++;
        emit Increment(1);
    }
}
```

### Explain:

* `uint public x` → stored on blockchain
* `event` → logs for frontend
* `inc()` → transaction function

---

## 9️⃣ Compile the Contract

```bash
bunx hardhat build
```

What happens internally:

1. Solidity compiler runs
2. ABI is generated
3. Bytecode is generated
4. Types are generated (TypeChain)

📌 Output goes to:

```
artifacts/
```

---

## 🔟 Testing with Ethers + Mocha (Official Way)

### Why ethers.js?

* It’s how frontend talks to blockchain
* Hardhat integrates it deeply

---

### Sample Test (Explained line by line)

```ts
import { expect } from "chai";
import hre from "hardhat";

const { ethers } = await hre.network.connect();
```

* `hre` = Hardhat Runtime Environment
* `network.connect()` → spins up local Ethereum
* `ethers` → already connected to that chain

---

```ts
describe("Counter", function () {
  it("increments", async function () {
    const counter = await ethers.deployContract("Counter");

    await counter.inc();

    expect(await counter.x()).to.equal(1n);
  });
});
```

📌 `deployContract`:

* Compiles if needed
* Deploys to local chain
* Returns a JS object connected to contract

Run tests:

```bash
bunx hardhat test
```

---

## 1️⃣1️⃣ Deployment (MOST IMPORTANT PART)

Hardhat supports **TWO ways**:

---

## 🔹 A) Deployment using Scripts (Imperative)

### How it works

You write **step-by-step instructions**.

Example:

```ts
const counter = await ethers.deployContract("Counter");
```

### Run:

```bash
bunx hardhat run scripts/deploy.ts --network localhost
```

### Pros:

* Full control
* Simple

### Cons:

* Not resumable
* Not state-aware
* Harder to maintain

---

## 🔹 B) Deployment using Ignition (Declarative) ⭐⭐⭐

### WHAT IS IGNITION?

Ignition is:

> A **deployment system** that understands dependencies, state, and re-runs safely.

Instead of:

> “Deploy this, then that”

You say:

> “This contract exists”

---

### Ignition Module Example

```
ignition/modules/Counter.ts
```

```ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CounterModule", (m) => {
  const counter = m.contract("Counter");
  return { counter };
});
```

### Explanation:

* `buildModule` → defines a deployment plan
* `m.contract("Counter")` → declares contract
* Ignition:

  * Deploys only if not deployed
  * Tracks address
  * Handles redeploy safely

---

### Run Ignition Deployment

```bash
bunx hardhat ignition deploy ignition/modules/Counter.ts --network localhost
```

📌 This is **officially recommended** for production.

---

## 1️⃣2️⃣ Making Contract “Live”

### Local:

```bash
bunx hardhat node
```

### Testnet (example Sepolia):

* Add network in `hardhat.config.ts`
* Add private key via env
* Run ignition deploy

📌 Same code → different network

---

## 1️⃣3️⃣ Connecting Next.js Frontend (High Level)

Frontend does **NOT** use Hardhat.

Frontend uses:

* ABI
* Contract Address
* ethers.js
* MetaMask

Flow:

```
User → MetaMask → ethers.js → Contract
```

---

## 1️⃣4️⃣ Final Mental Model (IMPORTANT)

```
Hardhat
 ├─ writes contracts
 ├─ compiles Solidity
 ├─ tests logic
 ├─ deploys contracts
 └─ outputs ABI + address
        ↓
Next.js
 ├─ imports ABI
 ├─ uses ethers.js
 └─ talks to blockchain
```

---

## ✅ Summary (Burn this into your brain)

* Hardhat = blockchain dev environment
* Bun = package manager + runner
* Contracts live in `contracts/`
* Tests simulate Ethereum
* Scripts = old deployment style
* Ignition = modern, safe deployment system
* Frontend NEVER deploys contracts
* ethers.js is the bridge

---
