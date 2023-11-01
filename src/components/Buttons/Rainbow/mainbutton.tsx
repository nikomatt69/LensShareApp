import { Web3Button, useWeb3Modal } from '@web3modal/react';
import {
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme
} from '@web3modal/wagmi/react';

export const MainButton = () => {
  const { open } = useWeb3Modal();
  const modal = useWeb3Modal();
  const state = useWeb3ModalState();
  const { themeMode, themeVariables, setThemeMode } = useWeb3ModalTheme();
  const events = useWeb3ModalEvents();

  return <w3m-button balance="hide" size="sm" loadingLabel="Connecting" />;
};
export default MainButton;
