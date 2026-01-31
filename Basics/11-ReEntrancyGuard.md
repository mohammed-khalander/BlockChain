Perfect — **quick revision mode ON**.
This is the kind of summary you reread before interviews, audits, or writing prod code.

---

# 🔁 Reentrancy — Quick Revision Notes

---

## 1️⃣ What is Reentrancy (core idea)

> **Reentrancy happens when a function is entered again before its first execution finishes.**

Why it’s possible:

* Ethereum allows **external calls mid-function**
* External contracts can **call you back immediately**
* State may not be updated yet

⚠️ Reentrancy is **same transaction, same call stack**, not multiple txs.

---

## 2️⃣ Where reentrancy comes from (danger line)

```solidity
someAddress.call{value: amount}("");
```

This does **two things**:

1. Sends ETH
2. Transfers execution control

If `someAddress` is a **contract**, its code runs immediately.

---

## 3️⃣ Owner can be a contract (important)

```solidity
address payable public owner;
```

`owner` can be:

* ✅ EOA (wallet)
* ⚠️ Contract

If owner is a **contract**:

* ETH receipt triggers its code
* That code can re-enter your contract

You **must assume owner can be malicious**.

---

## 4️⃣ `receive()` and `fallback()` (simple)

### `receive()`

```solidity
receive() external payable {}
```

Runs when:

* Contract receives ETH
* AND calldata is empty

### `fallback()`

```solidity
fallback() external payable {}
```

Runs when:

* No function matches
* OR ETH sent with data

⚠️ Both can:

* Call back into your contract
* Trigger reentrancy

---

## 5️⃣ Classic vulnerable pattern ❌

```solidity
function withdraw() external {
    require(balance[msg.sender] > 0);

    msg.sender.call{value: balance[msg.sender]}("");

    balance[msg.sender] = 0;
}
```

Problem:

* External call before state update
* Balance reused on re-entry

---

## 6️⃣ Safe pattern ✅ (Checks → Effects → Interactions)

```solidity
function withdraw() external {
    uint256 amount = balance[msg.sender];
    require(amount > 0);

    balance[msg.sender] = 0;

    msg.sender.call{value: amount}("");
}
```

State updated **before** external call.

---

## 7️⃣ What is ReentrancyGuard (1-liner)

> **ReentrancyGuard is a mutex that prevents a function from being called again while it is already executing.**

---

## 8️⃣ How ReentrancyGuard works (concept)

```solidity
bool locked;

modifier nonReentrant() {
    require(!locked);
    locked = true;
    _;
    locked = false;
}
```

* First call locks
* Re-entry fails
* Function finishes → unlocks

---

## 9️⃣ Production-grade usage (industry standard)

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Vault is ReentrancyGuard {
    function withdraw() external nonReentrant {
        // safe logic
    }
}
```

From **OpenZeppelin**
→ audited, gas-optimized, battle-tested

---

## 🔟 When to use ReentrancyGuard

Use it when:

* Sending ETH
* Calling external contracts
* Handling balances / funds
* Writing upgradeable or evolving contracts

Think of it as **insurance**.

---

## 1️⃣1️⃣ What ReentrancyGuard does NOT protect against

❌ Flash loan abuse
❌ Price manipulation
❌ Logic bugs
❌ Governance attacks

✅ Only same-call-stack reentrancy

---

## 1️⃣2️⃣ Your HotelRoom contract (TL;DR)

```solidity
currentStatus = Statuses.Occupied;
owner.call{value: msg.value}("");
```

Why safe:

* State updated before external call

Why still add guard:

* Future-proofing
* Human-proofing
* Audit-friendly

---

## 1️⃣3️⃣ One sentence to remember forever

> **Any time you call an external contract before updating state, reentrancy is possible — ReentrancyGuard makes that impossible.**

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

---



🔥 **Excellent catch. This is a *real* concern and you’re thinking exactly like a protocol engineer now.**

Let’s answer it **precisely**, with EVM rules, not vibes.

---

## The worry (restated clearly)

You’re looking at this safe pattern:

```solidity
uint256 amount = balances[msg.sender];
require(amount > 0);

balances[msg.sender] = 0;

(bool ok,) = msg.sender.call{value: amount}("");
```

And asking:

> ❓ *What if `call()` fails?
> We already set balance to zero — won’t the user lose their money?*

Totally valid fear.
**But here’s the key rule you’re missing 👇**

---

## 🔑 Core Ethereum rule (this answers everything)

> **If a transaction reverts, ALL state changes revert.**
>
> Ethereum transactions are **atomic**.

That means:

* Either **everything succeeds**
* Or **nothing happened at all**

There is **no partial state**.

---

## What actually happens in practice

### ✅ Correct, production-grade version

```solidity
function withdraw() external {
    uint256 amount = balances[msg.sender];
    require(amount > 0, "No balance");

    balances[msg.sender] = 0;

    (bool ok,) = msg.sender.call{value: amount}("");
    require(ok, "ETH transfer failed");
}
```

Now let’s simulate both cases.

---

## Case 1️⃣ `call()` succeeds

Execution:

1. balance read
2. balance set to 0
3. ETH sent
4. `ok == true`
5. function ends normally

✅ Final state:

* User got ETH
* Balance is zero
  ✔ Correct

---

## Case 2️⃣ `call()` FAILS

Execution:

1. balance read
2. balance set to 0
3. ETH send fails
4. `ok == false`
5. `require(ok)` **REVERTS**

💥 **REVERT TRIGGERS FULL ROLLBACK**

Ethereum automatically:

* Restores `balances[msg.sender]` to original value
* Refunds unused gas
* Cancels ETH transfer
* Pretends the function never ran

❗ There is **NO STATE where balance is zero and ETH wasn’t sent**

---

## This is NOT optional behavior

This is guaranteed by the EVM.

You literally **cannot** end up with:

```text
balance = 0
ETH not sent
```

If `require` is used.

---

## ⚠️ When this *would* be dangerous

Here’s the **actual footgun**:

```solidity
balances[msg.sender] = 0;
msg.sender.call{value: amount}("");
// no require checking success
```

Now if `call()` fails:

* Execution continues
* Function ends normally
* Balance stays zero
* ETH not sent

🔥 **Funds lost**

That’s why **checking `ok` is mandatory**.

---

## Why this pattern is industry standard

This exact structure:

```solidity
effects
external call
require(success)
```

Is used because it gives you **both**:

* Reentrancy safety
* Atomic correctness

---

## One-sentence takeaway (burn this in)

> **State updates before external calls are safe as long as you revert on failure — Ethereum guarantees atomic rollback.**

If you remember *only one thing*, remember that.

---

## Tiny mental checklist for withdrawals

✔ Update state first
✔ External call after
✔ ALWAYS check return value
✔ Revert on failure
✔ (Optionally) add ReentrancyGuard

---

If you want next:

* Why `try/catch` sometimes replaces `require`
* Why `transfer()` used to auto-revert
* Gas griefing & why `call` is still correct
* Real-world bugs caused by missing `require(ok)`

Say the word 👊
