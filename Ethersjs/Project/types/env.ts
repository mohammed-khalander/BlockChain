import z from "zod";

const envSchema = z.object({
    TENDERLY_RPC_URL:z.string(),
    ALCHEMY_RPC_URL:z.string(),
    ETH_ADDRESS:z.string()
})

export const env = envSchema.parse(process.env);