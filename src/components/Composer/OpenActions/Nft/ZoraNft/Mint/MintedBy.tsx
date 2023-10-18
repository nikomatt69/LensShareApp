import SmallWalletProfile from '@/components/Composer/SmallWalletProfile';
import SmallUserProfile from '@/components/SmallUserProfile';
import Loader from '@/components/UI/Loader';
import { useDefaultProfileQuery } from '@/utils/lens/generated5';
import { Profile } from '@/utils/lens/generatedLenster';
import { type FC } from 'react';
import type { Address } from 'viem';

interface MintedByProps {
  address: Address;
}

const MintedBy: FC<MintedByProps> = ({ address }) => {
  const { data, loading } = useDefaultProfileQuery({
    variables: { request: { ethereumAddress: address } },
    skip: !Boolean(address)
  });

  if (!address) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center gap-x-2">
      <span>by</span>
      {loading ? (
        <Loader />
      ) : data?.defaultProfile ? (
        <SmallUserProfile
          profile={data.defaultProfile as Profile}
          smallAvatar
        />
      ) : (
        <SmallWalletProfile wallet={{ address }} smallAvatar />
      )}
    </div>
  );
};

export default MintedBy;
