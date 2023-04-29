import * as Apollo from '@apollo/client';

import { useEffect, useState } from "react";
import { useAppPersistStore, useAppStore, useReferenceModuleStore } from "@/store/app";
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { Profile, Publication, ReferenceModules, UserProfilesDocument, UserProfilesQuery, UserProfilesQueryVariables } from "@/types/lens";
import { usePublicationQuery, useUserProfilesQuery } from '@/types/graph';
import { CHAIN_ID } from "@/constants";
import Loading from "../Loading";
import ProfileCard from '../ProfilePage/ProfileCard';
import Profiles from '../ProfilePage/Profiles';
import VideoDetail from './VideoDetail';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

const ProfileRender = () => {
    const [mounted, setMounted] = useState(false);
    const currentProfile = useAppStore((state) => state.currentProfile)
    const router = useRouter()
    const { id } = router.query
    const [following, setFollowing] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log(mounted)

  const setProfiles = useAppStore((state) => state.setProfiles);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const profileId = useAppPersistStore((state) => state.profileId);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);
  const setSelectedReferenceModule = useReferenceModuleStore((state) => state.setSelectedReferenceModule);
  
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const resetAuthState = () => {
    setProfileId(null)
    setCurrentProfile(null)
  }

  function useUserProfilesQuery(
    baseOptions?: Apollo.QueryHookOptions<UserProfilesQuery, UserProfilesQueryVariables>
  ) {
    const options = { ...baseOptions };
    return Apollo.useQuery<UserProfilesQuery, UserProfilesQueryVariables>(UserProfilesDocument, options);
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

  const { loading } = useUserProfilesQuery({
    variables: { ownedBy: address },
    skip: !profileId,
    onCompleted: (data) => {
      const profiles = data?.profiles?.items
      ?.slice()
      ?.sort((a, b) => Number(a.id) - Number(b.id))
      ?.sort((a, b) => (a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1));

    if (!profiles.length) {
      return resetAuthState()
    }

    const selectedUser = profiles.find((profile) => profile.id === profileId)
    const totalFollowing = selectedUser?.stats?.totalFollowing || 0;
    setSelectedReferenceModule(
      totalFollowing > 20
      ? ReferenceModules.DegreesOfSeparationReferenceModule
      : ReferenceModules.FollowerOnlyReferenceModule
    )
    setProfiles(profiles as Profile[])
    setCurrentProfile(selectedUser as Profile)
    setProfileId(selectedUser?.id)
    setUserSigNonce(data?.userSigNonces?.lensHubOnChainSigNonce)
    }
  })

  const validateAuthentication = () => {
    const currentProfileAddress = currentProfile?.ownedBy;
    const isSwitchedAccount = currentProfileAddress !== undefined && currentProfileAddress !== address
    const isWrongNetworkChain = chain?.id !== CHAIN_ID
    const shouldLogout =
    !getIsAuthTokensAvailable() || isWrongNetworkChain || isDisconnected || isSwitchedAccount;

    if (shouldLogout && profileId) {
      resetAuthState();
      resetAuthData();
      disconnect?.();
    }
  }

  const { data, error } = usePublicationQuery({
    variables: { 
      request: {
        publicationId: id
      }
     },
  });
  const profile = data?.publication?.profile
  console.log("Profile", profile);

  const publication = data?.publication
  console.log("Publication", publication)


  useEffect(() => {
    validateAuthentication()
  }, [isDisconnected, address, chain, disconnect, profileId])

  if (loading || !mounted) {
    return <Loading />
  }

  return (
    <div>
      <VideoDetail publication={publication as Publication} profile={profile as Profile} 
      setFollowing={setFollowing} following={following}/>
    </div>
  )
}

export default ProfileRender