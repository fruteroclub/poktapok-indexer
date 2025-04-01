import { createConfig } from "ponder";
import { http } from "viem";
import { pulpaTokenABI } from "./abis/PulpaTokenABI";

export default createConfig({
  networks: {
    optimism: {
      chainId: 10,
      transport: http(process.env.PONDER_RPC_URL_10),
    },
  },
  contracts: {
    PulpaToken: {
      network: "optimism",
      abi: pulpaTokenABI,
      address: process.env.PULPA_OPTIMISM_ADDRESS as `0x${string}`,
      startBlock: 115537645,
    },
  },
});
