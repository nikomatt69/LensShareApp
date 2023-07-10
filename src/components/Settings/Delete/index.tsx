
import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Custom404 from 'src/pages/404';
import { useAppPersistStore, useAppStore } from 'src/store/app';
import { useNonceStore } from 'src/store/nonce';
import { useEffectOnce } from 'usehooks-ts';
import { useContractWrite, useDisconnect } from 'wagmi';

import SettingsSidebar from '../Sidebar';
import { useDisconnectXmtp } from '@/utils/hooks/useXmtpClient';
import resetAuthData from '@/utils/hooks/resetAuthData';
import { APP_NAME, LENSHUB_PROXY } from '@/constants';
import { LENS_HUB_ABI } from '@/abi/abi';
import { useCreateBurnProfileTypedDataMutation } from '@/utils/lens/generatedLenster';
import { Errors } from '@/lib/errors';
import MetaTags from '@/components/UI/MetaTags';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/UI/GridLayout';
import UserProfile from '@/components/ProfilePage/UserProfile';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Spinner } from '@/components/UI/Spinner';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/UI/Modal';
import { BsExclamation } from 'react-icons/bs';
import { WarningMessage } from '@/components/UI/WarningMessage';

const DeleteSettings: FC = () => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const userSigNonce = useNonceStore((state) => state.userSigNonce);
  const setUserSigNonce = useNonceStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);
  const [isLoading, setIsLoading] = useState(false);
  const disconnectXmtp = useDisconnectXmtp();
  const { disconnect } = useDisconnect();

  

  const onCompleted = () => {
    setCurrentProfile(null);
    setProfileId(null);
    disconnectXmtp();
    resetAuthData();
    disconnect?.();
    location.href = '/';
  };

  const onError = (error: any) => {
    setIsLoading(false);
    (error);
  };

  const { write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LENS_HUB_ABI,
    functionName: 'burn',
    onSuccess: () => {
      onCompleted();
      setUserSigNonce(userSigNonce + 1);
    },
    onError: (error) => {
      onError(error);
      setUserSigNonce(userSigNonce - 1);
    }
  });

  const [createBurnProfileTypedData] = useCreateBurnProfileTypedDataMutation({
    onCompleted: async ({ createBurnProfileTypedData }) => {
      const { typedData } = createBurnProfileTypedData;
      const { tokenId } = typedData.value;
      write?.({ args: [tokenId] });
    },
    onError
  });

  const handleDelete = async () => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    try {
      setIsLoading(true);
      return await createBurnProfileTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request: { profileId: currentProfile?.id }
        }
      });
    } catch (error) {
      onError(error);
    }
  };

  if (!currentProfile) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Delete Profile • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="space-y-5 p-5">
          <UserProfile profile={currentProfile} />
          <div className="text-lg font-bold text-red-500">
            This will delete your Lens profile
          </div>
          <p>
            
              This will permanently delete your Profile NFT on the Lens
              Protocol. You will not be able to use any apps built on Lens,
              including Lenster. All your data will be wiped out immediately and
              you won't be able to get it back.
            
          </p>
          <div className="text-lg font-bold">What else you should know</div>
          <div className="lt-text-gray-500 divide-y text-sm dark:divide-gray-700">
            <p className="pb-3">
              
                You cannot restore your Lens profile if it was accidentally or
                wrongfully deleted.
              
            </p>
            <p className="py-3">
              
                Some account information may still be available in search
                engines, such as Google or Bing.
              
            </p>
            <p className="py-3">
              
                Your @handle will be released immediately after deleting the
                account.
              
            </p>
          </div>
          <Button
            variant="danger"
            icon={
              isLoading ? (
                <Spinner variant="danger" size="xs" />
              ) : (
                <TrashIcon className="h-5 w-5" />
              )
            }
            disabled={isLoading}
            onClick={() => setShowWarningModal(true)}
          >
            {isLoading ? `Deleting...` : `Delete your account`}
          </Button>
          <Modal
            title={`Danger Zone`}
            icon={<BsExclamation className="h-5 w-5 text-red-500" />}
            show={showWarningModal}
            onClose={() => setShowWarningModal(false)}
          >
            <div className="space-y-3 p-5">
              <WarningMessage
                title="Are you sure?"
                message={
                  <div className="leading-6">
                    
                      Confirm that you have read all consequences and want to
                      delete your account anyway
                    
                  </div>
                }
              />
              <Button
                variant="danger"
                icon={<TrashIcon className="h-5 w-5" />}
                onClick={async () => {
                  setShowWarningModal(false);
                  await handleDelete();
                }}
              >
                Yes, delete my account
              </Button>
            </div>
          </Modal>
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default DeleteSettings;
