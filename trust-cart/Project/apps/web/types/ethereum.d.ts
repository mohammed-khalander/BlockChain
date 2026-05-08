import type { Eip1193Provider } from "ethers";

interface PhantomEthereumProvider extends Eip1193Provider{
  isPhantom?:boolean;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
    phantom?:{
      ethereum?:PhantomEthereumProvider;
    }
  }
}

export {};
