import { Card } from '@/components/UI/Card';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import { PencilIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useAppStore } from 'src/store/app';
import { useGlobalModalStateStore } from 'src/store/modals';
import { usePublicationStore } from 'src/store/publication4';
import { useEffectOnce } from 'usehooks-ts';
import { Image } from '@/components/UI/Image';

const NewPost: FC = () => {
  const { query, push } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
  );
  const setPublicationContent = usePublicationStore(
    (state) => state.setPublicationContent
  );

  useEffectOnce(() => {
    if (query.text) {
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

      setShowNewPostModal(true);
      setPublicationContent(content);
    }
  });

  return (
    <Card
      className="space-y-3 rounded-xl border-blue-600 p-5"
      onClick={() => setShowNewPostModal(true)}
    >
      <div className="flex items-center  space-x-3">
        <Image
          src={getAvatar(currentProfile)}
          className="h-9 w-9 cursor-pointer rounded-full border bg-gray-200 dark:border-gray-700"
          onClick={() => push(`/u/${currentProfile?.id}`)}
          alt={currentProfile?.id}
        />
        <button
          className="flex w-full items-center space-x-2 rounded-xl border bg-gray-100 px-4 py-2 "
          type="button"
          onClick={() => setShowNewPostModal(true)}
        >
          <PencilIcon className="h-5 w-5" />
          <span>New Post...</span>
        </button>
      </div>
    </Card>
  );
};

export default NewPost;
