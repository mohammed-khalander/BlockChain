# Hardhat Course – Introduction & Roadmap (Notes)

## What this course is about

This course is a **complete introduction to Hardhat**, a development environment used for building, testing, debugging, and deploying **Ethereum smart contracts**.

The goal of the course is to take someone who already knows:

* 📦 **Blockchain basics**
* 🧱 **Solidity basics**

and help them confidently:

* ⚙️ Compile smart contracts
* 🧪 Test smart contracts
* 🐞 Debug smart contracts
* 🚀 Deploy smart contracts

All of this will be done using **Hardhat**.

---

## What is Hardhat (no assumptions)

Hardhat is a **development tool** for Ethereum smart contract developers.

In simple terms:

* ✍️ Solidity is used to **write** smart contracts
* 🛠️ Hardhat is used to **work with** those smart contracts

Hardhat helps developers do things that are not possible with Solidity alone, such as:

* 🖥️ Running a local Ethereum blockchain on your computer
* 🧾 Compiling Solidity code into machine-readable format
* 🧪 Writing automated tests for contracts
* 🐞 Debugging smart contract code
* 🌐 Deploying contracts to local networks and public test networks

Hardhat itself is **not a blockchain**, and it is **not a programming language**.
It is a **toolchain (collection of tools)**.

---

## Why Hardhat is used (advantages)

Hardhat is used because it:

* ⚡ Makes smart contract development faster
* 🛑 Reduces mistakes before deploying to real networks
* 🧠 Provides better error messages than basic Solidity tools
* 🔒 Allows safe testing without using real ETH

Key advantages:

* 🧪 Local Ethereum network for testing
* 🧾 Built-in compilation system
* ✅ Testing support
* 🐞 Debugging support
* 🚀 Flexible deployment system

---

## Topics covered in this course (high-level roadmap)

According to the instructor, the course will cover the following topics **in order**:

### 1. Understanding Hardhat

* 📘 What Hardhat is
* ❓ Why Hardhat is needed
* ⭐ Benefits of using Hardhat

### 2. Compiling Smart Contracts using Hardhat

* ✍️ Writing a smart contract (example: Token contract)
* 🧾 Compiling Solidity code using Hardhat
* 📂 Understanding the output of compilation

### 3. Testing Smart Contracts

* 🧪 Writing tests for smart contracts
* 📚 Using a JavaScript testing library (Mocha)
* ▶️ Running tests through Hardhat

Purpose of testing:

* ✅ Verify that the contract behaves correctly
* 🐛 Catch bugs before deployment

### 4. Debugging Smart Contracts

* 🐞 Debugging Solidity code
* ⚠️ Understanding errors and failures
* 🛠️ Using Hardhat’s debugging tools

### 5. Deploying Smart Contracts

* 📘 Understanding the deployment process
* 🚀 Deploying contracts using Hardhat
* 📜 Running deployment scripts

---

## Testing library mentioned in the course

The instructor mentions using **Mocha**, which is:

* 📚 A JavaScript testing library
* 🧪 Commonly used for writing automated tests

In this course, Mocha will be used to:

* 🧪 Write tests for smart contracts
* ▶️ Run tests using Hardhat

(Details of testing syntax will come later in the course.)

---

## Prerequisites for this course

The instructor clearly states that **only two prerequisites** are required:

1. 📦 Blockchain basics
2. 🧱 Solidity basics

No other knowledge is required.

Specifically:

* ❌ No frontend knowledge required
* ❌ No prior Hardhat knowledge required
* ❌ No advanced JavaScript knowledge assumed

---

## Important adjustments for our setup (STRICT RULES)

Even though the instructor uses older practices, **we will strictly use modern standards**.

### Package Manager

* 🥟 **bun** (strict)
* 🚫 `npm` will NOT be used

### Programming Language

* 🟦 **TypeScript** (strict)
* 🔁 JavaScript examples will be rewritten in TypeScript

### Module System

* 📦 Modern ES module imports only
* 🚫 `require()` will NOT be used

### Type Safety

* 🛡️ All scripts, tests, and config files will be written with proper TypeScript types
* ⚠️ No `any` unless explicitly unavoidable (and explained)

---

## What Hardhat will manage for us

Hardhat will handle:

* 📁 Project structure
* 🧾 Contract compilation
* 🧪 Local Ethereum network
* ▶️ Testing execution
* 🚀 Deployment execution

You do NOT manually:

* 🚫 Run the Ethereum protocol
* 🚫 Compile Solidity with solc directly
* 🚫 Manage low-level blockchain details

Hardhat abstracts these away.

---

## Mental model to remember

* 🧱 Solidity → writes contract logic
* 🛠️ Hardhat → builds, tests, debugs, deploys contracts
* 🧪 Local Hardhat Network → fake Ethereum for testing

---

## End of intro notes

These notes cover **everything said in the introduction video**, translated into **clear, structured English**, with **no assumptions**.

Next videos will go deeper into:

* 🥟 Setting up Hardhat with bun
* 📁 Understanding project structure
* ✍️ Writing and compiling the first contract

---

# What is Hardhat and Why It Is Better Than Truffle

## What is Hardhat

Hardhat is a **development environment for Ethereum software**.

Ethereum software here means:

* Smart contracts
* Decentralized applications (DApps)

Hardhat provides a complete environment where developers can:

* Compile smart contracts
* Deploy smart contracts
* Test smart contracts
* Debug smart contracts

All these tasks become **easier, faster, and more reliable** using Hardhat.

Hardhat plays the same role as Truffle, but with **modern design and better developer experience**.

---

## Hardhat vs Truffle (Why Hardhat was needed)

Truffle was an earlier Ethereum development environment and was widely used.
However, as DApps became larger and more complex, several limitations of Truffle became clear.

Hardhat was created to solve these problems.

---

## Key Differences Between Hardhat and Truffle

### 1. Migration and Deployment Process

* Hardhat provides a **simpler and more reliable deployment (migration) process**
* Deploying large DApps to mainnet or testnet is easier with Hardhat

In comparison:

* Truffle has a **time-consuming and fragile migration system**
* Large projects often face failures during migration in Truffle

This makes Hardhat more suitable for **real-world, production-scale applications**.

---

### 2. Gas Efficiency During Deployment

* Hardhat generally results in **lower gas usage during deployment**
* Deployment scripts give developers finer control over transactions

In comparison:

* Truffle deployments often consume **higher gas fees**
* Less control over how deployment transactions are structured

Lower gas usage is especially important when deploying to **Ethereum mainnet**.

---

### 3. Debugging Experience

* Hardhat provides a **much stronger debugging system**
* Developers can debug smart contracts more easily
* Errors are clearer and more informative

Hardhat allows:

* Using JavaScript/TypeScript logic during debugging
* Inspecting smart contract behavior step by step

In comparison:

* Truffle’s debugging tools are limited
* Error messages are often unclear

---

### 4. Flexibility for Developers

* Hardhat is designed to be **highly flexible**
* Developers can combine Solidity with JavaScript/TypeScript tooling
* Custom scripts and workflows are easy to create

This flexibility makes Hardhat suitable for:

* Complex DApps
* Advanced testing
* Custom deployment logic

---

## Industry Adoption

Because of these advantages:

* Most modern Ethereum developers are **switching from Truffle to Hardhat**
* Hardhat is now considered the **industry standard** for Ethereum development

Truffle is still usable, but it is **no longer preferred for new projects**.

---

## Interview-Ready Summary

Hardhat is a modern Ethereum development environment that simplifies compiling, testing, debugging, and deploying smart contracts.

Compared to Truffle, Hardhat offers:

* Easier and more reliable deployments
* Better gas efficiency
* Superior debugging tools
* Greater flexibility for large and complex applications

Because of these improvements, Hardhat has become the preferred choice for professional Ethereum developers.

