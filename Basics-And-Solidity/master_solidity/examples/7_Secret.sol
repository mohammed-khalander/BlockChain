// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Showcase contract inheritance

contract Ownable {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "must be owner");
        _;
    }
}

contract SecretVault {
    string secret;

    constructor(string memory _secret) {
        secret = _secret;
    }

    function getSecret() public view returns (string memory) {
        return secret;
    }
}

contract Secret is Ownable {
    address secretVault;

    constructor(string memory _secret) {
        SecretVault _secretVault = new SecretVault(_secret);        // This is like creating new CONTRACT dynamically, (Factories)
        secretVault = address(_secretVault);
        super;
    }

    function getSecret() public view onlyOwner returns (string memory) {
        return SecretVault(secretVault).getSecret();  // Interaction
    }
}

/**
 There is one more way for this called 'Dependency Injection', written in '01-Solidity.md' (Search SecretVault there in the Interacting with other smart contract section)
 */



/**

License 

// I can't write license here as it's written above

pragma solidity ^0.8.0;

contract MyContract {
    address owner;
    string secret;

    modifier onlyOwner() {
        require(msg.sender == owner, "must be owner");
        _;
    }

    constructor(string memory _secret) {
        secret = _secret;
        owner = msg.sender;
    }

    function getSecret() public view onlyOwner returns (string memory) {
        return secret;
    }
}

 */