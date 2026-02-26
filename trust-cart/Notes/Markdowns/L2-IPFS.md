# [IPFS](https://pinata.cloud/)
# [IPFS Docs](https://docs.pinata.cloud/quickstart)
# [My-IPFS-Dash](https://app.pinata.cloud/ipfs/files)


</br>
</br>
</br>

# [NextJS Docs](https://docs.pinata.cloud/frameworks/next-js)


</br>
</br>
</br>
</br>




---

# 0️⃣ Why IPFS even exists (before “what it is”)

### Problem with the normal web (HTTP)

When you open:

```
https://example.com/image.png
```

You’re saying:

> “Give me the file from **this server**”

Problems:

* ❌ Server goes down → file gone
* ❌ Owner deletes/changes file → data changes
* ❌ Centralized control
* ❌ Not suitable for blockchain (immutability broken)

Blockchain needs:

* Permanent data
* Content that **cannot change**
* No single owner

👉 **IPFS was created to solve this**

---

# 1️⃣ What exactly is IPFS (plain English)

> **IPFS = InterPlanetary File System**

But forget the name.

### In simple words:

> **IPFS is a decentralized file system where files are identified by their content, not by location**

That one sentence is everything.

---

## Normal Web vs IPFS (mental shift 🧠)

### HTTP (location-based)

```
https://server.com/file.jpg
```

* Depends on **where**
* Server controls the file

### IPFS (content-based)

```
ipfs://QmXabc123...
```

* Depends on **what**
* Content controls the address

---

# 2️⃣ The CORE idea of IPFS (this must click)

### 🔥 Content Addressing

When you upload a file to IPFS:

1. File is converted into bytes
2. Bytes are hashed (cryptographic hash)
3. That hash becomes the **file address**

Example:

```
QmXabc123...
```

This is called a **CID (Content Identifier)**

📌 If file changes → hash changes
</br>
📌 Same file → same hash (always)

---

# 3️⃣ What actually happens when you upload a file?

Let’s say you upload `cat.png`

### Step-by-step:

1. File is split into chunks
2. Each chunk is hashed
3. A Merkle DAG is created
4. Final root hash = CID
5. CID uniquely represents the file

You don’t ask:

> “Give me file from server X”

You ask:

> “Give me the file that matches this hash”

---

## Visual mental model

![Image](https://www.researchgate.net/publication/338137999/figure/fig2/AS%3A839478423851009%401577158661722/Content-Addressed-Filesystem.ppm)

![Image](https://blog.ipfs.tech/assets/img/content-addressing.7939c76b.png)

![Image](https://proto.school/tutorial-assets/T0008L05-employees.png)

---

# 4️⃣ Where are IPFS files stored?

Important correction ❗</br>
**IPFS is NOT a blockchain**

Files live on:

* Your node
* Other people’s nodes
* Pinning services

If nobody stores it → it disappears.

That’s why **pinning** exists.

---

# 5️⃣ What is pinning?

> **Pinning = “Please keep this file forever”**

Pinning services:

* Pinata
* Web3.Storage
* NFT.Storage

They:

* Run IPFS nodes
* Store your data
* Guarantee availability

---

# 6️⃣ Why blockchain + IPFS is perfect

### Blockchain is BAD at storing data

* Expensive
* Slow
* Size limits

### Blockchain is GREAT at storing:

* Hashes
* References
* Proofs

So we do:

```
File → IPFS → CID → store CID on blockchain
```

🔥 This is the standard architecture.

---

# 7️⃣ How a real DApp uses IPFS

Example: NFT or Profile Picture

1. Upload image to IPFS
2. Get CID
3. Save CID in smart contract
4. Frontend reads CID
5. Fetch file from IPFS

---

# 8️⃣ Let’s do REAL integration (end-to-end)

We’ll build a **simple DApp flow**:

> Upload file → store hash on-chain → read it back

---

## PART A — Upload to IPFS (Next.js + Bun + TypeScript)

### 1️⃣ Install IPFS client (Pinata example)

```bash
bun add @pinata/sdk
```

---

### 2️⃣ Upload file to IPFS

```ts
import pinataSDK from "@pinata/sdk"
import fs from "fs"

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET!
)

export async function uploadToIPFS(filePath: string) {
  const stream = fs.createReadStream(filePath)
  const result = await pinata.pinFileToIPFS(stream)
  return result.IpfsHash // CID
}
```

Output:

```
QmXabc123...
```

---

## PART B — Store CID in Solidity

### Solidity Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FileStorage {
    string public fileCID;

    function setFile(string memory _cid) public {
        fileCID = _cid;
    }

    function getFile() public view returns (string memory) {
        return fileCID;
    }
}
```

📌 We store **CID only**, not the file.

---

## PART C — Deploy with Hardhat

```bash
bun add -d hardhat
bunx hardhat init
```

Deploy script:

```ts
const contract = await ethers.deployContract("FileStorage")
await contract.waitForDeployment()
console.log(await contract.getAddress())
```

---

## PART D — Save CID on-chain (ethers.js)

```ts
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  ABI,
  signer
)

await contract.setFile(cid)
```

Now blockchain permanently knows:

```
CID → QmXabc123...
```

---

## PART E — Read & Display in Next.js

```ts
const cid = await contract.getFile()

const imageUrl = `https://ipfs.io/ipfs/${cid}`
```

```tsx
<img src={imageUrl} />
```

🎉 File loaded from IPFS.

---

# 9️⃣ How this scales to real apps

This exact pattern is used in:

* NFTs (metadata.json)
* Profile pictures
* Documents
* DAOs
* DeFi dashboards

---

# 🔟 One diagram to lock everything

![Image](https://www.researchgate.net/publication/358616975/figure/fig2/AS%3A11431281241770808%401715235949185/PFS-based-decentralized-system.png)

![Image](https://cdn.prod.website-files.com/5ddd80927946cdaa0e71d607/614bae739b29ae6f4e7d97a1_Screen%20Shot%202021-09-22%20at%206.29.59%20PM.png)

![Image](https://www.researchgate.net/publication/365105830/figure/fig3/AS%3A11431281097101725%401668444939482/Flow-diagram-of-NFTs-application-in-governance-voting.ppm)

---

# 11️⃣ Final truth (remember this forever)

> **Blockchain stores truth, IPFS stores data**

You combine them to get:

* Decentralization
* Immutability
* Scalability

---

## You now understand (for real):

✔ What IPFS is
</br>
✔ Why it exists
</br>
✔ What a CID is
</br>
✔ Why pinning matters
</br>
✔ How DApps integrate it
</br>
✔ Full stack flow with Solidity + Hardhat + Next.js + TS + Bun
</br>

This is **core Web3 knowledge**.

---

### Next steps (pick one):

1. IPFS vs Arweave (permanent storage)
2. NFT metadata deep dive
3. Upload from browser (file input)
4. Decentralized profile DApp
5. Security + privacy in IPFS

Tell me what you want next and we go deeper 👊
