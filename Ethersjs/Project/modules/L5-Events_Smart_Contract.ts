import { ethers } from "ethers";

import { env } from "../types/env";
import { Token__factory } from "../types";

const URL = env.TENDERLY_RPC_URL;

const provider = new ethers.JsonRpcProvider(URL);

const my_deployed_contract_address = "0x3b4F4A37e74e4C75FC031fa2f62A102d77eEbc1B";

const my_contract = Token__factory.connect(my_deployed_contract_address,provider);


async function main(){
    const blockNum = await provider.getBlockNumber();  // Output:- The Block Number is 10190312
    console.log(`The Block Number is ${blockNum}`);
    /**
     * * On Ethereum, transactions are grouped into blocks.
     * 
     * * Think of Ethereum like a logbook:
     * * Every block = one new page
     * 
     * * Each page has:
     * *    a block number
     * *    many transactions
     * *    logs (events) emitted by contracts
     */

    // const transferEvents = await my_contract.queryFilter('Transfer',blockNum-9,blockNum);
    // console.log(transferEvents);

    const filter = my_contract.filters.Transfer();  // This one is type safer

    const events = await my_contract.queryFilter(filter,blockNum-1,blockNum);
    console.log(events.length);
    console.log(events[0]);
}

main();