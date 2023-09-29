import { Card } from '@/components/UI/Card';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import {
  MicrophoneIcon,
  PencilIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useAppStore } from 'src/store/app';
import { useGlobalModalStateStore } from 'src/store/modals';
import { usePublicationStore } from 'src/store/publication4';
import { useEffectOnce } from 'usehooks-ts';
import { Image } from '@/components/UI/Image';
import { PublicationTypes } from '@/utils/lens/generatedLenster';
import { NewPublicationTypes } from '@/enums';

const NewPost: FC = () => {
  const { query, isReady, push } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setShowComposerModal = useGlobalModalStateStore(
    (state) => state.setShowComposerModal
  );
  const setPublicationContent = usePublicationStore(
    (state) => state.setPublicationContent
  );

  const openPublicationModal = () => {
    setShowComposerModal(true, NewPublicationTypes.Publication);
  };

  const openSpacesModal = () => {
    setShowComposerModal(true, NewPublicationTypes.Spaces);
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

      openPublicationModal();
      setPublicationContent(content);
    }
  });

  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center space-x-3">
        <Image
          src={getAvatar(currentProfile)}
          className="h-9 w-9 cursor-pointer rounded-full border bg-gray-200 dark:border-gray-700"
          onClick={() => push(`/u/${currentProfile?.id}`)}
          alt={formatHandle(currentProfile?.handle)}
        />
        <button
          className="flex w-full items-center space-x-2 rounded-xl border bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          type="button"
          onClick={openPublicationModal}
        >
          <PencilIcon className="h-5 w-5" />
          <span>New Post?</span>
        </button>

        <button className="inline-flex h-10 w-10 items-center justify-center gap-2.5 rounded-lg border bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900">
          <MicrophoneIcon
            className="text-brand h-6 w-6"
            onClick={openSpacesModal}
          />
        </button>
      </div>
    </Card>
  );
};

export default NewPost;
