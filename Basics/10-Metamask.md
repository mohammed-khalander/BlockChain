
# What activities can you do with MetaMask (Wallet)?

## Big picture first

MetaMask lets you do **anything that requires proving you own an Ethereum address**.

That’s the core idea.

---

## 1️⃣ Create & manage accounts (addresses)

### What you can do:

* Create multiple wallet addresses
* Import existing wallets (using private key / seed phrase)
* Switch between accounts

### Example:

```text
Account 1 → DeFi
Account 2 → NFTs
Account 3 → Testing
```

Each account = different private key = different identity.

---

## 2️⃣ Hold & view assets (IMPORTANT nuance)

### You can VIEW:

* ETH balance
* ERC20 tokens
* NFTs (ERC721 / ERC1155)

But remember:
❗ Assets are on the blockchain, not in MetaMask.

MetaMask just **reads blockchain data** and shows it nicely.

---

## 3️⃣ Send & receive ETH

### Example:

* You send 0.1 ETH to your friend
* MetaMask:

  * builds a transaction
  * signs it
  * broadcasts it

You approve → blockchain executes.

---

## 4️⃣ Send & receive tokens (ERC20, NFTs)

### Example:

* Send USDT (ERC20)
* Transfer NFT

MetaMask:

* calls `transfer()` or `safeTransferFrom()`
* signs transaction
* sends to Ethereum

---

## 5️⃣ Interact with Smart Contracts (MOST IMPORTANT)

This is the **killer feature**.

### What this means:

* Call any public function on a contract
* With or without ETH
* With parameters

### Example:

* Swap tokens on Uniswap
* Stake tokens
* Mint NFT
* Vote in DAO

MetaMask signs → Ethereum executes.

---

## 6️⃣ Deploy Smart Contracts (for developers)

Yes, MetaMask can deploy contracts.

### Example:

* You compile contract
* MetaMask signs deployment transaction
* Contract is created on-chain

Used with:

* Remix
* Hardhat
* Foundry

---

## 7️⃣ Approve permissions (VERY IMPORTANT)

### Example:

```solidity
approve(spender, amount)
```

This lets a contract:

* spend your tokens
* move your NFTs

MetaMask shows:

> “This contract can spend X tokens”

This is where hacks happen if you’re careless.

---

## 8️⃣ Sign messages (NOT transactions)

Different from transactions.

### Example:

* Login to Web3 app
* Prove wallet ownership

MetaMask:

* signs message
* NO gas
* NO blockchain execution

Used for:

* authentication
* off-chain verification

---

## 9️⃣ Switch networks

MetaMask supports:

* Ethereum Mainnet
* Testnets (Sepolia, Goerli)
* Layer 2s (Polygon, Arbitrum)
* Custom RPCs

Each network = different blockchain.

---

## 🔟 Connect to dApps (browser wallet role)

MetaMask:

* injects `window.ethereum`
* lets websites request wallet access

Example:

> “Connect Wallet” button

---

# What MetaMask CANNOT do ❌ (critical)

❌ Run smart contracts
❌ Store blockchain data
❌ Reverse transactions
❌ Recover lost private keys
❌ Protect you from bad contracts

MetaMask obeys **you** — even if you do dumb things.

---

# Real-life Example (Full Flow)

### “Swap ETH to USDC on Uniswap”

1. Open Uniswap
2. Click “Connect Wallet”
3. MetaMask connects address
4. You click “Swap”
5. MetaMask shows transaction
6. You confirm
7. Blockchain executes Uniswap contract
8. Tokens swapped

MetaMask’s job ends at step 6.

---

# MetaMask vs Blockchain (FINAL CLARITY)

| Thing          | Role                     |
| -------------- | ------------------------ |
| MetaMask       | Sign & send transactions |
| Wallet         | Holds private keys       |
| Blockchain     | Executes & stores        |
| Smart Contract | Business logic           |
| ETH            | Gas & value              |

---

# Interview-Ready Answer (MEMORIZE)

> MetaMask is a non-custodial wallet that manages private keys, signs transactions, and enables users to interact with blockchain networks and smart contracts.

---

# Power-user tip ⚠️

MetaMask = **keys**
Browser = **attack surface**

Never:

* sign random approvals
* approve unlimited tokens blindly

---

