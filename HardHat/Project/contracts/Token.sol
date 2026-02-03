// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Token{
    string public constant name = "Hardhat Toekn";
    string public constant symbol = "HHT";
    
    uint256 public immutable totalSupply;
    address public immutable owner;
    
    mapping(address=>uint256) private balances;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor(uint256 _totalSupply){        
        require(_totalSupply>0, "Total Supply Should be Greater Than Zero");
        
        totalSupply = _totalSupply;
        owner = msg.sender;
        balances[msg.sender] = _totalSupply;

        emit Transfer(address(0),msg.sender,_totalSupply);    
    }

    function transfer(address _to, uint256 _amount) external{

        console.log("**Smart Contract Log** :- Sender has %s tokens ", balances[msg.sender]);

        require(_to!=address(0),"Invalid Recepient");   
        require(balances[msg.sender]>_amount,"Insufficient Balance");

        balances[msg.sender]-=_amount;
        balances[_to]+=_amount;

        emit Transfer(msg.sender, _to, _amount);
    }

    function balanceOf(address _account) external view returns (uint256){
        return balances[_account];
    }


}

