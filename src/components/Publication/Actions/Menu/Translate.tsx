import stopEventPropagation from '@/lib/stopEventPropagation';
import { Publication } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';

import cn from '@/components/UI/cn';
import Link from 'next/link';
import type { FC } from 'react';
import { BsTranslate } from 'react-icons/bs';

interface TranslateProps {
  publication: Publication;
}

const Translate: FC<TranslateProps> = ({ publication }) => {
  const getGoogleTranslateUrl = (text: string): string => {
    return encodeURI(
      `https://translate.google.com/#auto|en|${encodeURIComponent(text)}`
    );
  };

  return (
    <Menu.Item
      as={Link}
      className={({ active }) =>
        cn(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm'
        )
      }
      href={getGoogleTranslateUrl(publication?.metadata?.content)}
      onClick={(event: any) => {
        stopEventPropagation(event);
      }}
      target="_blank"
    >
      <div className="flex items-center space-x-2">
        <BsTranslate className="h-4 w-4" />
        <div>Translate</div>
      </div>
    </Menu.Item>
  );
};

export default Translate;
