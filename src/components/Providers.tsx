import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import {
  INFURA_ID,
  INFURA_RPC,
  CHAIN_ID,
  IS_MAINNET,
  LENSTOK_URL,
  NEXT_PUBLIC_STUDIO_API_KEY,
} from "src/constants";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";


import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { apolloClient } from "@/apollo-client";
import Video from "./HomePage/Video";
import { Analytics } from '@vercel/analytics/react';
import { WagmiConfig, createClient , } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

const chains = [mainnet, polygon, optimism, arbitrum];

const wagmiClient = createClient(
  getDefaultClient({
    appName: 'LensShare',
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: `${NEXT_PUBLIC_STUDIO_API_KEY}`,
    baseUrl: LENSTOK_URL,
  }),
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig client={wagmiClient}>
       <ConnectKitProvider debugMode>
      <ApolloProvider client={apolloClient}>
        <LivepeerConfig client={livepeerClient}>
          <ThemeProvider defaultTheme="light" attribute="class">
            {children}
          </ThemeProvider>
          <Analytics />
          {/* <Video /> */}
        </LivepeerConfig>
      </ApolloProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default Providers;