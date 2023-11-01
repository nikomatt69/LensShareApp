import {
  CursorArrowRaysIcon,
  SignalIcon,
  SignalSlashIcon
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { type FC } from 'react';

import urlcat from 'urlcat';

import NftShimmer from './Shimmer';
import { UnlonelyChannelMetadata } from '@/types/nft';
import { Publication } from '@/utils/lens/generatedLenster';
import useUnlonelyChannel from '@/utils/hooks/unlonely/useUnlonelyChannel';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Card } from '@/components/UI/Card';
import { Tooltip } from '@/components/UI/Tooltip';
import Video from '@/components/Composer/Video';
import { STATIC_IMAGES_URL } from '@/constants';
import cn from '@/components/UI/cn';
import { Button } from '@/components/UI/Button';

interface UnlonelyChannelProps {
  nftMetadata: UnlonelyChannelMetadata;
  publication: Publication;
}

const UnlonelyChannel: FC<UnlonelyChannelProps> = ({
  nftMetadata,
  publication
}) => {
  const { slug } = nftMetadata;

  const {
    data: channel,
    loading,
    error
  } = useUnlonelyChannel({
    slug,
    enabled: Boolean(slug)
  });

  if (loading) {
    return <NftShimmer />;
  }

  if (!channel) {
    return null;
  }

  if (error) {
    return null;
  }

  const { name, playbackUrl, isLive } = channel;

  return (
    <Card
      className="mt-3 flex-col"
      forceRounded
      onClick={(event) => stopEventPropagation(event)}
    >
      <Video src={playbackUrl} />
      <div className="flex-col items-center justify-between rounded-b-xl border-t border-blue-700 border-l-blue-700 border-r-blue-700 bg-gray-400 px-3 py-2 dark:bg-gray-700">
        <div className="mr-5 flex-col flex-wrap items-center gap-2 py-1">
          <div className="gap-1 py-1 font-serif text-xs">{name}</div>
          <div
            className={cn(
              isLive ? 'bg-red-500' : 'bg-gray-500',
              'flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-white'
            )}
          >
            {isLive ? (
              <SignalIcon className="h-3 w-3  animate-pulse" />
            ) : (
              <SignalSlashIcon className="h-3 w-3" />
            )}
            <span>{isLive ? `Live` : `Offline`}</span>
          </div>
        </div>
        <Link
          href={urlcat('https://www.unlonely.app/channels/:slug', {
            slug: channel.slug
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="text-xs"
            icon={<CursorArrowRaysIcon className="h-4 w-4" />}
            size="sm"
          >
            Open
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default UnlonelyChannel;
