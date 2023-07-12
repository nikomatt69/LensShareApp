import { OG } from '@/typesLenster';
import type { FC } from 'react';

interface PlayerProps {
  og: OG;
}

const Player: FC<PlayerProps> = ({ og }) => {
  return (
    <div
      className=" mt-5 flex h-full w-full rounded-l-xl text-sm"
      data-testid={`rich-oembed-${og.url}`}
    >
      <div
        className="oembed-player"
        dangerouslySetInnerHTML={{ __html: og.html }}
      />
    </div>
  );
};

export default Player;
