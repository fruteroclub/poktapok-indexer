import { createConfig } from "ponder";
import { http } from "viem";
import { pulpaTokenABI } from "./abis/PulpaTokenABI";
import { xocolatlTokenABI } from "./abis/XocolatlTokenABI";

export default createConfig({
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL,
    poolConfig: {
      max: 100,
      ssl: true,
    },
  },
  networks: {
    base: {
      chainId: 8453,
      transport: http(process.env.PONDER_RPC_URL_8453),
    },
    optimism: {
      chainId: 10,
      transport: http(process.env.PONDER_RPC_URL_10),
    },
    polygon: {
      chainId: 137,
      transport: http(process.env.PONDER_RPC_URL_137),
    },
  },
  contracts: {
    PulpaToken: {
      network: "optimism",
      abi: pulpaTokenABI,
      address: process.env.PULPA_OPTIMISM_ADDRESS as `0x${string}`,
      startBlock: 115537645,
    },
    XocToken: {
      abi: xocolatlTokenABI,
      network: {
        base: {
          address: process.env.XOC_BASE_ADDRESS as `0x${string}`,
          startBlock: 2338635,
        },
        polygon: {
          address: process.env.XOC_POLYGON_ADDRESS as `0x${string}`,
          startBlock: 32141175,
        },
      },
    },
  },
});
