import stopEventPropagation from '@/lib/stopEventPropagation';
import Link from 'next/link';
import type { FC } from 'react';
import { Card } from '../UI/Card';
import imageKit from '@/lib/imageKit';
import { ATTACHMENT } from '@/constants';
import { OG } from '@/types/misc';
import {Image} from '@/components/UI/Image';
import { Publication } from '@/utils/lens/generatedLenster';
import sanitizeDStorageUrl from '@/utils/lib/sanitizeDStorageUrl';

interface EmbedProps {
  og: OG;
  publicationId?: string;
}

const Embed: FC<EmbedProps> = ({ og, publicationId }) => {
  return (
    <div
      className="mt-4 text-sm sm:w-4/6"
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
          {og.isLarge && og.image ? (
            <Image
              className="divider aspect-2 w-full rounded-t-xl object-cover"
              onError={({ currentTarget }) => {
                currentTarget.src = og.image as string;
              }}
              src={imageKit(og.image, ATTACHMENT)}
              alt="Thumbnail"
            />
          ) : null}
          <div className="flex items-center">
            {!og.isLarge && og.image ? (
              <Image
                className="h-36 w-36 rounded-l-xl border-r dark:border-gray-700"
                height={144}
                width={144}
                onError={({ currentTarget }) => {
                  currentTarget.src = og.image as string;
                }}
                src={imageKit(og.image, ATTACHMENT)}
                alt="Thumbnail"
              />
            ) : null}
            <div className="truncate p-5">
              <div className="space-y-1.5">
                {og.title ? (
                  <div className="truncate font-bold">{og.title}</div>
                ) : null}
                {og.description ? (
                  <div className="lt-text-gray-500 line-clamp-1 whitespace-break-spaces">
                    {og.description}
                  </div>
                ) : null}
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
