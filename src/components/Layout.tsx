import { useAppStore, useAppPersistStore } from '@/store/app';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  Profile,
  ProfilesDocument,
  Publication
} from '@/utils/lens/generatedLenster';
import { useQuery } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import { CHAIN_ID } from '@/constants';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import MetaTags from './UI/MetaTags';

import { STATIC_ASSETS_URL } from '@/constants';
import imageKit from '@/lib/imageKit';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import BottomNav from './Navs/BottomNav';
import Loading from './Loading';
import { getToastOptions } from '@/utils/functions/getToastOptions';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import GlobalModals from './GlobalModals';
import GlobalAlerts from './Publication/Actions/Menu/GlobalAlerts';
import Wrapper from './Echos/Wrapper';
import Spaces from './Spaces';
import SpacesWindow from './Spaces/SpacesWindow/SpacesWindow';
import { useSpacesStore } from '@/store/spaces';
import PreviewSpaces from './Spaces/PreviewSpaces/PreviewSpaces';
import Loader from './UI/Loader';
import { useNonceStore } from '@/store/nonce';
import AudioSpaces from './Spaces';
import PullToRefreshExample from './HomePage/Refresh';
import { useRoom } from '@huddle01/react/hooks';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { resolvedTheme } = useTheme();
  const setUserSigNonce = useNonceStore((state) => state.setUserSigNonce);
  const setProfiles = useAppStore((state) => state.setCurrentProfile);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const profileId = useAppPersistStore((state) => state.profileId);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);
  const { address, isDisconnected } = useAccount();

  const { chain } = useNetwork();
  const [mounted, setMounted] = useState(false);
  const { disconnect } = useDisconnect({
    onError(error) {
      toast.error(error?.message);
    }
  });

  const showSpacesLobby = useSpacesStore((state) => state.showSpacesLobby);
  const showSpacesWindow = useSpacesStore((state) => state.showSpacesWindow);

  const { loading } = useQuery(ProfilesDocument, {
    variables: {
      request: {
        ownedBy: [address]
      }
    },
    skip: !profileId,
    onCompleted: (data) => {
      const profiles = data?.profiles?.items as Profile[];
      if (!profiles.length) return resetAuthState();
    },
    onError: () => {
      setProfileId(null);
    }
  });
  const { joinRoom, isRoomJoined } = useRoom();

  const resetAuthState = () => {
    setCurrentProfile(null);
    setProfileId(null);
  };

  const validateAuthentication = () => {
    const logout = () => {
      setCurrentProfile(null);
      setProfileId(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      disconnect?.();
    };
    const ownerAddress = currentProfile?.ownedBy;
    const isAuthTokenAvailable =
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken');
    const isWrongNetworkChain = chain?.id !== CHAIN_ID;
    const isSwitchedAccount =
      ownerAddress !== undefined && ownerAddress !== address;
    const shouldLogout =
      !isAuthTokenAvailable ||
      isWrongNetworkChain ||
      isDisconnected ||
      isSwitchedAccount;

    if (shouldLogout && profileId) {
      logout();
    }
  };
  const { pathname } = useRouter();

  useEffect(() => {
    validateAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected, address, chain, disconnect, profileId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={resolvedTheme === 'dark' ? '#1b1b1d' : '#ffffff'}
        />
      </Head>
      <Toaster
        position="bottom-right"
        toastOptions={getToastOptions(resolvedTheme)}
      />
    
  

      <GlobalModals />
      <GlobalAlerts />
      <div className="flex min-h-screen flex-col pb-14 md:pb-0">
        {pathname.includes(`/bytes` && `/feed`) ? (
          <>{children}</>
        ) : (
          <>
          
            <Navbar />
            <BottomNav />
            {children}
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
