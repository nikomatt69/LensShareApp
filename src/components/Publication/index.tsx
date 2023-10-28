import { NextPage } from 'next';
import * as Apollo from '@apollo/client';
import { useAppPersistStore, useAppStore } from '@/store/app';
import { useRouter } from 'next/router';
import { Profile, usePublicationQuery } from '@/utils/lens/generatedLenster';
import Custom404 from '@/pages/404';
import { GridItemEight, GridItemFour, GridLayout } from '../UI/GridLayout';
import MetaTags from '../UI/MetaTags';
import formatHandle from '@/utils/functions/formatHandle';
import { APP_NAME, CHAIN_ID } from '@/constants';
import { Card } from '../UI/Card';
import FullPublication from './FullPublication';
import NewPublication from '../Composer/NewPublication';
import Feed from '../Comment/Feed';
import NoneRelevantFeed from '../Comment/NoneRelevantFeed';
import UserProfile from '../ProfilePage/UserProfile';
import RelevantPeople from './RelevantPeople';
import OnchainMeta from './OnchainMeta';
import Footer from '../Sidebar/Footer';
import BottomNav from '../Navs/BottomNav';
import Navbar from '../Navbar';
import Loading from '../Loading';
import Loader from '../UI/Loader';
import { useGlobalModalStateStore } from '@/store/modals';
import { useEffect } from 'react';
import { ReferenceModules, UserProfilesDocument, UserProfilesQuery, UserProfilesQueryVariables } from '@/utils/lens/generated5';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useReferenceModuleStore } from '@/store/reference-module';
import { useNonceStore } from '@/store/nonce';

const ViewPublication: NextPage = (profile) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const showComposerModal = useGlobalModalStateStore(
    (state) => state.showComposerModal
  );
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

  const getIsAuthTokensAvailable = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return accessToken !== 'undefined' && refreshToken !== 'undefined';
  };

  const resetAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  
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

 

  const {
    query: { id }
  } = useRouter();

  const { data, loading, error } = usePublicationQuery({
    variables: {
      request: { publicationId: id },
      reactionRequest: currentProfile
        ? { profileId: currentProfile?.id }
        : null,
      profileId: currentProfile?.id ?? null
    },
    skip: !id
  });

  if (error) {
    return <Custom404 />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  if (!data.publication) {
    return <Custom404 />;
  }



  const { publication } = data as any;
  const canComment = publication?.canComment?.result;

  return (
    <div>
      <GridLayout>
        <MetaTags
          title={
            publication.__typename && publication?.profile?.handle
              ? `${publication.__typename} by @${formatHandle(
                  publication.profile.handle
                )} • ${APP_NAME}`
              : APP_NAME
          }
        />

        <GridItemEight className="space-y-5 ">
          <Card className="rounded-xl border-blue-700">
            <FullPublication
              profile={profile as Profile}
              key={publication?.id}
              publication={publication}
              showCount={true}
            />
          </Card>
          {currentProfile && !publication?.hidden && !showComposerModal ? (
            <NewPublication publication={publication} />
          ) : null}

          <Feed publication={publication} />
          <NoneRelevantFeed publication={publication} />
        </GridItemEight>
        <GridItemFour className="space-y-5">
          <RelevantPeople publication={publication} />
          <OnchainMeta publication={publication} />
          <Footer />
        </GridItemFour>
      </GridLayout>

      <BottomNav />
    </div>
  );
};

export default ViewPublication;
