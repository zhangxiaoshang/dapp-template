import { configureChains, createClient } from "wagmi";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { chains } from "@/configs/chains";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

export function createWagmiClient() {
  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
  });

  return wagmiClient;
}

export const ethereumClient = new EthereumClient(createWagmiClient(), chains);
