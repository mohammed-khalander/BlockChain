import hre from "hardhat";

const { ethers, networkName } = await hre.network.connect();



async function main() {
    console.log(`Deploying Token to network: ${networkName} `);
    const TOTAL_SUPPLY = 1000n;

    // Deploy

    const token = await ethers.deployContract("Token",[TOTAL_SUPPLY]);

    console.log("Waiting for Deployment Transaction.....");
    await token.waitForDeployment();


    const address = await token.getAddress();
    console.log(`Token Deployed at ${address}`);

    // Verify Initial State after deploymnet

    const [owner] = await ethers.getSigners();
    const ownerBalance = await token.balanceOf(owner.address);

    console.log(`Owner Object is :- ${owner}`);
    console.log(`Owner is :- ${JSON.stringify(owner)}`);
    console.dir(owner, { depth: null, showHidden: true });
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(owner)));
    console.log(`Owner Address:- ${owner.address}`);
    console.log(`Owner Balance is ${ownerBalance}`);
    console.log(`Owner Balance is (Stringified) ${ownerBalance.toString()}`);

}

main().catch((error)=>{
    console.error("Deployment Exited With Errors :- ",error);
    process.exitCode = 1;
})



/**
 * * Output:- Local Network
 * 
 * * $ bunx hardhat run scripts/Token.ts
 * * 
 * * 
 * * Deploying Token to network: default 
 * * Waiting for Deployment Transaction.....
 * * Token Deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3
 * * Owner Object is :- [object Object]
 * * Owner is :- "<SignerWithAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266>"
 * * HardhatEthersSigner {
 * *   address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 * *   provider: HardhatEthersProvider { [provider]: [Getter] }
 * * }
 * * [
 * *   'constructor',
 * *   'connect',
 * *   'authorize',
 * *   'populateAuthorization',
 * *   'getNonce',
 * *   'populateCall',
 * *   'populateTransaction',
 * *   'estimateGas',
 * *   'call',
 * *   'resolveName',
 * *   'signTransaction',
 * *   'sendTransaction',
 * *   'signMessage',
 * *   'signTypedData',
 * *   'getAddress',
 * *   'toJSON'
 * * ]
 * * Owner Address:- 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
 * * Owner Balance is 1000
 * * Owner Balance is (Stringified) 1000
 */




/**
 * * Output:- Sepolia RPC Network (testnet)
 * 
 * * mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/HardHat/Project (main)
 * *  $ bunx hardhat keystore set SEPOLIA_RPC_URL
 * *  
 * *  👷🔐 Hardhat Production Keystore 🔐👷
 * *  
 * *  This is the first time you are using the production keystore, please set a password.
 * *  The password must have at least 8 characters.
 * *  
 * *  [hardhat-keystore] Enter the password: ********************
 * *  [hardhat-keystore] Please confirm your password: ********************
 * *  [hardhat-keystore] Enter secret to store in the production keystore: **********************************************************
 * *  Key "SEPOLIA_RPC_URL" set in the production keystore
 * *  
 * *  mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/HardHat/Project (main)
 * *  $ bunx hardhat keystore set SEPOLIA_PRIVATE_KEY
 * *  [hardhat-keystore] Enter the password: ********************
 * *  [hardhat-keystore] Enter secret to store in the production keystore: ****************************************************************
 * *  Key "SEPOLIA_PRIVATE_KEY" set in the production keystore
 * *  
 * *  mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/HardHat/Project (main)
 * *  $ bunx hardhat run scripts/Token.ts --build-profile production --network sepolia
 * *  
 * *  
 * *  
 * *  [hardhat-keystore] Enter the password: ********************
 * *  Deploying Token to network: sepolia 
 * *  Waiting for Deployment Transaction.....
 * *  Token Deployed at 0x40D32c460aC59BFCce8EbBdC642b57524EF8Afc4
 * *  Owner Object is :- [object Object]
 * *  Owner is :- "<SignerWithAddress 0x886b573a777CD0C8d9195dC9FFB4498c51AE0723>"
 * *  HardhatEthersSigner {
 * *    address: '0x886b573a777CD0C8d9195dC9FFB4498c51AE0723',
 * *    provider: HardhatEthersProvider { [provider]: [Getter] }
 * *  }
 * *  [
 * *    'constructor',
 * *    'connect',
 * *    'authorize',
 * *    'populateAuthorization',
 * *    'getNonce',
 * *    'populateCall',
 * *    'populateTransaction',
 * *    'estimateGas',
 * *    'call',
 * *    'resolveName',
 * *    'signTransaction',
 * *    'sendTransaction',
 * *    'signMessage',
 * *    'signTypedData',
 * *    'getAddress',
 * *    'toJSON'
 * *  ]
 * *  Owner Address:- 0x886b573a777CD0C8d9195dC9FFB4498c51AE0723
 * *  Owner Balance is 1000
 * *  Owner Balance is (Stringified) 1000
 * *  
 * *  mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/HardHat/Project (main)
 * *  $
 */
