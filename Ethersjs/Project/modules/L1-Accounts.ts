import {ethers} from "ethers";

const url = process.env.ALCHEMY_RPC_URL!;
const address = process.env.ETH_ADDRESS!;

const provider = new ethers.JsonRpcProvider(url);
// A provider is your app’s connection to the Ethereum network. (From this we can speak to blockchain network)

async function main(){
    const balance = await provider.getBalance(address);  
    console.log(`balance :- ${ethers.formatEther(balance)}`);
}

main();