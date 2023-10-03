import stopEventPropagation from '@/lib/stopEventPropagation';
import Link from 'next/link';
import type { FC } from 'react';
import { Card } from '../UI/Card';
import imageKit from '@/lib/imageKit';
import { ATTACHMENT, AVATAR, SQUARE } from '@/constants';
import { OG } from '@/types/misc';
import { Image } from '@/components/UI/Image';
import { Publication } from '@/utils/lens/generatedLenster';
import sanitizeDStorageUrl from '@/utils/lib/sanitizeDStorageUrl';
import { title } from 'process';

interface EmbedProps {
  og: OG;
  publicationId?: string;
}

const Embed: FC<EmbedProps> = ({ og, publicationId }) => {
  return (
    <div
      className="mt-4 truncate text-sm sm:w-2/6"
      data-testid={`normal-oembed-${og.url}`}
    >
      <Link
        href={og.url}
        onClick={(event) => {
          stopEventPropagation(event);
        }}
        target={og.url.includes(location.host) ? '_self' : '_blank'}
        rel="noreferrer noopener"
      >
        <Card forceRounded>
          {og.isLarge &&  og.image? (
            <Image
              className="divider inline-flex  aspect-2 rounded-xl"
              onError={({ currentTarget }) => {
                currentTarget.src = og.image as string;
              }}
              src={imageKit(og.image , ATTACHMENT)}
              alt={imageKit(og.image ,ATTACHMENT)}
            />
          ) : null}
          <div className="flex items-center">
            {!og.isLarge && og.image ? (
              <Image
                className="h-30 w-30 rounded-l-xl border-r dark:border-gray-700"
                height={60}
                width={60}
                onError={({ currentTarget }) => {
                  currentTarget.src = og.thumbnail as string;
                }}
                src={imageKit(og.image , ATTACHMENT)}
              />
            ) : null}
            <div className="truncate break-words p-5">
              <div className="space-y-1.5 truncate break-words">
                {og.site ? (
                  <div className="flex items-center space-x-2 pt-1.5">
                    {og.favicon ? (
                      <img
                        className="h-4 w-4 rounded-full"
                        height={16}
                        width={16}
                        src={og.favicon}
                        alt="Favicon"
                      />
                    ) : null}
                    <div className="lt-text-gray-500 text-xs">{og.site}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default Embed;
