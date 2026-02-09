# [HardHat Docs](https://hardhat.org/docs/guides/smart-contract-verification)
# [My-EtherScan Dash](https://etherscan.io/myaccount)

```bash
mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain (main)
$ cd trust-cart/Project/apps/contracts/

mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/trust-cart/Project/apps/contracts (main)
$ bunx hardhat keystore set ETHERSCAN_API_KEY
[hardhat-keystore] Enter the password: ********************
[hardhat-keystore] Enter secret to store in the production keystore: **********************************
Key "ETHERSCAN_API_KEY" set in the production keystore

mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/trust-cart/Project/apps/contracts (main)
$ bunx hardhat keystore get ETHERSCAN_API_KEY
[hardhat-keystore] Enter the password: ********************
M6HNKGP5Y7RKDKC6ZKJZWDEK4NRBSI7J5K

mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/trust-cart/Project/apps/contracts (main)
$ bunx hardhat verify --network sepolia --constructor-args-path constructor-args.ts 0x6CB6F4A80F0Ad4d315584DB7240980C8c84977
fD

=== Etherscan ===
[hardhat-keystore] Enter the password: ********************

📤 Submitted source code for verification on Etherscan:

  contracts/TrustCart.sol:TrustCart
  Address: 0x6CB6F4A80F0Ad4d315584DB7240980C8c84977fD

⏳ Waiting for verification result...


✅ Contract verified successfully on Etherscan!

  contracts/TrustCart.sol:TrustCart
  Explorer: https://sepolia.etherscan.io/address/0x6CB6F4A80F0Ad4d315584DB7240980C8c84977fD#code

=== Blockscout ===

📤 Submitted source code for verification on Blockscout:

  contracts/TrustCart.sol:TrustCart
  Address: 0x6CB6F4A80F0Ad4d315584DB7240980C8c84977fD

⏳ Waiting for verification result...


✅ Contract verified successfully on Blockscout!

  contracts/TrustCart.sol:TrustCart
  Explorer: https://eth-sepolia.blockscout.com/address/0x6CB6F4A80F0Ad4d315584DB7240980C8c84977fD#code

=== Sourcify ===

The contract at 0x6CB6F4A80F0Ad4d315584DB7240980C8c84977fD has already been verified on Sourcify.

If you need to verify a partially verified contract, please use the --force flag.

Explorer: https://sourcify.dev/server/repo-ui/11155111/0x6CB6F4A80F0Ad4d315584DB7240980C8c84977fD

mohammed khalander@LAPTOP-KA2LP4KT MINGW64 ~/Downloads/BlockChain/trust-cart/Project/apps/contracts (main)
$
```