# Basics, Transaction, Deployment and Mining


Bro 🔥 perfect timing to move to **deployment**.
You already have testing fundamentals, so this will *click fast*.

I’ll do this in **three clean layers**:

1. **What is a transaction really?** (this will kill 80% of confusion)
2. **Why `await tx.wait()` is used after `incBy(5n)`**
3. **How to run this deployment script locally (before Sepolia / Ignition)**

No Ignition yet — just classic scripts, fully understood.

---

## 1️⃣ First, what is a “transaction” actually?

This is the **core concept**, so let’s lock it in.

### 🔑 Definition (Ethereum-level, not Hardhat-level)

> **A transaction is any operation that changes blockchain state.**

That’s it.

---

### ✅ Things that ARE transactions

| Action               | Why                                         |
| -------------------- | ------------------------------------------- |
| Deploying a contract | Creates new state (contract code + storage) |
| Calling `incBy(5)`   | Changes storage (`x += 5`)                  |
| Sending ETH          | Changes balances                            |
| Writing to a mapping | Changes storage                             |

---

### ❌ Things that are NOT transactions

| Action                    | Why             |
| ------------------------- | --------------- |
| `balanceOf()`             | Read-only       |
| `totalSupply()`           | Read-only       |
| `view` / `pure` functions | No state change |

---

### ⚠️ Important correction to a common misunderstanding

> “Is a transaction the whole smart contract?”

❌ NO.

A transaction is **NOT**:

* the whole contract
* the whole file
* only ETH-transfer functions

✅ A transaction is:

* **one execution** of:

  * constructor
  * or a state-changing function

---

## 2️⃣ Now let’s analyze this deployment script line-by-line (with meaning)

### Script (simplified)

```ts
const counter = await ethers.deployContract("Counter");
await counter.waitForDeployment();
```

### What happens here?

#### `ethers.deployContract("Counter")`

* Creates a **deployment transaction**
* Sends it to the network
* Returns a **Contract object**
* BUT the tx may still be **pending**

So Hardhat gives you the object early.

---

#### `await counter.waitForDeployment()`

This line means:

> “Pause execution until the deployment transaction is **mined and confirmed**.”

### Is this required?

👉 **YES, if you want to safely interact with the contract next.**

Without this:

* Contract address may not exist yet
* Next calls can fail or behave unpredictably

---

## 3️⃣ Now your MAIN doubt 👇

```ts
const tx = await counter.incBy(5n);
await tx.wait();
```

### ❓ Is this necessary for deployment?

### ❌ NO — this has NOTHING to do with deployment

This part is **NOT required** to deploy the contract.

---

### Then why is it here?

Because this script is doing **two things**:

1. Deploying the contract
2. **Demonstrating a post-deployment interaction**

It’s basically saying:

> “Hey, contract is deployed — let’s prove it works.”

---

### 🔍 What exactly is `tx` here?

```ts
const tx = await counter.incBy(5n);
```

* This sends a **transaction** (state change)
* Returns a **TransactionResponse**
* The tx is **submitted**, not yet confirmed

Then:

```ts
await tx.wait();
```

means:

> “Wait until this transaction is mined and included in a block.”

---

### 🧠 Think of it like real life

| Action                | Analogy             |
| --------------------- | ------------------- |
| Send WhatsApp message | `counter.incBy(5n)` |
| Message delivered     | `tx.wait()`         |

You don’t *have* to wait, but if you want certainty, you do.

---

### So to answer clearly 👇

| Question                                | Answer                |
| --------------------------------------- | --------------------- |
| Is `tx.wait()` required for deployment? | ❌ No                  |
| Is it required to call `incBy`?         | ❌ No                  |
| Why is it shown?                        | ✅ To show interaction |
| Is `incBy` a transaction?               | ✅ Yes                 |
| Does it involve ETH transfer?           | ❌ Not required        |

---

## 4️⃣ Full mental model (VERY IMPORTANT)

### Any state-changing function call:

```ts
await contract.someFunction(...)
```

➡️ returns a **TransactionResponse**

Then:

```ts
await tx.wait()
```

➡️ waits for **mining + confirmation**

---

## 5️⃣ Running this script LOCALLY (before Sepolia)

You asked:

> “If Sepolia is not set up, how to do normal local?”

Perfect — this is how everyone starts.

---

### ✅ Step 1: Create the script

`/scripts/deploy-counter.ts`

```ts
import { network } from "hardhat";

const { ethers, networkName } = await network.connect();

console.log(`Deploying Counter to ${networkName}...`);

const counter = await ethers.deployContract("Counter");

console.log("Waiting for deployment...");
await counter.waitForDeployment();

console.log("Counter deployed at:", await counter.getAddress());
```

(No `incBy` yet — clean deployment only)

---

### ✅ Step 2: Run on local Hardhat network

```bash
bunx hardhat run scripts/deploy-counter.ts
```

That’s it.

What happens:

* Hardhat spins up an **in-memory local blockchain**
* Uses default funded accounts
* Deploys the contract
* Prints the address
* Chain is destroyed after script ends

---

### 🧠 Important note

This local network is:

* Temporary
* Resets every run
* Only for development/testing

---

## 6️⃣ What `--network` actually does (preview)

Later, when you do:

```bash
bunx hardhat run scripts/deploy-counter.ts --network sepolia
```

It means:

* “Use Sepolia RPC”
* “Use real ETH (testnet ETH)”
* “Persist contract on-chain”

But we’ll do that **after** Ignition intro.

---

## 7️⃣ Ultra-clear summary (bookmark this)

### Transactions

* Deployment = transaction
* State-changing function = transaction
* ETH transfer = transaction
* `view` function = ❌ not a transaction

### `tx.wait()`

* Not mandatory
* Used when you want confirmation
* Good practice in scripts

### Deployment scripts

* Can deploy only
* Or deploy + interact
* Interaction part is optional

---

Bro, you’re now stepping into **real developer workflow** territory.
Next logical steps:

👉 Rewrite this script for **your Token contract** </br>
👉 Then move to **Ignition (modern, reproducible, industry standard)** </br>
👉 Then Sepolia deployment

Say *“Token deployment script”* and we’ll do it clean 👊


</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

# Mining


Bro 😄 **this is an EXCELLENT doubt**.
You’re basically asking: *“Is ‘mining’ here the same mining as Bitcoin mining? If yes/no, how are they connected?”*
Let’s clear this **once and forever**, then we’ll do **Token deployment locally** and **how to actually see / interact with it**.

---

# 1️⃣ What does “MINED” actually mean?

### Short, precise definition

> **Mining = putting transactions into a block and making that block part of the blockchain**

That’s it.
Everything else (Bitcoin mining, GPUs, puzzles) is **HOW**, not **WHAT**.

---

## 🧱 What happens to a transaction (any Ethereum tx)

When you do:

```ts
await counter.incBy(5n);
```

this happens 👇

1. Transaction is **created**
2. Transaction is **broadcast** to the network
3. Transaction is **pending**
4. A block producer picks it
5. Transaction is **included in a block**
6. Block is added to the chain
   ➡️ **Transaction is now MINED**

So:

> **“Mined” = included in a block**

---

## 2️⃣ Bitcoin mining vs Ethereum “mining” (connection)

### 🔴 Bitcoin (Proof of Work)

* Miners:

  * Solve cryptographic puzzles
  * Use CPU/GPU/ASIC
* Winner:

  * Creates a block
  * Gets BTC reward
* This whole process is called **mining**

That’s why you hear:

> “Bitcoin mining”

---

### 🟢 Ethereum (Today – Proof of Stake)

Ethereum **does NOT do PoW mining anymore**, but…

* Validators:

  * Propose blocks
  * Validate transactions
* No puzzles
* No GPUs
* But…

👉 **Blocks are still created**
👉 **Transactions are still included**
👉 **The word “mined” is still used**

So in Ethereum:

> “Transaction mined” = “Transaction included in a block”

No puzzle, no GPU — but same blockchain concept.

---

## 3️⃣ Hardhat local network – who is mining here?

### Important clarity 👇

When you run:

```bash
bunx hardhat run scripts/deploy-token.ts
```

Hardhat spins up a **fake local blockchain**.

In this network:

* There are **no real miners**
* No validators
* No delay

Hardhat:

* Automatically creates blocks
* Mines instantly
* Confirms immediately

So when we say:

> “wait for mining”

On Hardhat it really means:

> “wait until Hardhat finishes simulating block inclusion”

---

## 4️⃣ What does `tx.wait()` ACTUALLY wait for?

Let’s connect all dots now.

```ts
const tx = await token.transfer(user1.address, 100n);
```

At this point:

* Transaction is **sent**
* Not yet in a block

```ts
await tx.wait();
```

This means:

> “Pause execution until this transaction is **included in a block**”

On:

* Hardhat → instant
* Sepolia → few seconds
* Mainnet → depends on gas & network

---

## 5️⃣ Deployment is ALSO a transaction

This is super important.

```ts
const token = await ethers.deployContract("Token", [TOTAL_SUPPLY]);
```

Internally:

* This sends a **transaction**
* That transaction:

  * Creates contract code
  * Initializes storage
  * Emits constructor events

Then:

```ts
await token.waitForDeployment();
```

Means:

> “Wait until the deployment transaction is mined and the contract address exists”

---

## 6️⃣ Now: Token deployment script (classic scripts way)

### 📁 `scripts/deploy-token.ts`

```ts
import { network } from "hardhat";

const { ethers, networkName } = await network.connect();

async function main() {
  console.log(`Deploying Token to network: ${networkName}`);

  const TOTAL_SUPPLY = 1000n;

  // 1. Deploy
  const token = await ethers.deployContract("Token", [TOTAL_SUPPLY]);

  console.log("Waiting for deployment transaction...");
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("Token deployed at:", address);

  // 2. Optional: verify initial state
  const owner = (await ethers.getSigners())[0];
  const ownerBalance = await token.balanceOf(owner.address);

  console.log("Owner address:", owner.address);
  console.log("Owner balance:", ownerBalance.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## 7️⃣ Run it LOCALLY (no Sepolia yet)

```bash
bunx hardhat run scripts/deploy-token.ts
```

What you’ll see:

* Network name: `hardhat`
* Deployment logs
* Contract address (temporary)
* Owner balance

⚠️ Important:

* This blockchain **dies after script ends**
* Address is NOT persistent

---

## 8️⃣ “After deploying locally, how do I preview / check it?”

### Option 1️⃣: Logs (simplest)

You already saw:

* Contract address
* Owner balance

That’s basic verification.

---

### Option 2️⃣: Use Hardhat Console (VERY IMPORTANT)

Run:

```bash
bunx hardhat console
```

Then inside console:

```js
const Token = await ethers.getContractFactory("Token");
const token = await Token.deploy(1000n);
await token.waitForDeployment();

await token.totalSupply();
```

This is like:

* Remix console
* Direct blockchain interaction
* Best for learning

---

### Option 3️⃣: Persistent local chain (advanced preview)

Run a local node:

```bash
bunx hardhat node
```

In another terminal:

```bash
bunx hardhat run scripts/deploy-token.ts --network localhost
```

Now:

* Blockchain stays alive
* You can interact multiple times
* Closest to real network behavior

We’ll use this **before Sepolia**.

---

## 9️⃣ Final mental picture (connect everything)

```
Transaction created
        ↓
Broadcast to network
        ↓
Pending
        ↓
Block producer includes it
        ↓
BLOCK IS MINED
        ↓
tx.wait() resolves
```

* Bitcoin: mining = puzzles + blocks
* Ethereum: mining = block inclusion
* Hardhat: mining = instant simulation

---

## 🔥 Summary (bookmark this)

* “Mined” = included in a block
* Deployment = transaction
* State-changing function = transaction
* `tx.wait()` = wait until block inclusion
* Hardhat auto-mines instantly
* Bitcoin & Ethereum differ in **how**, not **what**

---

Next logical step (tell me):
👉 **Ignition deployment for Token**
👉 **Local node + interaction walkthrough**
👉 **Sepolia setup step-by-step**

You’re on a solid path, bro 👊




</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>


# Deployment Timings and Transaction meanings here 


Perfect question.
This is **exactly the right place to pause and lock the mental model**, because what you just fixed is not “syntax” — it’s **how Ethereum + Hardhat + Ethers actually work under the hood**.

I’ll do this cleanly:

1. 🔥 What *actually* happens when a contract is deployed
2. ❌ Why all the previous versions failed (conceptually, not just “wrong”)
3. ✅ Why the final version works
4. 🧠 What `deploymentTransaction()` really is (this is the key)

No repetition, no basics.

---

## 1️⃣ First-principle: what does “deploying a contract” really mean?

On Ethereum, **there is no special “deploy” operation**.

There is only **a transaction**.

### When you deploy a contract:

* You send a transaction
* `to = null`
* `data = bytecode + constructor args`
* The EVM executes it
* A contract address is generated
* Constructor runs
* Events may be emitted

So **deployment = a normal transaction**, just with special semantics.

> 🔑 A contract does NOT exist without a transaction.

---

## 2️⃣ What `ethers.deployContract()` actually does

```ts
const token = await ethers.deployContract("Token", [TOTAL_SUPPLY]);
```

This single line does **three things** internally:

1. Creates a **deployment transaction**
2. Sends it to the network
3. Waits until it is mined
4. Returns a **Contract instance** bound to:

   * address
   * ABI
   * provider
   * signer

Important:

> The **transaction still exists**, even though you now have a contract object.

---

## 3️⃣ The mistake in the failing versions (core reason)

Let’s analyze the failing pattern conceptually.

### ❌ This pattern (simplified)

```ts
await expect(Token.deploy(TOTAL_SUPPLY))
  .to.emit(await Token.deploy(TOTAL_SUPPLY), "Transfer");
```

### What went wrong conceptually

You mixed **three different lifecycle phases**:

| Phase                      | What you passed |
| -------------------------- | --------------- |
| Transaction being observed | Deployment A    |
| Contract used for decoding | Deployment B    |
| Receipt source             | ambiguous       |

Hardhat tried to:

* fetch logs from tx A
* decode them using contract B
* which does **not match the tx**

EDR (Hardhat v3 engine) is strict → it explodes.

That’s why the error looked cryptic and low-level.

---

## 4️⃣ Why this version STILL failed (important nuance)

You tried this next:

```ts
const deployTx = Token.deploy(TOTAL_SUPPLY);

await expect(deployTx)
  .to.emit(await deployTx, "Transfer");
```

### Why this *looks* correct but still fails

Because here:

* `deployTx` is **not a transaction**
* It is a **deployment promise** that resolves to a Contract
* `.to.emit()` expects:

  * a **TransactionResponse**
  * OR something that can yield a receipt

But `deployTx` is neither *pure tx* nor *fully bound contract yet*.

So again:

* receipt lookup
* ABI decoding
* address resolution

→ inconsistent → crash.

---

## 5️⃣ Now the working version — what changed fundamentally ✅

```ts
const token = await ethers.deployContract("Token", [TOTAL_SUPPLY]);
const deploymentTx = token.deploymentTransaction();

await expect(deploymentTx)
  .to.emit(token, "Transfer")
  .withArgs(ethers.ZeroAddress, owner.address, TOTAL_SUPPLY);
```

This works because **everything is aligned**.

Let’s break it down carefully.

---

## 6️⃣ What exactly is `deploymentTransaction()`?

This is the **most important concept**.

```ts
const deploymentTx = token.deploymentTransaction();
```

This returns:

> The **exact Ethereum transaction** that created this contract.

Even though:

* The contract already exists
* The constructor already ran
* The event already happened

The transaction object is still:

* stored by the provider
* retrievable
* replayable for log inspection

Think of it like:

> “Give me the receipt of the transaction that created you.”

---

## 7️⃣ Why we need BOTH `deploymentTx` and `token`

They play **different roles**:

### `deploymentTx`

* Source of truth for:

  * logs
  * block
  * receipt
* This is **where the event came from**

### `token`

* Used for:

  * ABI decoding
  * event signature
  * indexed parameter decoding

So `.to.emit(token, "Transfer")` means:

> “Look at the logs in this transaction
> and decode them using this contract’s ABI.”

Now everything lines up.

---

## 8️⃣ Timeline visualization (this is the lock-in)

### What actually happens

```
1. ethers.deployContract()
            ↓
2. Ethereum transaction sent
            ↓
3. Constructor runs
            ↓
4. Transfer(address(0), owner, supply) emitted
            ↓
5. Transaction mined
            ↓
6. Contract instance returned
```

### What your test does

```
1. Get contract instance (token)
2. Ask token: "Which tx created you?"
3. Fetch that tx
4. Assert event from that tx
```

Perfect alignment.

---

## 9️⃣ Why fixtures CANNOT be used for constructor-event tests

This is another subtle but important contrast.

```ts
await networkHelpers.loadFixture(deployTokenFixture);
```

Fixtures:

* Deploy once
* Snapshot chain
* Revert back for reuse

But:

* Events are **not replayed**
* Constructor already happened in the past

So you can:

* Test state ✅
* Test balances ✅
* Test transfers ✅
* ❌ NOT test constructor events

That’s why you **correctly avoided fixtures** in the minting test.

---

## 🔑 Final mental model (this is gold)

### Always remember:

* **Events come from transactions**
* **Contracts do not emit events by themselves**
* Constructor events are tied to **deployment transactions**
* In Hardhat v3:

  * Use `token.deploymentTransaction()`
  * Never guess or re-deploy

---

## Quick comparison table (as you asked)

| Version                     | Why it failed / worked |
| --------------------------- | ---------------------- |
| Double `Token.deploy()`     | Two different txs      |
| `expect(deployPromise)`     | Not a real tx          |
| Fixture-based               | Event already gone     |
| ✅ `deploymentTransaction()` | Exact tx, correct ABI  |

---

## Where you stand now (honest assessment)

You are:

* Thinking in **transaction-level terms**
* Understanding **EVM lifecycle**
* Using **Hardhat v3 correctly**
* Writing **production-grade tests**

This is *not* beginner-level anymore.

---

### Next natural step (choose one):

* 🔍 Inspect **ABI & artifacts.json** (now it’ll make sense)
* 🚀 Deploy to Sepolia using Ignition
* 🔗 Call this from frontend (ethers)
* 🧪 Write invariant tests (supply never changes)

Your move 👊



</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

Bro this confusion is **100% valid** — and honestly, this is the *exact point* where people either hand-wave things… or finally **understand Ethereum properly**.

Let’s slow this down and **rebuild the mental model cleanly**, from first principles, step by step.
No buzzwords, no magic.

---

## Step 0: One sentence truth (anchor this)

> **A contract exists because of a transaction.
> `deploymentTransaction()` just gives you that transaction back.**

Nothing more. Nothing less.

Now let’s expand that carefully.

---

## Step 1: What REALLY happens when you write this

```ts
const token = await ethers.deployContract("Token", [TOTAL_SUPPLY]);
```

This line **looks simple**, but internally it does **a LOT**.

### What `await` here actually means

It does **NOT** mean:

> “Send tx and forget”

It means:

> “Send the deployment transaction, **wait until it is mined**,
> then give me a usable contract object.”

So internally, Ethers does roughly this:

```ts
1. create deployment transaction
2. send transaction
3. wait for mining
4. get receipt
5. extract contract address
6. create Contract instance
7. return Contract instance
```

That’s why **after this line**:

* The contract **already exists**
* The constructor **already ran**
* The `Transfer(address(0), owner, supply)` event **already happened**

✅ Your understanding so far is correct.

---

## Step 2: Then WHY does `deploymentTransaction()` exist?

Here is the key misunderstanding to fix:

> **Deploying a contract ≠ losing the transaction**

Even after a transaction is mined:

* The transaction still exists
* The receipt still exists
* The logs still exist
* The blockchain is immutable

The transaction is **not “consumed” or “gone”**.

---

## Step 3: What `deploymentTransaction()` ACTUALLY returns

```ts
const deploymentTx = token.deploymentTransaction();
```

This does **NOT** deploy anything again.

It simply means:

> “Hey contract,
> give me the **transaction object** that created you.”

That’s it.

No new transaction.
No re-execution.
No waiting.

---

## Step 4: Why no `await` is needed here

You asked an **excellent question**:

> “We didn’t do `await token.waitForDeployment()` — how is this working?”

Because:

```ts
await ethers.deployContract(...)
```

👉 **already waited**.

So by the time you reach:

```ts
const deploymentTx = token.deploymentTransaction();
```

* The contract is deployed
* The deployment transaction is known
* Ethers has already cached it

So this line is just **reading metadata**, not performing async work.

Think of it like:

```ts
const user = await fetchUser();
const userId = user.id; // no await needed
```

Same idea.

---

## Step 5: Why `.deploymentTransaction()` is NECESSARY for events

Now the crucial part.

### Remember this rule (tattoo-level important):

> **Events live inside transactions, not inside contracts**

So when you say:

```ts
.to.emit(token, "Transfer")
```

Hardhat must answer:

* Which transaction?
* Which logs?
* Which receipt?

For normal functions:

```ts
await expect(token.transfer(...))
```

→ the transaction is obvious

For constructors:

```ts
token already exists
```

→ there is **no active tx anymore**

So you must explicitly say:

```ts
"Use the transaction that created this contract"
```

That’s exactly what:

```ts
token.deploymentTransaction()
```

does.

---

## Step 6: Timeline visualization (this is the “aha”)

### Actual timeline

```
t0: deployContract() called
t1: tx sent
t2: tx mined
t3: constructor runs
t4: Transfer event emitted
t5: contract instance returned
```

### Your test runs at t5+

At this point:

* Event already happened
* But logs are still in the blockchain
* You just need to **reference the correct tx**

So:

```ts
deploymentTx = token.deploymentTransaction()
```

means:

> “Give me the tx from t1–t4 so I can inspect its logs”

---

## Step 7: Why your brain feels this is “extra”

Because in Web2:

* Once something happens → it’s gone

In blockchain:

* **Everything that happened is permanent**
* You don’t “miss” events
* You **query history**

This is a **paradigm shift**, not a syntax issue.

---

## Step 8: One-line answers to your exact doubts

> **“We already deployed the contract, why another line?”**

Because that line is **not deploying**, it is **fetching the deployment transaction**.

---

> **“Why no await?”**

Because deployment already finished in the previous line.

---

> **“Is the tx already mined?”**

Yes. That’s why `deploymentTransaction()` is safe to use immediately.

---

> **“Why does Hardhat need this?”**

Because constructor events don’t have a runtime tx to attach to.

---

## Final mental model (lock this in 🔐)

```ts
deployContract()           → creates the contract
deploymentTransaction()    → gives you the tx that created it
```

They are **two views of the same reality**:

* one is the **object**
* one is the **history**

---

## Where you are now (real talk)

If you understand this:

* You understand **Ethereum execution**
* You understand **Hardhat v3**
* You understand **why constructor tests are special**
* You are thinking like a **protocol engineer**

This confusion is a **good sign**, not a bad one.

---

If you want next:

* 🔍 Visualize this with **raw tx / receipt / logs**
* 🧪 Write a test that inspects logs manually
* 🚀 Move into **Ignition deployments**
* 🔗 Bridge this understanding to frontend

Tell me 👊
