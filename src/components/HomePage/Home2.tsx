
import type { NextPage } from 'next';
import Spaces from '@/components/Spaces2';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Explore from '@/components/HomePage/Explore';
import BottomNav from '../Navs/BottomNav';
import { Image } from '../UI/Image';
import * as Apollo from '@apollo/client';

import { Children, useEffect, useState } from 'react';
import {
  useAppPersistStore,
  useAppStore,
  useReferenceModuleStore
} from '@/store/app';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import {
  Profile,
  Publication,
  ReferenceModules,
  UserProfilesDocument,
  UserProfilesQuery,
  UserProfilesQueryVariables
} from '@/utils/lens/generatedLenster';
import { APP_NAME, CHAIN_ID, STATIC_ASSETS_URL } from '@/constants';
import Loading from '../Loading';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import MetaTags from '../UI/MetaTags';
import Bytes from '../Bytes';
import DiscoverMob from '../DiscoverPage/DiscoverMob';
import BytesSection from '../Home/BytesSection';
import NewPost from '../Composer/Post/New';
import Timeline from '../Timeline';
import { GridItemEight, GridItemFour, GridLayout } from '../UI/GridLayout';
import SuggestedAccounts from '../Sidebar/SuggestedAccounts';
import Footer from '../Sidebar/Footer';
import { useSpacesStore } from '@/store/spaces';
import SpacesWindow from '../Spaces2/SpacesWindow/SpacesWindow';
import EchosPage from '@/pages/musicfeed';
import Echos from '../Echos/EchosPage';
import Audio from '../Echos/Audio';
import LoginButton from '../Login/LoginButton';
import Meet from '../Meet';
import { useTheme } from 'next-themes';

const Home2: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log(mounted);

  const setProfiles = useAppStore((state) => state.setProfiles);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const profileId = useAppPersistStore((state) => state.profileId);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);
  const setSelectedReferenceModule = useReferenceModuleStore(
    (state) => state.setSelectedReferenceModule
  );

  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const resetAuthState = () => {
    setProfileId(null);
    setCurrentProfile(null);
  };

  function useUserProfilesQuery(
    baseOptions?: Apollo.QueryHookOptions<
      UserProfilesQuery,
      UserProfilesQueryVariables
    >
  ) {
    const options = { ...baseOptions };
    return Apollo.useQuery<UserProfilesQuery, UserProfilesQueryVariables>(
      UserProfilesDocument,
      options
    );
  }

  const showSpacesWindow = useSpacesStore((state) => state.showSpacesWindow);

  const getIsAuthTokensAvailable = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return accessToken !== 'undefined' && refreshToken !== 'undefined';
  };

  const resetAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const { loading } = useUserProfilesQuery({
    variables: { ownedBy: address },
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
      const totalFollowing = selectedUser?.stats?.totalFollowing || 0;
      setSelectedReferenceModule(
        totalFollowing > 20
          ? ReferenceModules.DegreesOfSeparationReferenceModule
          : ReferenceModules.FollowerOnlyReferenceModule
      );
      setProfiles(profiles as Profile[]);
      setCurrentProfile(selectedUser as Profile);
      setProfileId(selectedUser?.id);
      setUserSigNonce(data?.userSigNonces?.lensHubOnChainSigNonce);
    }
  });

  const validateAuthentication = () => {
    const currentProfileAddress = currentProfile?.ownedBy;
    const isSwitchedAccount =
      currentProfileAddress !== undefined && currentProfileAddress !== address;
    const isWrongNetworkChain = chain?.id !== CHAIN_ID;
    const shouldLogout =
      !getIsAuthTokensAvailable() ||
      isWrongNetworkChain ||
      isDisconnected ||
      isSwitchedAccount;

    if (shouldLogout && profileId) {
      resetAuthState();
      resetAuthData();
      disconnect?.();
    }
  };

  useEffect(() => {
    validateAuthentication();
  }, [isDisconnected, address, chain, disconnect, profileId]);

  const { resolvedTheme } = useTheme();

  return (
    

  <div>
    <GridLayout className="max-w-[1200px] pt-6"> 
    <MetaTags title={`Home • ${APP_NAME}`} /> 
    <GridItemEight>
      {resolvedTheme === 'dark' ? (
    <Image
            className="cursor-pointer"
            src={`${STATIC_ASSETS_URL}/images/Lenstoknewlogo3.png`}
            alt="logo"
           
          />) : (<Image
            className="cursor-pointer"
            src={`${STATIC_ASSETS_URL}/images/Lenstoknewlogo.png`}
            alt="logo"
           
          />)}
          
      
    
   <BytesSection />
   
   </GridItemEight>
  

    
  

 {showSpacesWindow && <SpacesWindow />}
    <GridItemEight className="space-y-5">
    {currentProfile?.id ? 
            
            <><NewPost /><Timeline /></>
            :<Explore/>
          }
    </GridItemEight>
    
  </GridLayout>
  </div>
  );
};

export default Home2;
