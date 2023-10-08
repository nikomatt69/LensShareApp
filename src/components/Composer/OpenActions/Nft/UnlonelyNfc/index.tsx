
import Link from 'next/link';
import { type FC } from 'react';

import urlcat from 'urlcat';

import NftShimmer from './Shimmer';
import { UnlonelyNfcMetadata } from '@/types/nft';
import { Publication } from '@/utils/lens/generatedLenster';
import useUnlonelyNfc from '@/utils/hooks/unlonely/useUnlonelyNfc';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { STATIC_IMAGES_URL } from '@/constants';
import { Tooltip } from '@/components/UI/Tooltip';
import Video from '@/components/Composer/Video';
import { Card } from '@/components/UI/Card';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/UI/Button';

interface UnlonelyNfcProps {
  nftMetadata: UnlonelyNfcMetadata;
  publication: Publication;
}

const UnlonelyNfc: FC<UnlonelyNfcProps> = ({ nftMetadata, publication }) => {
  const { id } = nftMetadata;

  const {
    data: nfc,
    loading,
    error
  } = useUnlonelyNfc({
    id,
    enabled: Boolean(id)
  });

  if (loading) {
    return <NftShimmer />;
  }

  if (!nfc) {
    return null;
  }

  if (error) {
    return null;
  }

  const { title, videoLink, videoThumbnail } = nfc;

  return (
    <Card
      className="mt-3 flex-col"
      forceRounded
      onClick={(event) => stopEventPropagation(event)}
    >
      <Video
        src={videoLink}
        poster={videoThumbnail}
        
      />
      <div className="flex-col items-center justify-between border-t px-3 py-2 dark:border-gray-700">
        <div className="mr-5 flex-col items-center gap-2">
          <div className="text-xs font-serif">{title}</div>
        </div>
        <Link
          href={urlcat('https://www.unlonely.app/nfc/:id', {
            id: nfc.id
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

export default UnlonelyNfc;
