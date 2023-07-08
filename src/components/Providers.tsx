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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { apolloClient } from "@/apollo-client";
import Video from "./HomePage/Video";
import { Analytics } from '@vercel/analytics/react';
import { WagmiConfig, createConfig,} from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { ConnectKitProvider,  getDefaultConfig } from 'connectkit';


 
const chains = [polygon,];




const queryClient = new QueryClient();




const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'LensShare',
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID!,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY!,
    baseUrl: LENSTOK_URL,
  }),
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
       <ConnectKitProvider options={{initialChainId:137}}  debugMode>
      <ApolloProvider client={apolloClient}>
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