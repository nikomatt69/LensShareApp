import Link from 'next/link';
import type { FC } from 'react';
import { POLYGONSCAN_URL } from '@/constants';
import imageKit from '@/lib/imageKit';
import getStampFyiURL from '@/lib/getStampFyiURL';
import { LinkIcon } from '@heroicons/react/24/outline';
import formatAddress from '@/lib/formatAddress';
import { Wallet } from '@/utils/lens/generatedLenster';
import Slug from './UI/Slug';
import { Image } from './UI/Image';

interface WalletProfileProps {
  wallet: Wallet;
}

const WalletProfile: FC<WalletProfileProps> = ({ wallet }) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={`${POLYGONSCAN_URL}/address/${wallet?.address}`}
        className="flex items-center space-x-3"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Image
          onError={({ currentTarget }) => {
            currentTarget.src = getStampFyiURL(wallet?.address);
          }}
          src={imageKit(getStampFyiURL(wallet?.address))}
          className="h-10 w-10 rounded-full border bg-gray-200"
          height={40}
          width={40}
          alt={wallet?.address}
        />
        <div>
          <div className="flex items-center gap-1.5">
            <div>{formatAddress(wallet?.address)}</div>
            <LinkIcon className="h-4 w-4" />
          </div>
          <Slug className="text-sm" slug={formatAddress(wallet?.address)} />
        </div>
      </Link>
    </div>
  );
};

export default WalletProfile;
