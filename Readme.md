<div align="center">

<img src="logo.svg" alt="TrustCart Logo" width="128">

# TrustCart
### *Secure, Transparent, Trustless Direct-to-Consumer Supply Chain, Powered by Blockchain.*

[![Solidity](https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black)](#)
[![Hardhat](https://img.shields.io/badge/Hardhat-222222?style=for-the-badge&logo=hardhat)](#)
[![ThirdWeb](https://img.shields.io/badge/ThirdWeb-000000?style=for-the-badge)](#)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-2535a0?style=for-the-badge&logo=ethers)](#)
[![Pinata](https://img.shields.io/badge/Pinata_IPFS-5022bd?style=for-the-badge)](#)
[![Sepolia](https://img.shields.io/badge/Sepolia-Testnet-627EEA?style=for-the-badge&logo=ethereum&logoColor=white)](#)
[![MetaMask](https://img.shields.io/badge/MetaMask-F6851B?style=for-the-badge&logo=metamask&logoColor=white)](#)
[![Turborepo](https://img.shields.io/badge/Turborepo-High--Performance-EF4444?logo=turborepo&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](#)
</div>

---

## Overview

**TrustCart** is a blockchain-based Direct-to-Consumer (D2C) supply chain platform. Designed to eliminate intermediaries and fight counterfeiting, TrustCart guarantees that goods originate exclusively from a verified manufacturer (Admin) and transfer ownership directly to the end consumer, with every step of that pipeline permanently recorded on-chain.

By leveraging blockchain technology, the entire D2C pipeline, from manufacturer inventory registration to consumer ownership transfer is permanently recorded on-chain. This creates a trustless environment where product origin is indisputable,the supply chain is fully auditable, and settlements are handled directly via autonomous smart contract escrows with zero platform fees.

---

## Key Features & Technology Stack

TrustCart integrates cutting-edge Web3 technologies to provide a seamless, secure, decentralized and fully transparent D2C supply chain ecosystem:

### Immutable Smart Contracts (Solidity & HardHat)
- **Verified Manufacturer Inventory:** The supply chain origin is strictly enforced via **Solidity** smart contracts. Only the authorized Admin (Manufacturer) can securely initialize product categories and transparently increment stock on-chain (`listItem`, `addStock`), completely preventing unverified counterfeit injection at the source.
- **On-Chain Retail & Escrow Logic:** Consumers trigger transparent point-of-sale ownership transfers (`buyItem`), which natively reduces verification stock, issues a permanent order receipt on the blockchain, and securely escrows exactly calculated cryptocurrency payments for the admin to claim later (`withdraw`).
- **Development Environment:** **HardHat** creates the foundational infrastructure for securely writing, thoroughly testing, and deploying these smart contracts locally
- **Extensive Testing Suite (Mocha & Chai):** The business logic is backed by comprehensive automated testing using Hardhat Network Helpers and Chai assertions. Tests stringently validate state modifications, strict access control limits (`onlyOwner`), contract boundaries, and precision EVM math specifically ensuring that gas execution costs and overpayments during purchases are immutably and flawlessly refunded down to the exact Wei.

### Blockchain Synchronization (Ethers.js)
- **Reliable Networking:** **Ethers.js** serves as the vital bridge, seamlessly reading event logs regarding product journeys and securely signing transactions to update supply chain states without friction.

### Web3 Onboarding & Integration (ThirdWeb)
- **Frictionless Authentication:** By utilizing **ThirdWeb**, TrustCart provides a smooth wallet connection experience for all supply-chain participants (Manufacturers, Distributors, Retailers, and Consumers).
- **Contract Dashboards:** ThirdWeb accelerates the interaction with deployed Smart Contracts, mitigating complex boilerplate on the client side.

### Decentralized Storage (Pinata / IPFS)
- **Tamper-Proof Metadata:** Because storing heavy data fully on-chain is expensive, all product imagery, detailed specifications, and manufacturing documents are pinned identically to the IPFS network via **Pinata**. The resulting cryptographic hash is what gets stored on-chain, proving the metadata has never been altered.

<br>

<div align="center">
  <table border="1" cellpadding="20" style="border-radius:10px; border-color:#e6e6e6;">
    <tr>
      <td align="center">
        <h2> Dive into the Codebase</h2>
        <p><i>The complete Smart Contracts, automated tests, and Next.js portals reside within our Turborepo workspace.</i></p>
        <a href="./trust-cart/Project">
          <img src="https://img.shields.io/badge/📂_ACCESS_SOURCE_CODE-trust--cart%2FProject-2535a0?style=for-the-badge&logo=files&logoColor=white" alt="Source Code Path" />
        </a>
      </td>
    </tr>
  </table>
</div>
