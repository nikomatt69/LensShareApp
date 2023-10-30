
import {
  base,
  baseGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  zora,
  zoraTestnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { FC, ReactNode } from 'react';
import { WALLETCONNECT_PROJECT_ID } from '@/constants';

// 1. Get projectId
const projectId = WALLETCONNECT_PROJECT_ID

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [polygon,
    base,
    baseGoerli,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    zora,
   baseGoerli,
   goerli,
   mainnet,
   optimism,
   optimismGoerli,
   polygonMumbai,
   zora,
   zoraTestnet
  ],
  [walletConnectProvider({ projectId }), publicProvider()]
)

const metadata = {
  name: 'LensShare',
  description: 'Web3Modal LensShare',
  url: 'https://lenshareapp.xyz',
  icons: ['https://lenshareapp.xyz/images/icon.png']
}

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: true, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } })
  ],
  publicClient
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })
function MainButton() {
  const { open } = useWeb3Modal()

  return <button onClick={() => open()}>Connect</button>
}


interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Provider: FC<Web3ProviderProps> = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export default Web3Provider;
