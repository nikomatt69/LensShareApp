import cn from '@/components/UI/cn';
import { NewPublicationTypes } from '@/enums';
import { Publication, PublicationTypes } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';
import { HiAnnotation } from 'react-icons/hi';
import { useGlobalModalStateStore } from 'src/store/modals';
import { usePublicationStore } from 'src/store/publication4';
interface QuoteProps {
  publication: Publication;
}

const Quote: FC<QuoteProps> = ({ publication }) => {
  const isMirror = publication.__typename === 'Mirror';
  const publicationType = isMirror
    ? publication.mirrorOf.__typename
    : publication.__typename;

  const setShowComposerModal = useGlobalModalStateStore(
    (state) => state.setShowComposerModal
  );
  const setQuotedPublication = usePublicationStore(
    (state) => state.setQuotedPublication
  );

  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        cn(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm'
        )
      }
      onClick={() => {
        setQuotedPublication(publication);
        setShowComposerModal(true, NewPublicationTypes.Publication);
      }}
    >
      <div className="flex items-center space-x-2">
        <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
        <div>
          {publicationType === 'Comment' ? 'Quote comment' : ' Quote post'}
        </div>
      </div>
    </Menu.Item>
  );
};

export default Quote;
