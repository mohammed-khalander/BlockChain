import { ethers } from "ethers";
import { TrustCart__factory } from "@/types/ethers-contracts";

export const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TRUST_CART_CONTRACT_ADDRESS;

export const getReadContract = (provider: ethers.Provider) => {
  return TrustCart__factory.connect(TOKEN_ADDRESS!, provider);
};

export const getWriteContract = (signer: ethers.Signer) => {
  return TrustCart__factory.connect(TOKEN_ADDRESS!, signer);
};
