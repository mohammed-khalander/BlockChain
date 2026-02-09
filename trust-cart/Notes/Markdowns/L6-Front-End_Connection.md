# [My-ThirdWeb Dash](https://thirdweb.com/team/wenours)
# [ThirdWeb Docs](https://portal.thirdweb.com/react/v5/getting-started#new-projects)

</br>
</br>
</br>

### Let's first do with EthersJS, later we'll move to ThirdWeb

</br>
</br>

## Things Needed to Connect NextJS to BlockChain

```
1. Smart Contract Deployed Address
2. Private Key of the owner (Who Deployed the Smart Contract)  (Particularly in this application because, only owner can add the Items to the blockchain)
3. Sepolia RPC URL (Alchemy)
4. Types Created from 'apps/contract'
```

## Connect Smart Contract to NextJS(TS,Bun)

```
1. Create Turbo Repo, following 'trust-cart\Notes\Markdowns\L1-App_Init.md'
2. Complete, 'Create,Test,Deployment' of the Smart Contract
3. Go to root/apps/web
4. bun i ethers
5. Follow the code from 'Ethersjs\Project\modules\L1-Accounts.tsw'
6. Most of the things won't work from step 5, 
7. Follow the things from 'trust-cart\Project\apps\web\contexts\AppContext.tsx'
```

## Add the MetaMask typing (exact location)

### 📄 Create this file:

```
web/
└─ types/
   └─ ethereum.d.ts   ✅ (NEW FILE)
```

---

## ✅ What to put inside `types/ethereum.d.ts`

```ts
import type { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export {};
```
