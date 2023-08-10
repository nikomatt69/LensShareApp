import { Card } from '@/components/UI/Card';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import { MicrophoneIcon, PencilIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useAppStore } from 'src/store/app';
import { useGlobalModalStateStore } from 'src/store/modals';
import { usePublicationStore } from 'src/store/publication4';
import { useEffectOnce } from 'usehooks-ts';
import { Image } from '@/components/UI/Image';
import { PublicationTypes } from '@/utils/lens/generatedLenster';

const NewPost: FC = () => {
  const { query, isReady, push } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setShowNewModal = useGlobalModalStateStore(
    (state) => state.setShowNewModal
  );
  const setPublicationContent = usePublicationStore(
    (state) => state.setPublicationContent
  );


  const openModal = () => {
    setShowNewModal(true, PublicationTypes.Post);
  };

  const openSpacesModal = () => {
    setShowNewModal(true, PublicationTypes.Spaces);
  };

  useEffectOnce(() => {
    if (isReady && query.text) {
      const { text, url, via, hashtags } = query;
      let processedHashtags;

      if (hashtags) {
        processedHashtags = (hashtags as string)
          .split(',')
          .map((tag) => `#${tag} `)
          .join('');
      }

      const content = `${text}${
        processedHashtags ? ` ${processedHashtags} ` : ''
      }${url ? `\n\n${url}` : ''}${via ? `\n\nvia @${via}` : ''}`;

      setShowNewModal(true, PublicationTypes.Post);
      setPublicationContent(content);
    }
  });

  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center space-x-3">
        <Image
          src={getAvatar(currentProfile)}
          className="h-9 w-9 cursor-pointer rounded-full border bg-gray-200 dark:border-gray-700"
          onClick={() => push(`/u/${currentProfile?.handle}`)}
          alt={formatHandle(currentProfile?.handle)}
        />
        <button
          className="flex w-full items-center space-x-2 rounded-xl border bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          type="button"
          onClick={() => openModal()}
        >
          <PencilIcon className="h-5 w-5" />
          <span>
            What's happening?
          </span>
        </button>
      
          <div className="inline-flex h-10 w-10 items-center justify-center gap-2.5 rounded-lg border bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900">
            <MicrophoneIcon
              className="relative h-5 w-5 cursor-pointer"
              onClick={() => openSpacesModal()}
            />
          </div>
     
      </div>
    </Card>
  );
};

export default NewPost;
