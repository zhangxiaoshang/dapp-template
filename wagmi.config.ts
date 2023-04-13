import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { mainnet } from "wagmi/chains";
import hashNFTV2 from "./abis/hash-nft-v2.json";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
    {
      name: "hashNFTV2",
      abi: hashNFTV2 as any,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: [
        // {
        //   name: "EnsRegistry",
        //   address: {
        //     [mainnet.id]: "0x314159265dd8dbb310642f98f50c066173c1259b",
        //   },
        // },
      ],
    }),

    react(),
  ],
});
