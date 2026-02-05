"server only"

import { PinataSDK } from "pinata"

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.IPFS_PINATA_JWT_SECRET_ACCESS_TOKEN}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
})