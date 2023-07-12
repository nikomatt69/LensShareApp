import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import {
  INFURA_ID,
  INFURA_RPC,
  CHAIN_ID,
  IS_MAINNET,
  LENSTOK_URL,
  NEXT_PUBLIC_STUDIO_API_KEY,
  WALLETCONNECT_PROJECT_ID
} from 'src/constants';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider
} from '@livepeer/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { apolloClient } from '@/apollo-client';
import Video from './HomePage/Video';
import { Analytics } from '@vercel/analytics/react';

import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import getRpc from '@/lib/getRpc';
import UserSigNoncesProvider from './UserSigNoncesProvider';
import LeafwatchProvider from './LeafwatchProvider';

const queryClient = new QueryClient();

const { chains, publicClient } = configureChains(
  [IS_MAINNET ? polygon : polygonMumbai, mainnet],
  [jsonRpcProvider({ rpc: (chain) => ({ http: getRpc(chain.id) }) })]
);

const connectors: any = [
  new InjectedConnector({ chains, options: { shimDisconnect: false } }),
  new WalletConnectConnector({
    options: { projectId: WALLETCONNECT_PROJECT_ID },
    chains
  })
];

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY!,
    baseUrl: LENSTOK_URL
  })
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider options={{ initialChainId: 137 }} debugMode>
        <ApolloProvider client={apolloClient}>
          <UserSigNoncesProvider />
          <QueryClientProvider client={queryClient}>
            <LivepeerConfig client={livepeerClient}>
              <ThemeProvider defaultTheme="light" attribute="class">
                {children}
              </ThemeProvider>
              <Analytics />
              {/* <Video /> */}
            </LivepeerConfig>
          </QueryClientProvider>
        </ApolloProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
