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
import getCurrentSessionProfileId from '@/lib/getCurrentSessionProfileId';
import { useProfileQuery } from '@/utils/lens';
import { useEffectOnce, useIsMounted, useUpdateEffect } from 'usehooks-ts';
import { hydrateAuthTokens, signOut } from '@/store/persist';
import { useDisconnectXmtp } from '@/utils/hooks/useXmtpClient';
import { useUserProfilesWithGuardianInformationQuery } from '@/utils/lens/generated5';
import { getIsAuthTokensAvailable } from '@/utils/lib/getIsAuthTokensAvailable';
import resetAuthData from '@/utils/hooks/resetAuthData';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { resolvedTheme } = useTheme();
  const { setProfiles, currentProfile, setCurrentProfile } = useAppStore();
  const { pathname } = useRouter();
  const { profileId, setProfileId } = useAppPersistStore();


  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const disconnectXmtp = useDisconnectXmtp();

  const resetAuthState = () => {
    setProfileId(null);
    setCurrentProfile(null);
   
    
  };

  // Fetch current profiles and sig nonce owned by the wallet address
  const { loading } = useUserProfilesWithGuardianInformationQuery({
    variables: {
      profileGuardianInformationRequest: { profileId },
      profilesRequest: { ownedBy: [address] }
    },
    skip: !profileId,
    onCompleted: (data) => {
      const profiles = data?.profiles?.items
        ?.slice()
        ?.sort((a, b) => Number(a.id) - Number(b.id))
        ?.sort((a, b) =>
          a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
        );

      if (!profiles.length) {
        return resetAuthState();
      }

      const selectedUser = profiles.find((profile) => profile.id === profileId);
      setProfiles(profiles as Profile[]);
      setCurrentProfile(selectedUser as Profile);
      setProfileId(selectedUser?.id);
     
    },
    onError: () => setProfileId(null)
  });

  const validateAuthentication = () => {
    const currentProfileAddress = currentProfile?.ownedBy;
    const isSwitchedAccount =
      currentProfileAddress !== undefined && currentProfileAddress !== address;
    const shouldLogout = !getIsAuthTokensAvailable() || isSwitchedAccount;

    // If there are no auth data, clear and logout
    if (shouldLogout && profileId) {
      disconnectXmtp();
      resetAuthState();
      resetAuthData();
      disconnect?.();
    }
  };

  useUpdateEffect(() => {
    validateAuthentication();
  }, [address, chain, disconnect, profileId]);

  if (loading || !isMounted()) {
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
