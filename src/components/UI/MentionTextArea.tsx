import getIPFSLink from '@/lib/getIPFSLink';

import { UserSuggestion } from '@/typesLenster';
import { useLazyQuery } from '@apollo/client';

import cn from '@/components/UI/cn';
import type { Dispatch, FC } from 'react';
import { useEffect, useRef } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { AVATAR } from 'src/constants';
import { usePublicationStore } from 'src/store/publication4';
import Slug from './Slug';
import {
  MediaSet,
  NftImage,
  Profile,
  SearchProfilesDocument,
  SearchRequestTypes
} from '@/utils/lens/generatedLenster';
import getStampFyiURL from '@/lib/getStampFyiURL';
import imageKit from '@/lib/imageKit';

interface UserProps {
  suggestion: UserSuggestion;
  focused: boolean;
}

const User: FC<UserProps> = ({ suggestion, focused }) => (
  <div
    className={cn(
      { 'dropdown-active': focused },
      'm-1.5 flex items-center space-x-2 rounded-xl px-3 py-1'
    )}
  >
    <img
      className="h-7 w-7 rounded-full"
      height={32}
      width={32}
      src={imageKit(getIPFSLink(suggestion.picture), AVATAR)}
      alt={suggestion.id}
    />
    <div className="flex flex-col truncate">
      <div className="flex items-center gap-1">
        <div className="truncate text-sm">{suggestion.name}</div>
      </div>
      <Slug className="text-xs" slug={suggestion.id} prefix="@" />
    </div>
  </div>
);

interface Props {
  error: string;
  setError: Dispatch<string>;
  placeholder?: string;
  hideBorder?: boolean;
  autoFocus?: boolean;
  value: string;
  onChange: (e: any) => void;
}

export const MentionTextArea: FC<Props> = ({
  error,
  setError,
  placeholder = '',
  hideBorder = false,
  autoFocus = false,
  value,
  onChange
}) => {
  const publicationContent = usePublicationStore(
    (state) => state.publicationContent
  );
  const setPublicationContent = usePublicationStore(
    (state) => state.setPublicationContent
  );
  const [searchUsers] = useLazyQuery(SearchProfilesDocument);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = (query: string, callback: any) => {
    if (!query) {
      return;
    }

    searchUsers({
      variables: {
        request: { type: SearchRequestTypes.Profile, query, limit: 5 }
      }
    })
      .then(({ data }) => {
        // @ts-ignore
        const profiles = data?.search?.items ?? [];
        return profiles.map(
          (user: Profile & { picture: MediaSet & NftImage }) => ({
            uid: user.id,
            id: user.handle,
            display: user.handle,
            name: user?.name ?? user?.handle,
            picture:
              user?.picture?.original?.url ??
              user?.picture?.uri ??
              getStampFyiURL(user?.ownedBy)
          })
        );
      })
      .then(callback);
  };

  return (
    <div className="mb-2">
      <MentionsInput
        className={cn(
          hideBorder ? 'mention-input-borderless' : 'mention-input'
        )}
        value={publicationContent}
        placeholder={placeholder}
        inputRef={inputRef}
        onChange={(e) => {
          setPublicationContent(e.target.value);
          setError('');
        }}
      >
        <Mention
          trigger="@"
          displayTransform={(login) => `@${login} `}
          markup="@__id__ "
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <User suggestion={suggestion as UserSuggestion} focused={focused} />
          )}
          data={fetchUsers}
        />
      </MentionsInput>
      {error && (
        <div className="mt-1 px-5 text-sm font-bold text-red-500">{error}</div>
      )}
    </div>
  );
};
