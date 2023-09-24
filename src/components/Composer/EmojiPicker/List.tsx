import { ErrorMessage } from '@/components/UI/ErrorMessage';
import { Input } from '@/components/UI/Input';
import Loader from '@/components/UI/Loader';
import cn from '@/components/UI/cn';
import { STATIC_ASSETS_URL } from '@/constants';
import { Errors } from '@/lib/errors';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Emoji } from '@/types/misc';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { t } from '@lingui/macro';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ChangeEvent, FC } from 'react';
import { useRef, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';


interface ListProps {
  setEmoji: (emoji: string) => void;
}

const List: FC<ListProps> = ({ setEmoji }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState('');
  const { isLoading, error, data } = useQuery(['emojisData'], () =>
    axios.get(`${STATIC_ASSETS_URL}/emoji.json`).then((res) => res.data)
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  let filteredEmojis = data;
  if (searchText.length > 2) {
    filteredEmojis = data.filter((emoji: any) => {
      return emoji.description.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  useEffectOnce(() => {
    inputRef.current?.focus();
  });

  if (error) {
    return (
      <ErrorMessage
        className="m-5"
        title={Errors.SomethingWentWrong}
        error={{
          message: 'Error while loading emojis',
          name: Errors.SomethingWentWrong
        }}
      />
    );
  }

  if (isLoading) {
    return <Loader message={`Loading emojis`} />;
  }

  return (
    <div>
      <div className="w-full p-2 pb-0 pt-4" data-testid="emoji-search">
        <Input
          onClick={(e) => {
            e.preventDefault();
            stopEventPropagation(e);
          }}
          ref={inputRef}
          autoFocus
          type="text"
          className="px-3 py-2 text-sm"
          placeholder={'Search...'}
          value={searchText}
          iconLeft={<MagnifyingGlassIcon />}
          iconRight={
            <XMarkIcon
              className={cn(
                'cursor-pointer',
                searchText ? 'visible' : 'invisible'
              )}
              onClick={(e) => {
                e.preventDefault();
                stopEventPropagation(e);
                setSearchText('');
              }}
            />
          }
          onChange={onChange}
        />
      </div>
      <div className="grid max-h-[10rem] grid-cols-8 overflow-y-auto p-2 pt-2 text-lg">
        {filteredEmojis.map((emoji: Emoji) => (
          <button
            className="rounded-lg py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            key={emoji.emoji}
            type="button"
            onClick={() => setEmoji(emoji.emoji)}
          >
            {emoji.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
