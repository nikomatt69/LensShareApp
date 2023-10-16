
import { KeyIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import { CHAIN_ID } from 'src/constants';
import { useAppPersistStore, useAppStore } from 'src/store/app';
import { useGlobalModalStateStore } from 'src/store/modals';
import { useIsMounted } from 'usehooks-ts';
import type { Connector } from 'wagmi';
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSignMessage
} from 'wagmi';
import errorToast from './Composer/errorToast';
import { useAuthenticateMutation, useChallengeLazyQuery, useUserProfilesLazyQuery } from '@/utils/lens/generated5';
import { Errors } from '@/lib/errors';
import { Localstorage } from '@/storage';
import { Spinner } from './UI/Spinner';
import { Button } from './UI/Button';
import SwitchNetwork from './Composer/OpenActions/Nft/ZoraNft/Mint/SwitchNetwork';
import cn from './UI/cn';
import getWalletDetails from '@/utils/hooks/getWalletDetails';

interface WalletSelectorProps {
  setHasConnected?: Dispatch<SetStateAction<boolean>>;
  setHasProfile?: Dispatch<SetStateAction<boolean>>;
}

const WalletSelector: FC<WalletSelectorProps> = ({
  setHasConnected,
  setHasProfile
}) => {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);
  const setShowAuthModal = useGlobalModalStateStore(
    (state) => state.setShowAuthModal
  );
  const [isLoading, setIsLoading] = useState(false);

  const onError = (error: any) => {
    setIsLoading(false);
    errorToast(error);
  };

  const isMounted = useIsMounted();
  const chain = useChainId();
  const {
    connectors,
    error,
    connectAsync,
    isLoading: isConnectLoading,
    pendingConnector
  } = useConnect({ chainId: CHAIN_ID });

  const { disconnect } = useDisconnect();
  const { address, connector: activeConnector } = useAccount();
  const { signMessageAsync } = useSignMessage({ onError });
  const [loadChallenge, { error: errorChallenge }] = useChallengeLazyQuery({
    fetchPolicy: 'no-cache'
  });
  const [authenticate, { error: errorAuthenticate }] =
    useAuthenticateMutation();
  const [getProfiles, { error: errorProfiles }] = useUserProfilesLazyQuery();

  const onConnect = async (connector: Connector) => {
    try {
      const account = await connectAsync({ connector });
      if (account) {
        setHasConnected?.(true);
      }
     
    } catch {}
  };

  const handleSign = async () => {
    let keepModal = false;
    try {
      setIsLoading(true);
      // Get challenge
      const challenge = await loadChallenge({
        variables: { request: { address } }
      });

      if (!challenge?.data?.challenge?.text) {
        return toast.error(Errors.SomethingWentWrong);
      }

      // Get signature
      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text
      });

      // Auth user and set cookies
      const auth = await authenticate({
        variables: { request: { address, signature } }
      });
      const accessToken = auth.data?.authenticate.accessToken;
      const refreshToken = auth.data?.authenticate.refreshToken;

      localStorage.setItem(Localstorage.AccessToken, accessToken);
      localStorage.setItem(Localstorage.RefreshToken, refreshToken);

      // Get authed profiles
      const { data: profilesData } = await getProfiles({
        variables: { request: { ownedBy: [address] } }
      });

      if (profilesData?.profiles?.items?.length === 0) {
        setHasProfile?.(false);
        keepModal = true;
      } else {
        const profiles: any = profilesData?.profiles?.items
          ?.slice()
          ?.sort((a, b) => Number(a.id) - Number(b.id))
          ?.sort((a, b) =>
            a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
          );
        const currentProfile = profiles[0];
        setProfiles(profiles);
        setCurrentProfile(currentProfile);
        setProfileId(currentProfile.id);
      }
    
    } catch {
    } finally {
      setIsLoading(false);
      if (!keepModal) {
        setShowAuthModal(false);
      }
    }
  };

  return activeConnector?.id ? (
    <div className="space-y-3">
      <div className="space-y-2.5">
        {chain === CHAIN_ID ? (
          <Button
            disabled={isLoading}
            icon={
              isLoading ? (
                <Spinner className="mr-0.5" size="xs" />
              ) : (
                <img className="mr-0.5 h-3" src="/lens.svg" alt="Lens Logo" />
              )
            }
            onClick={handleSign}
          >
           Sign-In with Lens
          </Button>
        ) : (
          <SwitchNetwork toChainId={CHAIN_ID} />
        )}
        <button
          onClick={() => {
            disconnect?.();
            
          }}
          className="flex items-center space-x-1 text-sm underline"
        >
          <KeyIcon className="h-4 w-4" />
          <div>
            Change wallet
          </div>
        </button>
      </div>
      {errorChallenge || errorAuthenticate || errorProfiles ? (
        <div className="flex items-center space-x-1 font-bold text-red-500">
          <XCircleIcon className="h-5 w-5" />
          <div>{Errors.SomethingWentWrong}</div>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="inline-block w-full space-y-3 overflow-hidden text-left align-middle">
      {connectors
        .filter((connector) => {
          return isMobile ? connector.id !== 'injected' : true;
        })
        .map((connector) => {
          return (
            <button
              type="button"
              key={connector.id}
              className={cn(
                {
                  'hover:bg-gray-100 dark:hover:bg-gray-700':
                    connector.id !== activeConnector?.id
                },
                'flex w-full items-center justify-between space-x-2.5 overflow-hidden rounded-xl border px-4 py-3 outline-none dark:border-gray-700'
              )}
              onClick={() => onConnect(connector)}
              disabled={
                isMounted()
                  ? !connector.ready || connector.id === activeConnector?.id
                  : false
              }
            >
              <span>
                {isMounted()
                  ? connector.id === 'injected'
                    ? `Browser Wallet`
                    : getWalletDetails(connector.name).name
                  : getWalletDetails(connector.name).name}
                {isMounted() ? !connector.ready && ' (unsupported)' : ''}
              </span>
              <div className="flex items-center space-x-4">
                {isConnectLoading && pendingConnector?.id === connector.id ? (
                  <Spinner className="mr-0.5" size="xs" />
                ) : null}
                <img
                  src={getWalletDetails(connector.name).logo}
                  draggable={false}
                  className="h-6 w-6"
                  height={24}
                  width={24}
                  alt={connector.id}
                />
              </div>
            </button>
          );
        })}
      {error?.message ? (
        <div className="flex items-center space-x-1 text-red-500">
          <XCircleIcon className="h-5 w-5" />
          <div>{error?.message ?? `Failed to connect`}</div>
        </div>
      ) : null}
    </div>
  );
};

export default WalletSelector;