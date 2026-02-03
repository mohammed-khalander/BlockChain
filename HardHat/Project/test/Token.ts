
// Refer:- https://chatgpt.com/c/697f2c50-8bfc-8323-99dd-c893a15943de

import {expect} from "chai";

import hre from "hardhat";

const { ethers, networkHelpers } = await hre.network.connect();

describe("Token",function(){
    const TOTAL_SUPPLY = 1000n;
    
    // Fixture

    async function deployTokenFixture(){
        const [ owner, user1, user2 ] = await ethers.getSigners();
        const token = await ethers.deployContract("Token",[TOTAL_SUPPLY]);
        return { token, owner, user1, user2 };
    }

    // Constructor

    it("should set total supply and assign it to the owner",async function(){
        const { token, owner } = await networkHelpers.loadFixture(deployTokenFixture);
        expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY);
        expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it("should emit Transfer event on deployment (minting) ",async function(){
        /**  Minting is the process of creating new tokens and increasing the total supply */
        /**  Burning is the process of destroying the tokens and decreasing the total supply */
        // const { owner } = await networkHelpers.loadFixture(deployTokenFixture);

        // const deployTransaction = await ethers.deployContract("Token",[TOTAL_SUPPLY]); // We are deploying again, and not using 'token' because, 'token' is already executed, and the event has already passed (past event)
        // And we should not await this, we should give this to '.emit', becuause, if we await here, it'll cause deployment at that point itself and again the event would be gone, so await below. 

        const [owner] = await ethers.getSigners();

        const token = await ethers.deployContract("Token", [TOTAL_SUPPLY]);
        const deploymentTx = token.deploymentTransaction();

        await expect(deploymentTx).to.emit(token, "Transfer").withArgs(ethers.ZeroAddress, owner.address, TOTAL_SUPPLY);

        /**
         * * Read 12th and 13th Chat of 'https://chatgpt.com/c/697e4d08-7f24-8321-b4ba-75aa16bec1ea',
         * * Everything will shine after this. 
         * * Before that Read 13th and 14th chat of 'https://chatgpt.com/c/697f2c50-8bfc-8323-99dd-c893a15943de'
         * * It contains what does 'Transaction' even mean by and how deployment works, later this will shine again, (And this will help understnading what does 'mining'(Putting smart contract on to blockchian) actually mean)
         * * Refer the Readme for above chats, and Refere 'Extra Gyan' (Transaction, Mining/Validators) as well'
         * * 100s or 1000s of different transcation make a single 'Block' in Blokchain
         */
    });


    // Transfers

    it("should transfer the tokens between the account",async function(){
        const { token, owner, user1 } = await networkHelpers.loadFixture(deployTokenFixture);
        await token.transfer(user1.address,100n);
        expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY-100n);
        expect(await token.balanceOf(user1.address)).to.equal(100n);
    });

    it("should emit Transfer event on successfull transfer",async function(){
        const {token,owner,user1} = await networkHelpers.loadFixture(deployTokenFixture);
        await expect(token.transfer(user1.address,50n)).to.emit(token,"Transfer").withArgs(owner.address,user1.address,50n);
    });

    // Failures
    
    it("should revert if sender has insufficient balance",async function(){
        const { token, user1, user2 } = await networkHelpers.loadFixture(deployTokenFixture);
        await expect(token.connect(user1).transfer(user2.address,10n)).to.be.revertedWith("Insufficient Balance"); //Here 'token.connect(user1)' is like changing the address in remix IDE from owner to some different account and testing right ?, 
        // And here it fails as intitially users will have 0 balance apart from owner right ?
    });

    it("should revert if recepient is zero address",async function(){
        const {token,} = await networkHelpers.loadFixture(deployTokenFixture);
        await expect(token.transfer(ethers.ZeroAddress,10n)).to.be.revertedWith("Invalid Recepient");
    });

})

/**
 * * Observations:- When to use 'await' and when not to (Only for expect)
 * 
 * * Testing Concept:- use await when using call matcher as 'to emit' and 'to revertedWith' or any other, but not for 'to equal'
 * * Ex:- See above 'to.be.revertedWith' and 'to.emit.withArgs'
 * 
 * * Solidity Concept:- use await if function is returning something, otherwise don't 
 * * Ex:- 1. 'balanceOf' function in solidity returns balance (So await) 
 * *      2. 'transfer' function in solidity doesn't return anything, it's just computing some things (So don't await) 
 * *      3. 'totalSupply', You might wonder why await for this variable (Because It internally has 'getter' function which actually returns value,) (So await)
 * 
 * 
 * * Other Scenarios from GPT
 * 
 * 
 * * ❗ NEVER await inside expect(...) when:
 * *         Testing events
 * *         Testing reverts
 * *         Let matchers handle it.
 * 
 * 
 * * 🧪 Compare With This Case (VALUE ASSERTION)
 * *   expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY);

 * *    Why await is REQUIRED here
 * *    token.totalSupply() → Promise<bigint>
 * *    .to.equal(...) expects a VALUE
 * *    Chai does not auto-await values
 * *    So YOU must do:
 * *    await token.totalSupply()
 * 
 * 
 * 
 * 
 * * 🔑 Use await when:
 * *  You want a value
 * *  You are calling balanceOf, totalSupply
 * *  You are finishing an assertion (await expect(...))

 * * 🚫 Do NOT use await when:
 * * Passing a tx into expect(...)
 * * Testing events
 * * Testing reverts



 * *    --------------------------------------------------------------------------------
 * *    | Call type                  | Example                    | Await who?         |
 * *    | -------------------------- | -------------------------- | ------------------ |
 * *    | Read-only (`view`, `pure`) | `balanceOf`, `totalSupply` | **YOU await**      |
 * *    | State-changing tx          | `transfer`, constructor    | **MATCHER awaits** |
 * *    | Assertion                  | `expect(...).to.emit(...)` | **YOU await**      |
 * *    --------------------------------------------------------------------------------
 * 
 */


/**
 * *   Timeline visualization
 * 
 * *   1. ethers.deployContract()
 * *            ↓
 * *   2. Ethereum transaction sent
 * *            ↓
 * *   3. Constructor runs
 * *            ↓
 * *   4. Transfer(address(0), owner, supply) emitted
 * *            ↓
 * *   5. Transaction mined
 * *            ↓
 * *   6. Contract instance returned

 */



/**
 * 
 * * ## 9️⃣ Why fixtures CANNOT be used for constructor-event tests
 * * 
 * * This is another subtle but important contrast.
 * * 
 * * ```ts
 * * await networkHelpers.loadFixture(deployTokenFixture);
 * * ```
 * * 
 * * Fixtures:
 * * 
 * * * Deploy once
 * * * Snapshot chain
 * * * Revert back for reuse
 * * 
 * * But:
 * * 
 * * * Events are **not replayed**
 * * * Constructor already happened in the past
 * * 
 * * So you can:
 * * 
 * * * Test state ✅
 * * * Test balances ✅
 * * * Test transfers ✅
 * * * ❌ NOT test constructor events
 * * 
 * * That’s why you **correctly avoided fixtures** in the minting test.


 */