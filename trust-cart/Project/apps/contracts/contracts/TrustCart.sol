// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract TrustCart{
    string public storeName;
    address public owner;
    uint256 public totalItems;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 price;
        uint256 ratings;
        uint256 stock;
        bool exists;
    }

    struct Order{
        uint256 orderId;
        uint256 itemId; 
        uint256 timeStamp;
        uint256 pricePaid;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event constructorEvent(address indexed owner,string name,uint256 totalItems);
    event ItemListed(uint256 indexed itemId,string name, uint256 price, uint256 stock);
    event StockAdded(uint256 indexed itemId,uint256 stockAmount);
    event ItemPurchased(address indexed buyer,uint256 indexed orderId, uint256 indexed itemId, uint256 pricePaid);
    event ExcessAmountRefund(address indexed buyer, uint indexed orderId, uint256 indexed itemId,uint256 amountRefunded);
    event Withdrawal(address indexed owner,uint256 amount);


    modifier onlyOwner(){
      require(msg.sender==owner,"Action is prohibitted, Only Owner is allowed");
      _;
    }

    modifier itemExists(uint256 itemId){
      require(items[itemId].exists,"Item Does Not exists");
      _;
    }


    constructor(string memory _storeName){
        storeName = _storeName;
        owner = msg.sender;
        totalItems=0;

        emit constructorEvent(msg.sender, _storeName, 0);
    }

    function listItem(string calldata _name,string calldata _category,string calldata _image,uint256 _price,uint256 _ratings,uint256 _stock) external onlyOwner {

      require(_price>0,"Price Must Be Greater Than Zero");
      require(_stock>0,"Stocks Must Be Greater Than Zero");   

      totalItems++;

      items[totalItems] = Item({
        id:totalItems,
        name:_name,
        category:_category,
        image:_image,
        price:_price,
        ratings:_ratings,
        stock:_stock,
        exists:true
      });

      emit ItemListed(totalItems, _name, _price, _stock);

    }

    /**
     * Testing for the above includes
     * 1. onlyOwner
     * 2. Price>0, stock>0
     * 3. Emit event
     * 4. totalItem Increment (How should it be, like considering it as first item ? like I should check after calling the function totalItems will become 1, Should I test in this way or how because many test cases will come right ? like totalITem can be anything literally)
     * 5. Sent Item details added to 'items' mapping
     * 6. Is anything else needed for testing ?
     */


    function addStock(uint256 _itemId,uint256 _stock) external onlyOwner itemExists(_itemId) {
        require(_stock>0,"Stocks Must Be Greater Than Zero");   
        items[_itemId].stock +=_stock;
        emit StockAdded(_itemId,_stock);
    }

    function buyItem(uint256 _itemId) external payable itemExists(_itemId) {
        Item storage item = items[_itemId];

        require(item.stock>0,"Not Available, Out Of Stock");
        require(msg.value>=item.price,"Insufficient ETHs");

        items[_itemId].stock--; // Since we have used storage above, so we can directly use item.stock--;
        
        orderCount[msg.sender]++;
        uint256 currentOrderId = orderCount[msg.sender];

        orders[msg.sender][currentOrderId] = Order({
            orderId:currentOrderId,
            itemId:_itemId,
            pricePaid:items[_itemId].price,
            timeStamp:block.timestamp
        }); 

        uint256 excess = msg.value - items[_itemId].price;  

        if(excess>0){
            (bool success,)= payable(msg.sender).call{value:excess}("");
            require(success,"Excess Amount Refund Failed");
            emit ExcessAmountRefund(msg.sender, currentOrderId, _itemId, excess);
        }

        emit ItemPurchased(msg.sender, currentOrderId, _itemId, items[_itemId].price);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance>0,"No ETHs To Withdraw");

       (bool success,) = owner.call{value:balance}("");
       require(success,"Payment to Owner Failed");
       
       emit Withdrawal(owner, balance);
    }


    function getItem(uint256 _itemId) external view itemExists(_itemId) returns (Item memory){
        return items[_itemId];
    }

    function getOrder(address buyer, uint256 _orderId) external view returns (Order memory){
        return orders[buyer][_orderId];
    }

    receive() external payable {}
    fallback() external payable {}

}

/**
 * How Gas Fees Are Actually Handled (buyItem example)
 *
 * Important:
 * - Solidity NEVER calculates gas
 * - Contracts NEVER subtract gas from refunds
 * - Gas is handled entirely by the EVM / protocol
 *
 * Execution flow:
 * User Wallet ──▶ EVM ──▶ Smart Contract
 *
 * 1. User creates a transaction with:
 *    - msg.value = X
 *    - gasLimit, gasPrice
 *
 * 2. EVM checks (no ETH moved yet):
 *    user.balance >= X + (gasLimit * gasPrice)
 *
 * 3. If check passes, execution starts:
 *    - X ETH is transferred to the contract
 *    - Gas meter starts tracking execution cost
 *
 * 4. Solidity code runs:
 *    - State updates
 *    - Refunds excess ETH (msg.value - price)
 *
 * 5. After execution completes:
 *    - EVM calculates actualGasUsed * gasPrice
 *    - Gas cost is deducted from USER WALLET
 *
 * Key invariants:
 * - User net loss = item price + gas
 * - Contract net gain = item price
 * - Refund logic NEVER considers gas
 */
