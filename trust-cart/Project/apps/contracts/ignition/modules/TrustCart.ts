import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const STORE_NAME = "TrustCart";

export default buildModule("TrustCartModule", (m) => {
  const TrustCart = m.contract("TrustCart",[STORE_NAME]);
  return { TrustCart };
});