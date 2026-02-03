
# First-principle: what is a *token* actually?

Forget Solidity. Forget code.
Think **ledger**.

### In real-world terms

A **token** is nothing more than:

> “A record that says **who owns how much of something**”

That’s it.

Banks do this with databases.
Blockchains do this with **smart contracts**.

---

## Real-world analogy (important)

Imagine a **company share register**:

| Person | Shares |
| ------ | ------ |
| Alice  | 100    |
| Bob    | 50     |

Now ask:

* Who owns shares? → addresses
* How many? → balances
* Can ownership change? → transfer
* Who maintains the register? → smart contract

A **token contract is just an on-chain share register**.

---

# 2️⃣ Token ≠ Coin (important distinction)

| Coin                 | Token                      |
| -------------------- | -------------------------- |
| Native to blockchain | Built using smart contract |
| ETH, BTC             | USDT, UNI, LINK            |
| Blockchain-level     | Application-level          |

Your `Token.sol` is **NOT a coin**.
It’s an **application-level asset**.

---

# 3️⃣ Why tokens exist on blockchain

Tokens represent **value or rights**:

* 💰 Money (stablecoins)
* 🗳 Governance power
* 🎮 In-game items
* 🎟 Tickets
* 🪪 Identity / access

So when the tutor says *“we are creating a token”*, what they mean is:

> “We are creating a **digital ownership system** enforced by Ethereum”

---

# 4️⃣ What kind of token is this?

⚠️ **Very important**

This is **NOT ERC-20**.

It is a **custom minimal token**, created only to teach:

* balances
* transfer logic
* testing
* Hardhat workflow

Why tutors do this:

* ERC-20 hides logic behind libraries
* You don’t *see* what’s happening
* Bad for learning

So this contract is intentionally **simple and explicit**.

</br>
</br>
</br>
</br>


### address(0) is the zero address in Ethereum: "0x0000000000000000000000000000000000000000" 
### (It represents 'nobody', 'no one', 'nothing')

| Usage                | Meaning                  |
| -------------------- | ------------------------ |
| `from == address(0)` | Tokens are **minted**    |
| `to == address(0)`   | Tokens are **burned**    |
| `_to != address(0)`  | Prevent accidental burns |                


</br>
</br>
</br>
</br>
</br>
</br>


```solidity
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
```

## After the Contract run 

```bash
bunx hardhat build
```


* This will create `artifacts`, `cache` and `types`