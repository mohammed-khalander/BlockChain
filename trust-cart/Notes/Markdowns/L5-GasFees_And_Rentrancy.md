

# Gas Fees Calculation 


### `CONTEXT`
### `trust-cart/projects/apps/contracts/contracts/TrustCart.sol` and </br> `trust-cart/projects/apps/contracts/test/TrustCart.ts` 


### `Answer`

* If User has 2ETHs in his wallet as balance, and if he sends only 2ETHS as msg.value (Even though the value of 'item' was 1ETH) gas fee will be calculated something as (msg.value+(gasLimit × gasPrice)) and the total price would be 
  </br>
* maxUpfrontCost        </br>
= msg.value + gas</br>
= 2 ETH + 0.000131 ETH</br>
= 2.000131157950783049 ETH
</br>

* And still `Solidity` is `not` here yet


</br>
</br>


## The error again (important)

```
Max upfront cost is: 2000131157950783049 wei
Sender balance is:  2000000000000000000 wei
```

Convert to ETH:

```text
2000131157950783049 wei = 2.000131157950783049 ETH
2000000000000000000 wei = 2.0 ETH
```

So the node is saying:

> “You tried to send a tx that could cost **~2.00013 ETH**,
> but the sender only has **2 ETH**.”

Now let’s answer the core confusion 👇

---

## “But item price is only 1 ETH… why 2 ETH??”

Because **you told the transaction to send 2 ETH** here 👇

```ts
contract.connect(buyer1).buyItem(
  itemId,
  { value: tokenConversion(2) } // ← THIS
);
```

So the transaction is **not**:

> buy item for 1 ETH

It is:

> send **2 ETH** to the contract, then the contract refunds the excess

---

## The EVM does NOT care about refunds (critical point)

The EVM checks **before execution**:

```text
Can the sender afford:
msg.value + (gasLimit × gasPrice) ?
```

It does **NOT** consider:

* item.price
* your refund logic
* that 1 ETH will come back

Because refunds happen **after execution**, and execution might fail.

---

## Exact breakdown of that “magic number”

Let’s reconstruct it.

### 1️⃣ You explicitly sent

```text
msg.value = 2 ETH
          = 2000000000000000000 wei
```

### 2️⃣ Hardhat estimated gas cost

From the error:

```text
extra = 131157950783049 wei
      ≈ 0.000131 ETH
```

This comes from:

```text
gasLimit × gasPrice
```

So the node computed:

```text
maxUpfrontCost
= msg.value + gas
= 2 ETH + 0.000131 ETH
= 2.000131157950783049 ETH
```

💥 That is **exactly** the number you saw.

No magic. No Solidity involved yet.

---

## Why balance = 2 ETH is still not enough

You did:

```ts
await networkHelpers.setBalance(
  buyer1.address,
  tokenConversion(2)
);
```

That gives:

```text
balance = 2.000000000000000000 ETH
```

But the tx *might* cost:

```text
2.000131157950783049 ETH
```

So the node rejects it **before** Solidity runs.

---

## Super important rule (tattoo this)

> **Refunds do not reduce the upfront cost check**

Even though your contract does this:

```solidity
uint256 excess = msg.value - item.price;
payable(msg.sender).call{value: excess}("");
```

The EVM **ignores that** when validating balance.

---

## Why this is GOOD design (security reason)

Imagine if refunds were counted upfront:

* attacker sends tx
* claims refund will happen
* tx reverts before refund
* network eats the loss

So Ethereum enforces:

> “You must afford the WORST-CASE cost.”

---

## The correct mental model (final form)

For **every payable tx**:

```text
Required balance ≥ msg.value + maxGasCost
```

Not:

```text
Required balance ≥ item.price
```

Not:

```text
Required balance ≥ (msg.value - refund)
```

---

## Why your earlier test with 1 ETH worked

Because you did:

```ts
{ value: itemPrice } // 1 ETH
setBalance(2 ETH)
```

So:

```text
required ≈ 1.00013 ETH
balance = 2 ETH ✔
```

---

## Final practical rule for tests

When overpaying on purpose:

```ts
// itemPrice = 1 ETH
setBalance(buyer, 3 ETH);
buyItem({ value: 2 ETH });
```

Give yourself **headroom for gas**.

---







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



# Query (My Doubt)

```
See sender sends 4ETH, item Price is 2ETH, 
so value to be deducted is 2ETH and refund 2ETH, but as we are in blockchain, we should cost gas fees, so user deducted (2ETH+gas fees), but gas calculated (4ETH+gas) (as he sent 4ETH), 
Basically the cost reduced is more than 2ETH from user wallet, 
But we are refunding him (4ETH-2ETH) i.e., full 2ETH, and my doubt is, shouldn't we take out gas fees (4ETH-2ETH-GasFees) ?
```

---

## First: one crucial correction

> ❌ **Gas is NOT calculated on `msg.value`**

Gas **has nothing to do with how much ETH you send**.

Gas depends on:

* how many EVM operations run
* storage writes
* logs
* external calls

Whether you send **0 ETH or 100 ETH**, the **gas cost is almost the same**.

This is the key misconception causing the confusion.

---

## Let’s redo the math properly (no shortcuts)

### Scenario

* Item price = **2 ETH**
* User sends = **4 ETH**
* Gas used = **G ETH** (example: 0.001 ETH)

---

## Step-by-step balance flow (REAL EVM behavior)

### 🔹 Initial balance

```
User balance = B
```

---

### 🔹 Step 1: Upfront check (reservation, not deduction)

Ethereum checks:

```
B ≥ msg.value + maxGas
B ≥ 4 ETH + maxGas
```

Nothing is deducted yet.
This is just a **permission check**.

---

### 🔹 Step 2: ETH transfer to contract (execution starts)

```
User balance  -= 4 ETH
Contract bal  += 4 ETH
```

Balances now:

```
User:     B − 4
Contract: +4
```

---

### 🔹 Step 3: Contract refunds excess

Your code:

```solidity
excess = msg.value - price = 4 - 2 = 2 ETH
```

Refund happens:

```
Contract bal -= 2 ETH
User bal     += 2 ETH
```

Balances now:

```
User:     B − 2
Contract: +2
```

So far: </br>
✔ user paid **exactly the item price** </br>
✔ contract keeps **exactly the item price** </br>

---

### 🔹 Step 4: Gas is charged (AFTER execution)

Now the EVM finalizes gas:

```
User balance -= G
```

Final balances:

```
User:     B − 2 − G
Contract: +2
```

---

## Final result (THIS is the invariant)

> **User always loses:**
> `item.price + gas`

> **Contract always receives:**
> `item.price`

Refund logic does **not** affect gas at all.

---

## Why your concern *sounds* logical but is incorrect

You said:

> “Gas is calculated on 4 ETH because he sent 4 ETH”

That is **not how Ethereum works**.

Gas is **not a percentage**, **not proportional**, **not based on value**.

Example:

```solidity
payable(address).call{value: 1000 ether}("");
```

Costs roughly the **same gas** as:

```solidity
payable(address).call{value: 1 wei}("");
```

Only the **existence of the call** matters, not the amount.

---

## Why Solidity must NOT subtract gas (important)

If you tried this ❌:

```solidity
refund = msg.value - price - gas;
```

Problems:

1. Gas is not known until execution finishes
2. Gas varies depending on control flow
3. Refund itself consumes gas (paradox)
4. Contract could under-refund or over-refund
5. Re-entrancy + gas math = disaster

So Ethereum **forbids** contracts from doing gas accounting.

---

## Where gas *actually* comes from (key sentence)

> **Gas is always paid from the sender’s wallet, never from `msg.value`, never from refunds, never from the contract.**

This is why your math *felt* inconsistent — you were mixing two separate accounting systems.

---

## One-line mental model (memorize this)

> **ETH you send goes to the contract.
> Gas you pay goes to the network.
> They never mix.**

---

## Final answer to your exact doubt

> “Shouldn’t we take out gas fees from the refund?”

**NO. Absolutely not.**

Because:

* gas is already charged separately
* refunding less would double-charge the user
* Ethereum guarantees `user loss = price + gas`

Your current logic is **exactly correct**.

---

## If you want, next we can:

* inspect `receipt.gasUsed` to prove this numerically
* compare tx with 1 ETH vs 100 ETH value
* simulate balance diffs line-by-line
* show how this works on mainnet Etherscan

Just say **next** 🔥










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



Perfect — let’s slow this *all* the way down and build it from first principles.
No jargon jumps, no hand-waving.

You’re confused because **two ideas are getting mixed together**:

1. **Re-entrancy** (Refer `Basics-And-Solidity\Basic-Concepts\12-DAO_And_ReEntrancyAttack.md` and `Basics-And-Solidity\Basic-Concepts\11-ReEntrancyGuard.md`)
2. **Why Ethereum charges the worst-case upfront**

They are related, but **not the same thing**.
I’ll separate them cleanly, then connect them.

---

# Part 1 — What re-entrancy ACTUALLY is (plain English)

### One-line definition

> **Re-entrancy** happens when you call an external address, and that address calls you *back* before your function finishes.

That’s it.

---

## A normal (safe) mental model

You *expect* execution to be linear:

```
buyItem()
 ├─ check conditions
 ├─ update stock
 ├─ update orders
 ├─ refund excess ETH
 └─ function ends
```

But **Ethereum does not guarantee this** when you call external addresses.

---

## Where re-entrancy enters your contract

This line in your code 👇

```solidity
(bool success,) = payable(msg.sender).call{value: excess}("");
```

This does **three dangerous things**:

1. Sends ETH
2. Calls external code
3. Gives control to `msg.sender`

If `msg.sender` is a **contract**, not a human wallet, it can do this:

```solidity
receive() external payable {
    trustCart.buyItem(itemId); // call back BEFORE original finishes
}
```

Now your execution becomes:

```
buyItem()  ← first call
 ├─ stock--
 ├─ orderCount++
 ├─ refund →
 │    attacker.receive()
 │        └─ buyItem() AGAIN
 │              ├─ stock--
 │              ├─ orderCount++
 │              ├─ refund →
 │                    attacker.receive()
 │                         └─ buyItem() AGAIN
```

This is **re-entrancy**.

The function hasn’t finished, but it’s already being run again.

---

# Part 2 — Why Ethereum assumes the WORST case

Now let’s connect this to your exact confusion.

You asked:

> “Why doesn’t Ethereum consider that my contract will refund the ETH later?”

Because **refunds happen AFTER execution**, and execution is **not guaranteed to finish safely**.

---

## Imagine this dangerous world (if Ethereum trusted refunds)

Let’s assume Ethereum did this ❌:

> “Oh, you’re sending 2 ETH but refunding 1 ETH?
> I’ll only require balance = 1 ETH.”

### Attacker scenario

1. Attacker has **1 ETH**
2. Sends tx with `{ value: 2 ETH }`
3. Ethereum lets it through (trusting refund)
4. Contract starts execution
5. Attacker re-enters during refund
6. Execution breaks / reverts / loops
7. Refund **never happens**
8. Network already accepted the tx

💥 **Who eats the missing ETH?**
The network.

This is unacceptable.

---

## So Ethereum’s rule is brutal but safe

Ethereum says:

> “I don’t care what your contract *plans* to do.
> I only care what it *might* do.”

So before execution, it checks:

```text
sender.balance ≥ msg.value + maxGasCost
```

No refunds.
No assumptions.
No trust.

This protects:

* validators
* the network
* everyone else

---

# Part 3 — Re-entrancy + refunds = why this rule exists

Re-entrancy is the **reason** Ethereum cannot trust refunds.

Because once you call:

```solidity
call{value: ...}()
```

You have **lost control**.

The callee can:

* re-enter
* revert
* consume gas
* never return

So Ethereum must assume:

> “Worst case:
>
> * ETH sent is gone
> * Gas is fully consumed
> * Refund never happens”

That’s why the upfront check is strict.

---

# Part 4 — What YOU did right (important)

Your contract already follows the **Checks-Effects-Interactions** pattern:

```solidity
require(...)
items[_itemId].stock--;
orderCount[msg.sender]++;
orders[msg.sender][currentOrderId] = ...
// THEN refund
call{value: excess}()
```

That protects *your state* from re-entrancy.

But Ethereum still must protect *itself*.

So **two different safety layers** exist:

| Layer             | Protects      | Responsibility |
| ----------------- | ------------- | -------------- |
| Solidity patterns | Your contract | You            |
| Upfront gas check | Network       | Ethereum       |

---

# Final mental model (lock this in)

### Re-entrancy

> External calls can re-enter your contract before execution finishes.

### Refunds

> Refunds are NOT guaranteed to happen.

### Ethereum’s rule

> Sender must afford the **worst-case** cost, not the happy path.

---

## One sentence that ties it all together

> Ethereum assumes **every external call might turn hostile**, so it charges you as if nothing good will happen afterward.


</br>
</br>
</br>
</br>
</br>


Perfect — let’s do this **properly and slowly**, and by the end you’ll *see* re-entrancy instead of memorizing it.

I’ll break this into **4 layers**, each building on the previous one:

---

# 1️⃣ What re-entrancy REALLY is (no buzzwords)

### Core idea (lock this first)

> **Re-entrancy = your function is still running, but it gets called again before it finishes.**

That’s it.
No hacks yet. No ETH yet. Just **control flow**.

---

## Normal expectation (what your brain assumes)

```text
Function starts
→ line 1
→ line 2
→ line 3
→ function ends
```

## What actually can happen on Ethereum

```text
Function starts
→ line 1
→ EXTERNAL CALL
     → attacker code runs
         → attacker calls your function AGAIN
             → line 1
             → line 2
             → ...
→ original function resumes (maybe)
```

Your function is now **running inside itself**.

That’s re-entrancy.

---

# 2️⃣ All the REAL places re-entrancy can happen (with examples)

Re-entrancy happens **only** when you give control away.

Here are **all common cases**.

---

## 🔴 Case 1: ETH transfer via `call` (MOST COMMON)

### Vulnerable pattern ❌

```solidity
function withdraw() external {
    uint256 bal = balances[msg.sender];

    (bool ok,) = msg.sender.call{value: bal}("");
    require(ok);

    balances[msg.sender] = 0;
}
```

### Attack flow

1. Attacker calls `withdraw`
2. ETH is sent
3. Attacker’s `receive()` runs
4. `withdraw()` is called AGAIN
5. Balance not yet set to zero
6. ETH drained repeatedly

### This is EXACTLY what happened in **The DAO hack**.

---

## 🔴 Case 2: ERC777 / ERC20 callbacks

Some tokens **call you back automatically**.

```solidity
token.transfer(msg.sender, amount); // looks safe
```

But ERC777 triggers:

```solidity
tokensReceived(...)
```

Which can re-enter your contract.

---

## 🔴 Case 3: NFT hooks (`onERC721Received`)

```solidity
nft.safeTransferFrom(address(this), msg.sender, tokenId);
```

If `msg.sender` is a contract:

```solidity
onERC721Received(...) {
    target.withdraw(); // re-enter
}
```

---

## 🔴 Case 4: External protocol calls (DEX, lending, oracles)

```solidity
oracle.getPrice();
```

If oracle is malicious or compromised → re-entry possible.

---

## 🔴 Case 5: Low-level calls (`call`, `delegatecall`)

```solidity
(bool ok,) = target.call(data);
```

This is literally saying:

> “Here, do whatever you want.”

---

# 3️⃣ The SINGLE rule that prevents re-entrancy

## 🟢 Checks → Effects → Interactions (CEI)

This rule is the heart of re-entrancy defense.

### Meaning

1. **Checks**
   Validate conditions
2. **Effects**
   Update YOUR state
3. **Interactions**
   Call external contracts LAST

---

## Vulnerable ordering ❌

```solidity
send ETH →
update balance
```

## Safe ordering ✅

```solidity
update balance →
send ETH
```

Why?

Because when re-entry happens, the state is **already updated**.

---

# 4️⃣ Now let’s walk through YOUR contract step-by-step

Here is your critical function:

```solidity
function buyItem(uint256 _itemId) external payable itemExists(_itemId) {
    Item storage item = items[_itemId];

    require(item.stock > 0);
    require(msg.value >= item.price);

    items[_itemId].stock--;               // ✅ EFFECT
    orderCount[msg.sender]++;             // ✅ EFFECT

    uint256 currentOrderId = orderCount[msg.sender];

    orders[msg.sender][currentOrderId] = Order({  // ✅ EFFECT
        orderId: currentOrderId,
        itemId: _itemId,
        pricePaid: item.price,
        timeStamp: block.timestamp
    });

    uint256 excess = msg.value - item.price;

    if (excess > 0) {
        (bool success,) = payable(msg.sender).call{value: excess}(""); // ⚠️ INTERACTION
        require(success);
    }

    emit ItemPurchased(msg.sender, currentOrderId, _itemId, item.price);
}
```

---

## 🔍 What happens if re-entrancy occurs here?

Assume attacker is a contract.

### Step-by-step attack attempt

1. Attacker calls `buyItem`
2. Stock is **decremented**
3. Order count is **incremented**
4. Order is **stored**
5. Refund triggers attacker’s `receive()`
6. Attacker calls `buyItem` again

---

### Second call reality check

```solidity
require(item.stock > 0);
```

Stock is already reduced.

```solidity
require(msg.value >= item.price);
```

Attacker must send ETH AGAIN.

So:

* No double-spend
* No duplicate order
* No state corruption
* No free item

Re-entrancy **happens**, but it is **harmless**.

This is the key realization 🔑

---

# 5️⃣ Why your contract is SAFE (in one sentence)

> **Even if re-entrancy occurs, all critical state is already finalized, so the attacker gains nothing.**

That is *exactly* what CEI guarantees.

---

# 6️⃣ Why Ethereum still doesn’t trust refunds (final connection)

Even though **your contract is safe**, Ethereum **cannot assume that**.

Some contracts:

* forget CEI
* forget guards
* forget checks

So Ethereum enforces:

```text
balance ≥ msg.value + maxGas
```

Before execution.

That’s **network-level protection**, not a judgment on your code.

---

# 7️⃣ Summary table (save this)

| Concept        | Meaning                                  |
| -------------- | ---------------------------------------- |
| Re-entrancy    | Function called again before finishing   |
| Trigger        | External call                            |
| Dangerous when | State update happens AFTER external call |
| CEI            | Updates state before interactions        |
| Your contract  | CEI-compliant                            |
| Result         | Safe even if re-entered                  |

---

## Final truth (this is the “click”)

Re-entrancy is **not about ETH transfers**.
It is about **losing control of execution flow**.

Once you see it as *control flow*, everything makes sense.

