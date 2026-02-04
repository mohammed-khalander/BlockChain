import "dotenv/config";
import { ethers } from "ethers";

import { promptForKey } from "../helpers/key-prompt";

const URL = process.env.TENDERLY_RPC_URL!;
const provider = new ethers.JsonRpcProvider(URL);
const RECEIVER = "0xb7B9ee26d6e4bbf6E555d68b7C1f11E4a8f6A6Ad";


async function main(){
    const privateKey = await promptForKey();
    /**
     * * Use wallets generated in 'generate-keys' helper module 
     * * 0x0aed74d20ba1a75c430df01ab716976a35e4af6bb0d30de001c87e0a7c9db3cb
     */

    console.log(`Private Key :-  ${privateKey}`);
    const wallet = new ethers.Wallet(privateKey as string,provider);

    const senderBalanceBefore = await provider.getBalance(wallet.address);
    const receiverBalanceBefore = await provider.getBalance(RECEIVER);
    console.log(`Sender Balance Before :- ${ethers.formatEther(senderBalanceBefore)}`);  // wei to ether
    console.log(`Receiver Balance Before :- ${ethers.formatEther(receiverBalanceBefore)}`);


    console.log(`Transaction Initiated `);
    const transaction = await wallet.sendTransaction({
        to:RECEIVER,
        value:ethers.parseUnits("1",18), // Ether to Wei
    })

    /** Use Tenderly to fund your accounts with some ethers */

    console.log(`\n\nTransaction Processing....`);
    
    const receipt = await transaction.wait();

    // console.log(`Transaction :- ${transaction}`);
    // console.log(`Reciept of the transaction :- ${receipt}`);
    console.log(transaction);
    console.log(receipt);


    const senderBalanceAfter = await provider.getBalance(wallet.address);
    const receiverBalanceAfter = await provider.getBalance(RECEIVER);

    console.log(`Sender Balance After :- ${ethers.formatEther(senderBalanceAfter)}`);
    console.log(`Receiver Balance After :- ${ethers.formatEther(receiverBalanceAfter)}`);
      
}

main();


/**
 * * Output:- 
 * * $ bun modules/L2-Send_Signed_Transaction.ts 
 * * prompt: Enter Metamask Private Key (Sender):
 * * Private Key :-  0x0aed74d20ba1a75c430df01ab716976a35e4af6bb0d30de001c87e0a7c9db3cb
 * * Sender Balance Before :- 8.999999999999958
 * * Receiver Balance Before :- 1.0
 * * Transaction Initiated 


 * * Transaction Processing....
 * * TransactionResponse {
 *   provider: JsonRpcProvider {
 *     _getConnection: [Function: _getConnection],
 *     send: [AsyncFunction: send],
 *     _send: [AsyncFunction: _send],
 *     _getSubscriber: [Function: _getSubscriber],
 *     pollingInterval: [Getter/Setter],
 *     _getOption: [Function: _getOption],
 *     _network: [Getter],
 *     _perform: [AsyncFunction: _perform],
 *     _detectNetwork: [AsyncFunction: _detectNetwork],
 *     _start: [Function: _start],
 *     _waitUntilReady: [AsyncFunction: _waitUntilReady],
 *     ready: [Getter],
 *     getRpcTransaction: [Function: getRpcTransaction],
 *     getRpcRequest: [Function: getRpcRequest],
 *     getRpcError: [Function: getRpcError],
 *     getSigner: [AsyncFunction: getSigner],
 *     listAccounts: [AsyncFunction: listAccounts],
 *     destroy: [Function: destroy],
 *     provider: [Getter],
 *     plugins: [Getter],
 *     attachPlugin: [Function: attachPlugin],
 *     getPlugin: [Function: getPlugin],
 *     disableCcipRead: [Getter/Setter],
 *     ccipReadFetch: [AsyncFunction: ccipReadFetch],
 *     _wrapBlock: [Function: _wrapBlock],
 *     _wrapLog: [Function: _wrapLog],
 *     _wrapTransactionReceipt: [Function: _wrapTransactionReceipt],
 *     _wrapTransactionResponse: [Function: _wrapTransactionResponse],
 *     getBlockNumber: [AsyncFunction: getBlockNumber],
 *     _getAddress: [Function: _getAddress],
 *     _getBlockTag: [Function: _getBlockTag],
 *     _getFilter: [Function: _getFilter],
 *     _getTransactionRequest: [Function: _getTransactionRequest],
 *     getNetwork: [AsyncFunction: getNetwork],
 *     getFeeData: [AsyncFunction: getFeeData],
 *     estimateGas: [AsyncFunction: estimateGas],
 *     call: [AsyncFunction: call],
 *     getBalance: [AsyncFunction: getBalance],
 *     getTransactionCount: [AsyncFunction: getTransactionCount],
 *     getCode: [AsyncFunction: getCode],
 *     getStorage: [AsyncFunction: getStorage],
 *     broadcastTransaction: [AsyncFunction: broadcastTransaction],
 *     getBlock: [AsyncFunction: getBlock],
 *     getTransaction: [AsyncFunction: getTransaction],
 *     getTransactionReceipt: [AsyncFunction: getTransactionReceipt],
 *     getTransactionResult: [AsyncFunction: getTransactionResult],
 *     getLogs: [AsyncFunction: getLogs],
 *     _getProvider: [Function: _getProvider],
 *     getResolver: [AsyncFunction: getResolver],
 *     getAvatar: [AsyncFunction: getAvatar],
 *     resolveName: [AsyncFunction: resolveName],
 *     lookupAddress: [AsyncFunction: lookupAddress],
 *     waitForTransaction: [AsyncFunction: waitForTransaction],
 *     waitForBlock: [AsyncFunction: waitForBlock],
 *     _clearTimeout: [Function: _clearTimeout],
 *     _setTimeout: [Function: _setTimeout],
 *     _forEachSubscriber: [Function: _forEachSubscriber],
 *     _recoverSubscriber: [Function: _recoverSubscriber],
 *     on: [AsyncFunction: on],
 *     once: [AsyncFunction: once],
 *     emit: [AsyncFunction: emit],
 *     listenerCount: [AsyncFunction: listenerCount],
 *     listeners: [AsyncFunction: listeners],
 *     off: [AsyncFunction: off],
 *     removeAllListeners: [AsyncFunction: removeAllListeners],
 *     addListener: [AsyncFunction: addListener],
 *     removeListener: [AsyncFunction: removeListener],
 *     destroyed: [Getter],
 *     paused: [Getter/Setter],
 *     pause: [Function: pause],
 *     resume: [Function: resume],
 *   },
 *   blockNumber: null,
 *   blockHash: null,
 *   index: undefined,
 *   hash: "0x8911a98089f7522354775b3dc2ed66ac9fc408644d34abdafbda7e0f91131823",
 *   type: 2,
 *   to: "0xb7B9ee26d6e4bbf6E555d68b7C1f11E4a8f6A6Ad",
 *   from: "0x41F615644C31Eb2F9F68b8b3FD92e8687d8f1dEE",
 *   nonce: 1,
 *   gasLimit: 21000n,
 *   gasPrice: undefined,
 *   maxPriorityFeePerGas: 1n,
 *   maxFeePerGas: 3n,
 *   maxFeePerBlobGas: null,
 *   data: "0x",
 *   value: 1000000000000000000n,
 *   chainId: 11155111n,
 *   signature: Signature { r: 0xf1a508ab40f95a60e26f4b74f4cde1fbb56fdc0f7e89a464412cb6af4ee4759e, s: 0x198dac6e9e0f5918f53e3d764ddcebad4975d0ab77c459fc8a74efa062178f3a, v: 28 },
 *   accessList: [],
 *   blobVersionedHashes: null,
 *   authorizationList: null,
 *   toJSON: [Function: toJSON],
 *   getBlock: [AsyncFunction: getBlock],
 *   getTransaction: [AsyncFunction: getTransaction],
 *   confirmations: [AsyncFunction: confirmations],
 *   wait: [AsyncFunction: wait],
 *   isMined: [Function: isMined],
 *   isLegacy: [Function: isLegacy],
 *   isBerlin: [Function: isBerlin],
 *   isLondon: [Function: isLondon],
 *   isCancun: [Function: isCancun],
 *   removedEvent: [Function: removedEvent],
 *   reorderedEvent: [Function: reorderedEvent],
 *   replaceableTransaction: [Function: replaceableTransaction],
 * }
 * TransactionReceipt {
 *   provider: JsonRpcProvider {
 *     _getConnection: [Function: _getConnection],
 *     send: [AsyncFunction: send],
 *     _send: [AsyncFunction: _send],
 *     _getSubscriber: [Function: _getSubscriber],
 *     pollingInterval: [Getter/Setter],
 *     _getOption: [Function: _getOption],
 *     _network: [Getter],
 *     _perform: [AsyncFunction: _perform],
 *     _detectNetwork: [AsyncFunction: _detectNetwork],
 *     _start: [Function: _start],
 *     _waitUntilReady: [AsyncFunction: _waitUntilReady],
 *     ready: [Getter],
 *     getRpcTransaction: [Function: getRpcTransaction],
 *     getRpcRequest: [Function: getRpcRequest],
 *     getRpcError: [Function: getRpcError],
 *     getSigner: [AsyncFunction: getSigner],
 *     listAccounts: [AsyncFunction: listAccounts],
 *     destroy: [Function: destroy],
 *     provider: [Getter],
 *     plugins: [Getter],
 *     attachPlugin: [Function: attachPlugin],
 *     getPlugin: [Function: getPlugin],
 *     disableCcipRead: [Getter/Setter],
 *     ccipReadFetch: [AsyncFunction: ccipReadFetch],
 *     _wrapBlock: [Function: _wrapBlock],
 *     _wrapLog: [Function: _wrapLog],
 *     _wrapTransactionReceipt: [Function: _wrapTransactionReceipt],
 *     _wrapTransactionResponse: [Function: _wrapTransactionResponse],
 *     getBlockNumber: [AsyncFunction: getBlockNumber],
 *     _getAddress: [Function: _getAddress],
 *     _getBlockTag: [Function: _getBlockTag],
 *     _getFilter: [Function: _getFilter],
 *     _getTransactionRequest: [Function: _getTransactionRequest],
 *     getNetwork: [AsyncFunction: getNetwork],
 *     getFeeData: [AsyncFunction: getFeeData],
 *     estimateGas: [AsyncFunction: estimateGas],
 *     call: [AsyncFunction: call],
 *     getBalance: [AsyncFunction: getBalance],
 *     getTransactionCount: [AsyncFunction: getTransactionCount],
 *     getCode: [AsyncFunction: getCode],
 *     getStorage: [AsyncFunction: getStorage],
 *     broadcastTransaction: [AsyncFunction: broadcastTransaction],
 *     getBlock: [AsyncFunction: getBlock],
 *     getTransaction: [AsyncFunction: getTransaction],
 *     getTransactionReceipt: [AsyncFunction: getTransactionReceipt],
 *     getTransactionResult: [AsyncFunction: getTransactionResult],
 *     getLogs: [AsyncFunction: getLogs],
 *     _getProvider: [Function: _getProvider],
 *     getResolver: [AsyncFunction: getResolver],
 *     getAvatar: [AsyncFunction: getAvatar],
 *     resolveName: [AsyncFunction: resolveName],
 *     lookupAddress: [AsyncFunction: lookupAddress],
 *     waitForTransaction: [AsyncFunction: waitForTransaction],
 *     waitForBlock: [AsyncFunction: waitForBlock],
 *     _clearTimeout: [Function: _clearTimeout],
 *     _setTimeout: [Function: _setTimeout],
 *     _forEachSubscriber: [Function: _forEachSubscriber],
 *     _recoverSubscriber: [Function: _recoverSubscriber],
 *     on: [AsyncFunction: on],
 *     once: [AsyncFunction: once],
 *     emit: [AsyncFunction: emit],
 *     listenerCount: [AsyncFunction: listenerCount],
 *     listeners: [AsyncFunction: listeners],
 *     off: [AsyncFunction: off],
 *     removeAllListeners: [AsyncFunction: removeAllListeners],
 *     addListener: [AsyncFunction: addListener],
 *     removeListener: [AsyncFunction: removeListener],
 *     destroyed: [Getter],
 *     paused: [Getter/Setter],
 *     pause: [Function: pause],
 *     resume: [Function: resume],
 *   },
 *   to: "0xb7B9ee26d6e4bbf6E555d68b7C1f11E4a8f6A6Ad",
 *   from: "0x41F615644C31Eb2F9F68b8b3FD92e8687d8f1dEE",
 *   contractAddress: null,
 *   hash: "0x8911a98089f7522354775b3dc2ed66ac9fc408644d34abdafbda7e0f91131823",
 *   index: 0,
 *   blockHash: "0x266e88a16377ba6757b2d9031df51a6aaa444d042291c49820e06cfdb765cb7f",
 *   blockNumber: 10182861,
 *   logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
 *   gasUsed: 21000n,
 *   blobGasUsed: 0n,
 *   cumulativeGasUsed: 21000n,
 *   gasPrice: 2n,
 *   blobGasPrice: null,
 *   type: 2,
 *   status: 1,
 *   root: undefined,
 *   logs: [Getter],
 *   toJSON: [Function: toJSON],
 *   length: [Getter],
 *   fee: [Getter],
 *   getBlock: [AsyncFunction: getBlock],
 *   getTransaction: [AsyncFunction: getTransaction],
 *   getResult: [AsyncFunction: getResult],
 *   confirmations: [AsyncFunction: confirmations],
 *   removedEvent: [Function: removedEvent],
 *   reorderedEvent: [Function: reorderedEvent],
 *   [Symbol(Symbol.iterator)]: [Function],
 * }
 * * Sender Balance After :- 7.999999999999916
 * * Receiver Balance After :- 2.0

mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/Ethersjs/Project (main)
$
 */