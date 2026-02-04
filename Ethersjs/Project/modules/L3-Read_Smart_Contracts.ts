import { ethers } from "ethers";

import { Token__factory } from "../types";

const URL = process.env.ALCHEMY_RPC_URL;

// console.log(URL);

const provider = new ethers.JsonRpcProvider(URL);

const My_Token_Address = "0x3b4F4A37e74e4C75FC031fa2f62A102d77eEbc1B"; // My Deployed contract

const myContract = Token__factory.connect(My_Token_Address,provider);

async function main(){
    console.log("The Contract is ",myContract);
    
    
    const my_wallet_address = "0x886b573a777CD0C8d9195dC9FFB4498c51AE0723";
    
    //  const code = await provider.getCode(My_Token_Address);
    //  console.log("Deployed code:", code);
    const balance = await myContract.balanceOf(my_wallet_address);
    const name = await myContract.name();
    const symbol = await myContract.symbol();
    const owner = await myContract.owner();
    const totalSupply = await myContract.totalSupply();

    console.log(`My Balance is :- ${balance}`);
    console.log(`Name of the Smart Contract :- ${name}`);
    console.log(`Symbol of the Smart Contract is :- ${symbol}`);
    console.log(`Owner of the Smart Contract is:- ${owner}`);
    console.log(`Total Supply of the Smart Contract is:- ${totalSupply}`);


}

main();



// import { ethers } from "ethers";

// import { ERC20__factory } from "../types";

// const URL = process.env.ALCHEMY_RPC_URL;

// const provider = new ethers.JsonRpcProvider(URL);


// const ERC20 = "0x6899CaaC344dfbD6D27040C741e0ea01604BcB6b";

// const contract = ERC20__factory.connect(ERC20,provider);

// async function main(){
//     const wallet_address = ""; // Provide any users wallet address
//     const balance = await contract.balanceOf(wallet_address);
//     console.log(`Balance is ${balance}`);
// }

// main();