import { ethers } from "ethers";

const wallet1 = ethers.Wallet.createRandom();
const wallet2 = ethers.Wallet.createRandom();

console.log("Sender... ");
console.log(`Address ${wallet1.address}`);
console.log(`Private Key ${wallet1.privateKey}`);
console.log(`Public Key ${wallet1.publicKey}`);

console.log("\n Receiver... ");
console.log(`Address ${wallet2.address}`);
console.log(`Private Key ${wallet2.privateKey}`);
console.log(`Public Key ${wallet2.publicKey}`);

/**
 * * Sender... 
 * * Address 0x41F615644C31Eb2F9F68b8b3FD92e8687d8f1dEE
 * * Private Key 0x0aed74d20ba1a75c430df01ab716976a35e4af6bb0d30de001c87e0a7c9db3cb
 * * Public Key 0x038b0f58c9178ad2e300efeecb46370297fe6dc8cf488d2868b2a77b801af43edd
 * * 
 * *  Receiver...
 * * Address 0x8cDba478331D7e1Bb3ba8af71FAC085A72A83913
 * * Private Key 0xb069e24e2e2f80a1aecfa474b1fd9f04762aef5eb2148d1574bdc3a1a75a531c
 * * Public Key 0x03f904a3a37b0a88677eb3fe4d5a525918ebcb7a38e952affac4804bf7707e0488
 */