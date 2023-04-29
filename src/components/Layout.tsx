import { useAppStore, useAppPersistStore } from "@/store/app";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Profile, ProfilesDocument } from "@/types/lens";
import { useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { CHAIN_ID } from "@/constants";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
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
    },
  });

  const { loading } = useQuery(ProfilesDocument, {
    variables: {
      request: {
        ownedBy: [address],
      },
    },
    skip: !profileId,
    onCompleted: (data) => {
      const profiles = data?.profiles?.items as Profile[];
      if (!profiles.length) return resetAuthState();
    },
    onError: () => {
      setProfileId(null);
    },
  });

  const resetAuthState = () => {
    setCurrentProfile(null);
    setProfileId(null);
  };

  const validateAuthentication = () => {
    const logout = () => {
      setCurrentProfile(null);
      setProfileId(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      disconnect?.();
    };
    const ownerAddress = currentProfile?.ownedBy;
    const isAuthTokenAvailable =
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken");
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

  useEffect(() => {
    validateAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected, address, chain, disconnect, profileId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) return <div><img src="./images/splash.png" alt="" /></div>;
  return (
    <div>
      {" "}
      <Toaster position="bottom-right" />
      {children}
    </div>
  );
};

export default Layout;
