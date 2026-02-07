import { expect } from "chai";
import hre from "hardhat";

const { ethers, networkHelpers } = await hre.network.connect();

const tokenConversion = (n:number)=>{
   return ethers.parseEther(n.toString());
}

const storeName = "TrustCart";
const itemName = "Laptop";
const itemCategory = "Electronics";
const itemImage = "https://jade-top-kite-609.mypinata.cloud/ipfs/bafybeibs5mbqmut65ef24hup7mlvbvynvfkn255ml7oj3kglibb5gj2kwm";
const itemPrice = tokenConversion(1);
const itemRatings = 4n;
const itemStock = 20n;


describe("TrustCart", function () {

    async function deployTrustCartFixture() {
      const [owner,buyer1,buyer2] = await ethers.getSigners();
      const contract = await ethers.deployContract("TrustCart",[storeName]);
      await contract.waitForDeployment();
    //   console.log("Deployed Contract:- \n",contract);
      return { contract, owner, buyer1, buyer2 };
    }

    async function addListTransactionFixture(){
        const {contract,owner,buyer1} = await networkHelpers.loadFixture(deployTrustCartFixture);
        const addListTransaction = await contract.connect(owner).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,itemStock);
        await addListTransaction.wait();
        const itemId = await contract.totalItems();
        
        return {addListTransaction,itemId,contract,owner,buyer1};
    }

    describe("Deploy",async ()=>{

        it("Should Set the Owner, store name and initialise total items to be 0", async ()=>{
            const {contract,owner} = await networkHelpers.loadFixture(deployTrustCartFixture);

            const contractOwner = await contract.owner();
            expect(contractOwner).to.equal(owner.address);

            const storeNameSetInContract = await contract.storeName();
            expect(storeNameSetInContract).to.equal(storeName);

            const contractTotalItems = await contract.totalItems();
            expect(contractTotalItems).to.equal(0);
        });

        it("Should Emit the Event when deployed",async ()=>{
            const {contract,owner} = await networkHelpers.loadFixture(deployTrustCartFixture);
            const contractDeploymentTransaction = contract.deploymentTransaction();

            expect(contractDeploymentTransaction).to.emit(contract,"constructorEvent").withArgs(owner.address,storeName,0);
        });

    });

    describe("ListItems",async ()=>{

        describe("Access Control",async ()=>{      

            it("Should Only be done by owner",async ()=>{
                const {contract,owner} = await networkHelpers.loadFixture(deployTrustCartFixture);
                const transaction = contract.connect(owner).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,itemStock);
                expect(transaction).to.not.be.revert       
            });
            
            it("Should not accept Items from non-owners",async ()=>{
                const {contract,buyer1} = await networkHelpers.loadFixture(deployTrustCartFixture);
                const transaction = contract.connect(buyer1).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,itemStock); // Don't await here, because once you await here, it'll get executed and infact the original smart contract will throw you error, (Better write above inside the expect or like how I have now) 
                await expect(transaction).to.be.revertedWith("Action is prohibitted, Only Owner is allowed");
            });

        });

        it("Should Rever if Price and stocks are 0",async ()=>{
            const { contract,owner } = await networkHelpers.loadFixture(deployTrustCartFixture);
            await expect(contract.connect(owner).listItem(itemName,itemCategory,itemImage,0n,itemRatings,itemStock)).to.be.revertedWith("Price Must Be Greater Than Zero");
            await expect(contract.connect(owner).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,0n)).to.be.revertedWith("Stocks Must Be Greater Than Zero");
        });

        it("Should Emit Event when transaction of Listing Item takes place",async ()=>{
            const { contract, owner } = await networkHelpers.loadFixture(deployTrustCartFixture);
            const beforeTotalItems = await contract.totalItems();
            await expect(contract.connect(owner).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,itemStock)).to.emit(contract,"ItemListed").withArgs(beforeTotalItems+1n,itemName,itemPrice,itemStock);
        });

        it("Should Increment total Items",async ()=>{
            const { contract, owner } = await networkHelpers.loadFixture(deployTrustCartFixture);
            const beforeTotalItems = await contract.totalItems();
            const transaction = await contract.connect(owner).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,itemStock);
            await transaction.wait();
            const afterTotalItems = await contract.totalItems();
            expect(afterTotalItems).to.equal(beforeTotalItems+1n);
        });

        it("Should add item properly to items mapping",async ()=>{
            const { contract, owner } = await networkHelpers.loadFixture(deployTrustCartFixture);
            const transaction = await contract.connect(owner).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,itemStock);
            await transaction.wait();
            const itemId = await contract.totalItems();
            const item = await contract.items(itemId);
            expect(item.id).to.equal(itemId);
            expect(item.name).to.equal(itemName);
            expect(item.category).to.equal(itemCategory);
            expect(item.image).to.equal(itemImage);
            expect(item.price).to.equal(itemPrice);
            expect(item.ratings).to.equal(itemRatings);
            expect(item.stock).to.equal(itemStock);
            expect(item.exists).to.equal(true);
        })

    });

    describe("AddStock",async ()=>{

        it("Should be added only by owner",async ()=>{
            const {itemId,contract,buyer1} = await networkHelpers.loadFixture(addListTransactionFixture);

            const addStockTransaction = contract.connect(buyer1).addStock(itemId,itemStock);

            await expect(addStockTransaction).to.be.revertedWith("Action is prohibitted, Only Owner is allowed");
        });

        it("Should be greater than zero",async ()=>{
            const {itemId,contract,owner} = await networkHelpers.loadFixture(addListTransactionFixture);

            const addStockTransaction = contract.connect(owner).addStock(itemId,0n);

            await expect(addStockTransaction).to.be.revertedWith("Stocks Must Be Greater Than Zero");

        });

        it("Should increment stock of particular item",async ()=>{
            
            const {itemId,contract,owner} = await networkHelpers.loadFixture(addListTransactionFixture);

            const oldStock = (await contract.items(itemId)).stock;

            const addStockTransaction = await contract.connect(owner).addStock(itemId,itemStock);

            await addStockTransaction.wait();

            const newStock = (await contract.items(itemId)).stock;
            
            expect(newStock).to.equal(oldStock+itemStock);

        });

        it("Should Emit Event After adding the stock",async ()=>{

            const {itemId,contract,owner} = await networkHelpers.loadFixture(addListTransactionFixture);

            const addStockTransaction = contract.connect(owner).addStock(itemId,itemStock);
            await expect(addStockTransaction).to.emit(contract,"StockAdded").withArgs(itemId,itemStock);

        })

    })

    describe("BuyItem",async ()=>{
      
        it("Should Exist the Item",async ()=>{  // Test for 'itemExists' modifier
            const {itemId,buyer1,contract} = await networkHelpers.loadFixture(addListTransactionFixture);
            const buyTransaction = contract.connect(buyer1).buyItem(itemId+10n);
            await expect(buyTransaction).to.be.revertedWith("Item Does Not exists");
        });

        it("Should be available in the Stock",async ()=>{
            // Q:- How is this done ?
            // Ans:- 1. First list the Item from owner exactly one Item in the stock
            //       2. Buy that from buyer (item stock would be reduced)
            //       3. While testing buy the same again, (No stock)

            const {contract,owner,buyer1} = await networkHelpers.loadFixture(deployTrustCartFixture);

            await contract.connect(owner).listItem(itemName,itemCategory,itemImage,itemPrice,itemRatings,1n);

            const itemId = await contract.totalItems();
            
            await networkHelpers.setBalance(buyer1.address,tokenConversion(3));

            await contract.connect(buyer1).buyItem(itemId,{value:tokenConversion(1)})

            await expect(contract.connect(buyer1).buyItem(itemId,{value:tokenConversion(1)})).to.be.revertedWith("Not Available, Out Of Stock");

             
        });

        it("Buyer Should Have Sufficientn ETHs",async ()=>{ // Test for 'require(msg.value>=item.price,"Insufficient ETHs");'
            const {itemId,buyer1,contract} = await networkHelpers.loadFixture(addListTransactionFixture);

            await networkHelpers.setBalance(buyer1.address,tokenConversion(0.5));

            const buyTransaction = contract.connect(buyer1).buyItem(itemId,{value:tokenConversion(0.5)});

            await expect(buyTransaction).to.be.revertedWith("Insufficient ETHs"); 
        });

        it("Should Reduce the stock of that item and Increase the Order Count by Creating the new Order",async ()=>{
            const {itemId,buyer1,contract} = await networkHelpers.loadFixture(addListTransactionFixture);

            const stocksPreviously = (await contract.items(itemId)).stock; // Imp Syntax 
            const buyerOrderCountPreviously = await contract.orderCount(buyer1.address);
            
            await networkHelpers.setBalance(buyer1.address,tokenConversion(2));

            const buyTransaction = await contract.connect(buyer1).buyItem(itemId,{value:itemPrice});
            await buyTransaction.wait();
            
            const stocksPresent = (await contract.items(itemId)).stock; 
            const buyerOrderCountPresent = await contract.orderCount(buyer1.address);

            const newOrder = await contract.orders(buyer1.address,buyerOrderCountPresent);


            expect(stocksPresent).to.equal(stocksPreviously-1n);

            expect(buyerOrderCountPresent).to.equal(buyerOrderCountPreviously+1n);

            expect(newOrder.orderId).to.equal(buyerOrderCountPresent);
            expect(newOrder.itemId).to.equal(itemId);
            expect(newOrder.pricePaid).to.equal(itemPrice);

        });

        it("Should Refund Excess Amount",async ()=>{
            const { contract ,owner, buyer1, itemId } = await networkHelpers.loadFixture(addListTransactionFixture);

            let userBalance = await ethers.provider.getBalance(buyer1.address);

            console.log("Balance Before funding ", ethers.formatEther(userBalance));
            
            await networkHelpers.setBalance(buyer1.address,tokenConversion(5));

            userBalance = await ethers.provider.getBalance(buyer1.address);

            const userBalanceBefore = userBalance;

            console.log("Balance After funding ", ethers.formatEther(userBalance));
            
            const EXTRA_PAY = tokenConversion(1);
            
            const buyTransaction = await contract.connect(buyer1).buyItem(itemId,{value:itemPrice+EXTRA_PAY});

            const buyExcessTransactionEvent = buyTransaction.getTransaction();
            
            const receipt = await buyTransaction.wait();

            if(!receipt){
                console.log("Transaction didn't mine Properly,");
                return;
            }

            const userOrderId = await contract.orderCount(buyer1.address);

            userBalance = await ethers.provider.getBalance(buyer1.address);
            
            console.log("Balance After Transaction ", ethers.formatEther(userBalance));


            const gasFeePaid =  receipt.gasUsed * receipt.gasPrice; // should use '.EffectiveGasPrice' instead of '.gasPrice', but it's showing null for that

            console.log("Total Gas Consuded", receipt.gasUsed);
            console.log("Gas Price ", receipt.gasPrice);
            console.log("Gas Fees Consumed Total", ethers.formatEther(gasFeePaid));

            expect(userBalance).to.equal(userBalanceBefore-itemPrice-gasFeePaid);
            expect(buyExcessTransactionEvent).to.emit(contract,"ExcessAmountRefund").withArgs(buyer1.address,userOrderId,itemId,EXTRA_PAY);
            // expect(buyTransaction).to.emit(contract,"ExcessAmountRefund").withArgs(buyer1.address,userOrderId,itemId,EXTRA_PAY);     
            /**
             * The above will also works, because 'deployment transaction' and 'normal transaction functions' are different
             */

        });

        it("Should Emit event after successfull transaction",async ()=>{
            const { contract, buyer1, itemId } = await networkHelpers.loadFixture(addListTransactionFixture);

            const prevOrderId = await contract.orderCount(buyer1.address);

            await networkHelpers.setBalance(buyer1.address,tokenConversion(2));
            const buyItemTransaction = contract.connect(buyer1).buyItem(itemId,{value:itemPrice});

            await expect(buyItemTransaction).to.emit(contract,"ItemPurchased").withArgs(buyer1.address,prevOrderId+1n,itemId,itemPrice);

        });
        

    })

    describe("WithDrawOwner",async ()=>{

        it("Should only be called by Owner",async ()=>{
            const {contract,buyer1} = await networkHelpers.loadFixture(deployTrustCartFixture);
            expect(contract.connect(buyer1).withdraw()).to.be.revertedWith("Action is prohibitted, Only Owner is allowed");
        });

        it("Should have enough balance in the Network to Refund to Owner",async ()=>{
            const { contract,owner, buyer1, itemId } = await networkHelpers.loadFixture(addListTransactionFixture);

            const buyTransaction = await contract.connect(buyer1).buyItem(itemId,{value:tokenConversion(1)});
            await buyTransaction.wait();

            const contractAddress = await contract.getAddress();
            const networkBalance = await ethers.provider.getBalance(contractAddress);

            console.log("Network Balance is ",ethers.formatEther(networkBalance));
            expect(networkBalance).to.be.greaterThan(0n);
        });
        
        it("Should Revert if No ETHs in Network",async ()=>{
            const { contract,owner } = await networkHelpers.loadFixture(deployTrustCartFixture);
            const withDrawTransaction = contract.connect(owner).withdraw();
            expect(withDrawTransaction).to.be.revertedWith("No ETHs To Withdraw");
        });
        
        it("Should successfully Transfer the balance in the network to Owner and Emit the Event",async ()=>{
            const { contract,owner, buyer1, itemId } = await networkHelpers.loadFixture(addListTransactionFixture);
            
            const buyTransaction = await contract.connect(buyer1).buyItem(itemId,{value:tokenConversion(1)});
            await buyTransaction.wait();
            
            const contractAddress = await contract.getAddress();
            const networkBalance = await ethers.provider.getBalance(contractAddress);
            
            console.log("Network Balance is ",ethers.formatEther(networkBalance));

            const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);

            console.log("Owner Balance Before ",ethers.formatEther(ownerBalanceBefore));
            
            const withDrawTransaction = await contract.connect(owner).withdraw();

            const receipt = await withDrawTransaction.wait();

            if(!receipt){
                console.log("Reciept Didn't came ", receipt);
                throw new Error("Failed");
            }

            const gasFee = receipt.gasUsed * receipt.gasPrice;

            console.log("Gas Fee Consumed ", ethers.formatEther(gasFee));

            const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);


            console.log("Owner Balance After ",ethers.formatEther(ownerBalanceAfter));
            
            expect(ownerBalanceAfter).to.be.equal(ownerBalanceBefore+networkBalance-gasFee);

            expect(withDrawTransaction).to.emit(contract,"Withdrawal").withArgs(owner.address,networkBalance);


        });

        it("Should Fail If transaction to Owner failed",async ()=>{
            // TODO: I don't think It's required, 
            // TODO: It's bit advanced I feel
        });

    });

});