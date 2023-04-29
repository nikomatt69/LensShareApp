import { FC, useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  AuthenticateDocument,
  GetChallengeDocument,
  ProfilesDocument,
} from "@/types/lens";
import { CHAIN_ID } from "src/constants";
import { useAppPersistStore, useAppStore } from "src/store/app";
import {
  useAccount,
  useNetwork,
  useConnect,
  useSignMessage,
  useSwitchNetwork,
} from "wagmi";
import type { Connector } from "wagmi";
import toast from "react-hot-toast";

const LoginWalletMobile: FC = () => {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);
  const [mounted, setMounted] = useState(false);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [hasConnected, setHasConnected] = useState(false);
  const { address, connector: activeConnector } = useAccount();
  const { connectors, error, connectAsync } = useConnect();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage();
  const [loadChallenge, { error: errorChallenge, loading: challengeLoading }] =
    useLazyQuery(GetChallengeDocument, {
      fetchPolicy: "no-cache",
    });
  const [authenticate, { error: errorAuthenticate, loading: authLoading }] =
    useMutation(AuthenticateDocument);
  const [getUserProfiles, { error: errorProfiles, loading: profilesLoading }] =
    useLazyQuery(ProfilesDocument);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onConnect = async (connector: Connector) => {
    try {
      const account = await connectAsync({ connector });
      if (account) {
        setHasConnected(true);
        console.log("Account", account);
      }
    } catch {}
  };

  const handleLogin = async () => {
    try {
      // Get challenge
      const challenge = await loadChallenge({
        variables: {
          request: { address },
        },
      });

      if (!challenge?.data?.challenge?.text) {
        return toast.error("ERROR_MESSAGE");
      }

      // Get signature
      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text,
      });

      // Auth user and set cookies
      const auth = await authenticate({
        variables: { request: { address, signature } },
      });
      localStorage.setItem("accessToken", auth.data?.authenticate.accessToken);
      localStorage.setItem(
        "refreshToken",
        auth.data?.authenticate.refreshToken
      );

      // Get authed profiles
      const { data: profilesData } = await getUserProfiles({
        variables: { request: { ownedBy: [address] } },
      });

      if (profilesData?.profiles?.items?.length === 0) {
        return toast.error("You have no lens profile yet, please create one");
      } else {
        const profiles: any = profilesData?.profiles?.items;
        const currentProfile = profiles[0];
        setProfiles(profiles);
        setCurrentProfile(currentProfile);
        setProfileId(currentProfile.id);
      }
    } catch {}
  };

  return activeConnector?.id ? (
    <div>
      {chain?.id === CHAIN_ID ? (
        <button className="flex-1 text-white" onClick={() => handleLogin()}>
          {mounted ? "Log In" : ""}
        </button>
      ) : (
        <button
          className="flex-1"
          onClick={() => {
            if (switchNetwork) {
              switchNetwork(CHAIN_ID);
            } else {
              toast.error("Please change your network!");
            }
          }}
        >
          Switch Network
        </button>
      )}
    </div>
  ) : (
        <button 
      onClick= {() => {
        {toast.error("Log in to view profile", {duration: 1000});}
       }}
      className="text-white hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
    </button>
  );
};

export default LoginWalletMobile;
