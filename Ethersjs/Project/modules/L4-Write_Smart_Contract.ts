// https://dashboard.tenderly.co/yixam/learning-ether/testnet/88b0c1bd-8b66-430f-8070-c1b25a66ce28/wallets/watched

import { env } from "../types/env";
import { promptForKey } from "../helpers/key-prompt";

import { ethers } from "ethers";

import { Token__factory } from "../types";


const URL = env.TENDERLY_RPC_URL;

const provider = new ethers.JsonRpcProvider(URL);

const RECEIVER = "0x41f615644c31eb2f9f68b8b3fd92e8687d8f1dee";


const My_Token_Address = "0x3b4F4A37e74e4C75FC031fa2f62A102d77eEbc1B"; 

const myContract = Token__factory.connect(My_Token_Address,provider);


async function main(){
    const privateKey = await promptForKey();

    const wallet = new ethers.Wallet(privateKey as string,provider);
    
    let SENDER_BALANCE = await myContract.balanceOf(wallet.address);
    let RECEIVER_BALANCE = await myContract.balanceOf(RECEIVER);

    // console.log(`BEFORE:- Sender Balance is :- ${ethers.formatEther(SENDER_BALANCE)}`);
    // console.log(`BEFORE:- Receiver Balance is :- ${ethers.formatEther(RECEIVER_BALANCE)}`);
    console.log(`BEFORE:- Sender Balance is :- ${SENDER_BALANCE}`);
    console.log(`BEFORE:- Receiver Balance is :- ${RECEIVER_BALANCE}`);
    


    const AMOUNT = 100n;

    console.log(`Transaction Started......`);

    const transaction = await myContract.connect(wallet).transfer(RECEIVER,AMOUNT);

    console.log(`Transaction Processing......`);

    await transaction.wait();

    


    
    SENDER_BALANCE = await myContract.balanceOf(wallet.address);
    RECEIVER_BALANCE = await myContract.balanceOf(RECEIVER);

    console.log(`AFTER:- Sender Balance is :- ${SENDER_BALANCE}`);
    console.log(`AFTER:- Receiver Balance is :- ${RECEIVER_BALANCE}`);
    
}


main();


/**
 * * So for our Smart Contract we'll get the output as below (I mean for the token balances if we format, otherwise it'll be normal 1000 tokens)
 * 
 * * $ bun run modules/L4-Write_Smart_Contract.ts 
 * * prompt: Enter Metamask Private Key (Sender):
 * * BEFORE:- Sender Balance is :- 0.000000000000001
 * * BEFORE:- Receiver Balance is :- 0.0
 * * AFTER:- Sender Balance is :- 0.000000000000001
 * * AFTER:- Receiver Balance is :- 0.0
 * 
 * 
 * 
 * * mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/Ethersjs/Project (main)
 * * $ bun run modules/L4-Write_Smart_Contract.ts 
 * * prompt: Enter Metamask Private Key (Sender):
 * * BEFORE:- Sender Balance is :- 1000
 * * BEFORE:- Receiver Balance is :- 0
 * * AFTER:- Sender Balance is :- 1000
 * * AFTER:- Receiver Balance is :- 0
 * * 
 * * mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/Ethersjs/Project (main)
 * * $ bun run modules/L4-Write_Smart_Contract.ts 
 * * prompt: Enter Metamask Private Key (Sender):
 * * BEFORE:- Sender Balance is :- 1000
 * * BEFORE:- Receiver Balance is :- 0
 * * Transaction Processing......
 * * AFTER:- Sender Balance is :- 900
 * * AFTER:- Receiver Balance is :- 100


 */