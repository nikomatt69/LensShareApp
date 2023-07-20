import { LensHub } from '@/abi/LensHub';
import { LENS_HUB_ABI } from '@/abi/abi';
import { ErrorMessage } from '@/components/ErrorMessage';
import UserProfile from '@/components/ProfilePage/UserProfile';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { Spinner } from '@/components/UI/Spinner';
import { APP_NAME, LENSHUB_PROXY } from '@/constants';
import { Errors } from '@/lib/errors';
import getSignature from '@/lib/getSignature';
import formatHandle from '@/utils/functions/formatHandle';
import {
  CreateSetDefaultProfileRequest,
  Profile,
  useBroadcastMutation,
  useCreateSetDefaultProfileTypedDataMutation
} from '@/utils/lens/generatedLenster';
import { PencilIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsExclamation } from 'react-icons/bs';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';

import { useEffectOnce } from 'usehooks-ts';
import { useContractWrite, useSignTypedData } from 'wagmi';

const SetProfile: FC = () => {
  const profiles = useAppStore((state) => state.profiles);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onCompleted = (__typename?: 'RelayError' | 'RelayerResult') => {
    if (__typename === 'RelayError') {
      return;
    }

    setIsLoading(false);
    toast.success(`Default profile updated successfully!`);
  };

  const onError = (error: any) => {
    setIsLoading(false);
    error;
  };

  const { signTypedDataAsync } = useSignTypedData({ onError });
  const { error, write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: 'setDefaultProfile',
    onSuccess: () => {
      onCompleted();
      setUserSigNonce(userSigNonce + 1);
    },
    onError: (error) => {
      onError(error);
      setUserSigNonce(userSigNonce - 1);
    }
  });

  const hasDefaultProfile = Boolean(profiles.find((o) => o.isDefault));
  const sortedProfiles: Profile[] = profiles?.sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
  );

  useEffectOnce(() => {
    setSelectedUser(sortedProfiles[0]?.id);
  });

  const [broadcast] = useBroadcastMutation({
    onCompleted: ({ broadcast }) => onCompleted(broadcast.__typename)
  });
  const [createSetDefaultProfileTypedData] =
    useCreateSetDefaultProfileTypedDataMutation({
      onCompleted: async ({ createSetDefaultProfileTypedData }) => {
        const { id, typedData } = createSetDefaultProfileTypedData;
        const signature = await signTypedDataAsync(getSignature(typedData));
        const { data } = await broadcast({
          variables: { request: { id, signature } }
        });
        if (data?.broadcast.__typename === 'RelayError') {
          const { profileId } = typedData.value;
          return write?.({ args: [profileId] });
        }
      },
      onError
    });

  const setDefaultProfile = async () => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    try {
      setIsLoading(true);
      const request: CreateSetDefaultProfileRequest = {
        profileId: selectedUser
      };
      return await createSetDefaultProfileTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request
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
    <Card className="space-y-5 p-5">
      {error && <ErrorMessage title={`Transaction failed!`} error={error} />}
      {hasDefaultProfile ? (
        <>
          <div className="text-lg font-bold">Your default profile</div>
          <UserProfile profile={sortedProfiles[0]} />
        </>
      ) : (
        <div className="flex items-center space-x-1.5 font-bold text-yellow-500">
          <BsExclamation className="h-5 w-5" />
          <div>You don't have any default profile set!</div>
        </div>
      )}
      <div className="text-lg font-bold">Select default profile</div>
      <p>
        Selecting your default account helps to display the selected profile
        across {APP_NAME}, you can change your default profile anytime.
      </p>
      <div className="text-lg font-bold">What else you should know</div>
      <div className="lt-text-gray-500 divide-y text-sm dark:divide-gray-700">
        <p className="pb-3">
          Only the default profile will be visible across the {APP_NAME},
          example notifications, follow etc.
        </p>
        <p className="py-3">You can change default profile anytime here.</p>
      </div>
      <div>
        <div className="label">Select profile</div>
        <select
          className="focus:border-brand-500 focus:ring-brand-400 w-full rounded-xl border border-gray-300 bg-white outline-none dark:border-gray-700 "
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {sortedProfiles?.map((profile: Profile) => (
            <option key={profile?.id} value={profile?.id}>
              @{formatHandle(profile?.handle)}
            </option>
          ))}
        </select>
      </div>
      <Button
        className="ml-auto"
        type="submit"
        disabled={isLoading}
        onClick={setDefaultProfile}
        icon={
          isLoading ? <Spinner size="xs" /> : <PencilIcon className="h-4 w-4" />
        }
      >
        Save
      </Button>
    </Card>
  );
};

export default SetProfile;
