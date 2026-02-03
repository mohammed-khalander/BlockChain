// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Showcase payment transfers, enums, modifiers & events


/**
  * Ether Payments
  * Modifiers
  * Visibility
  * Events
  * Enums
 */
contract HotelRoom {
    enum Statuses {
        Vacant,
        Occupied
    }
    Statuses public currentStatus;

    event Occupy(address _occupant, uint256 _value);
    // event Occupy(address indexed _occupant, uint256 _value, bytes data);

    address payable public owner;   // 'Payable' allows this address to receive Ethereum CryptoCurrency

    constructor() {
        owner = payable(msg.sender);
        currentStatus = Statuses.Vacant;
    }

    modifier onlyWhileVacant() {
        require(currentStatus == Statuses.Vacant, "Currently occupied.");
        _;
    }

    modifier costs(uint256 _amount) {
        require(msg.value >= _amount, "Not enough Ether provided.");
        _;
    }

    function book() public payable onlyWhileVacant costs(2 ether) {
        /**
          * Here '2 ether' literally converts to actual correct amount.
         */

        currentStatus = Statuses.Occupied;

        // owner.transfer(msg.value)

        (bool sent, bytes memory data) = owner.call{value: msg.value}("");
        require(sent, "Payment Failed");


        emit Occupy(msg.sender, msg.value);
        // emit Occupy(msg.sender, msg.value, data);
    }

    modifier onlyOwner(){
        require(msg.sender==owner,"Only Owners are permitted to perform");
        _;
    }

    function checkout() public onlyOwner {
        currentStatus = Statuses.Vacant;
    }


}


// Refer Basics/07-msg_keyword.md, 
// Explanation for 'transfer' keyword is there