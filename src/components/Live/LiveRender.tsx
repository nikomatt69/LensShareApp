import { useEffect, useState } from "react";
import { useAppPersistStore, useAppStore, useReferenceModuleStore } from "@/store/app";
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { Profile, ReferenceModules } from "@/utils/lens";
import { CHAIN_ID } from "@/constants";
import Loading from "../Loading";
import { useUserProfilesQuery } from '@/types/graph';
import Live from "./Live";
import LiveContent from "./LiveContent";


const LiveRender = () => {
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log(mounted)

  const setProfiles = useAppStore((state) => state.setProfiles);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
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

  useEffect(() => {
    validateAuthentication()
  }, [isDisconnected, address, chain, disconnect, profileId])

  if (loading || !mounted) {
    return <Loading />
  }

  return (
    <div>
      <LiveContent/>
    </div>
  )
}

export default LiveRender