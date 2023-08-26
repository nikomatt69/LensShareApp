import { useHuddle01, usePeers } from '@huddle01/react/hooks';
import  Plural, { Trans }  from 'react-i18next';
import type { FC } from 'react';
import React from 'react';
import { useSpacesStore } from 'src/store/spaces';

import Avatar from './Avatar';
import getAvatar from '@/lib/getAvatar';
import getIPFSLink from '@/lib/getIPFSLink';
import imageKit from '@/lib/imageKit';
import sanitizeIpfsUrl from '@/utils/functions/sanitizeDStorageUrl';
import getTokenImage from '@/lib/getTokenImage';

import getProfilePicture from '@/utils/lib/getProfilePicture';
import getCoverPicture from '@/utils/lib/getCoverPicture';
import getMedia from '@/lib/getMedia';


const AvatarGrid: FC = () => {
  const { peers } = usePeers();
  const { me } = useHuddle01();
  const showSpacesWindow = useSpacesStore((state) => state.showSpacesWindow);
  const listenersCount =
    Object.values(peers).filter(({ role }) => role === 'listener').length +
    (me.role === 'listener' ? 1 : 0);

  return (
    <div className="min-w-[24rem]">
      <div className="pb-6">
        <div className="inline-flex grid min-h-[8rem] grid-cols-5 items-center justify-between gap-5 self-stretch">
          {showSpacesWindow && me.role !== 'listener' && (
            <Avatar
              key={me.meId}
              peerId={me.meId}
              displayName={me.displayName}
              role={me.role}
              avatarUrl={getMedia(me.avatarUrl)}
            />
          )}
          {Object.values(peers)
            .filter(({ role }) => role !== 'listener')
            .map(({ peerId, displayName, role, avatarUrl, mic }) => (
              <Avatar
                key={peerId}
                peerId={peerId}
                displayName={displayName}
                role={role}
                avatarUrl={avatarUrl}
                mic={mic}
              />
            ))}
        </div>
        <div className="py-4 text-sm font-normal leading-none text-slate-400">
        <Trans
            i18nKey={listenersCount === 1 ? "listener" : "listeners"}
            count={listenersCount}
            defaults="{{count}} listener"
            values={{ count: listenersCount }}
         />
        </div>
        <div className="inline-flex grid min-h-[8rem] grid-cols-5 items-center justify-between gap-5 self-stretch ">
          {showSpacesWindow && me.role === 'listener' && (
            <Avatar
              key={me.meId}
              peerId={me.meId}
              displayName={me.displayName}
              role={me.role}
              avatarUrl={me.avatarUrl}
            />
          )}
          {Object.values(peers)
            .filter(({ role }) => role === 'listener')
            .map(({ peerId, displayName, role, avatarUrl, mic }) => (
              <Avatar
                key={peerId}
                peerId={peerId}
                displayName={displayName}
                role={role}
                avatarUrl={avatarUrl}
                mic={mic}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarGrid;