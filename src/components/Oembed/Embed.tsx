import stopEventPropagation from '@/lib/stopEventPropagation';
import Link from 'next/link';
import type { FC } from 'react';
import { Card } from '../UI/Card';
import imageKit from '@/lib/imageKit';
import { ATTACHMENT } from '@/constants';
import { OG } from '@/typesLenster';
import { Image } from '../UI/Image';

interface EmbedProps {
  og: OG;
}

const Embed: FC<EmbedProps> = ({ og }) => {
  return (
    <div
      className="mt-4 text-sm sm:w-5/6"
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
          {og.isLarge && og.thumbnail && (
            <Image
              className="divider w-full  rounded-t-xl"
              onError={({ currentTarget }) => {
                currentTarget.src = og.thumbnail;
              }}
              src={imageKit(og.thumbnail, ATTACHMENT)}
              alt="Thumbnail"
            />
          )}
          <div className="flex  items-center">
            {!og.isLarge && og.thumbnail && (
              <Image
                className="h-34 w-34 flex  rounded-l-xl border-r"
                height={144}
                width={144}
                onError={({ currentTarget }) => {
                  currentTarget.src = og.thumbnail;
                }}
                src={imageKit(og.thumbnail, ATTACHMENT)}
                alt="Thumbnail"
              />
            )}
            <div className="truncate p-2">
              <div className="space-y-1.5">
                {og.title && (
                  <div className="line-clamp-2 truncate break-words font-bold">
                    {og.title}
                  </div>
                )}
                {og.site && (
                  <div className="flex items-center space-x-2 pt-1.5">
                    {og.favicon && (
                      <img
                        className="h-4 w-4 rounded-full"
                        height={16}
                        width={16}
                        src={og.favicon}
                        alt="Favicon"
                      />
                    )}
                    <div className="lt-text-gray-500 text-xs">{og.site}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default Embed;
