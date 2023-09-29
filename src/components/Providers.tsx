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

import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import getRpc from '@/lib/getRpc';

import LeafwatchProvider from './LeafwatchProvider';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum';
import { W3mQrCode, Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import UserSigNoncesProvider from './UserSigNoncesProvider';

import FeaturedChannelsProvider from './FeaturedChannelsProvider';

const chains = [polygon, mainnet];
const projectId = WALLETCONNECT_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY || '',
    baseUrl: LENSTOK_URL
  })
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
});
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
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
      <Web3Modal
        themeVariables={{
          '--w3m-font-family': 'Roboto, sans-serif',
          '--w3m-accent-color': '#000fff',
          '--w3m-background-color': '#FFFF',
          '--w3m-logo-image-url': 'https://lenshareapp.xyz/images/icon.png',
          '--w3m-container-border-radius': '25px',
          '--w3m-background-border-radius': '25px'
        }}
        themeMode="dark"
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
  );
};

export default Providers;
