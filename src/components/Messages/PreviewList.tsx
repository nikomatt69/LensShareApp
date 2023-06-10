import Preview from 'src/components/Messages/Preview';
import { Card } from 'src/components/UI/Card';
import { EmptyState } from 'src/components/UI/EmptyState';
import { ErrorMessage } from 'src/components/UI/ErrorMessage';
import clsx from 'clsx';
import { ERROR_MESSAGE,  } from 'src/constants';
import { Profile, SearchProfilesDocument, SearchPublicationsDocument, SearchRequestTypes } from 'src/utils/lens';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { useEffect, useState } from 'react';
import {useAppStore} from 'src/store/app';
import { useMessagePersistStore, useMessageStore } from 'src/store/message';
import useMessagePreviews from 'src/utils/hooks/useMessagePreviews';
import buildConversationId from 'src/utils/functions/buildConversationId';
import { buildConversationKey } from 'src/utils/functions/conversationKey';
import  Loader  from 'src/components/UI/Loader';
import {Modal} from 'src/components/UI/Modal';
import { BiMessageRoundedDots, BiPlusCircle } from 'react-icons/bi';
import { HiOutlineUsers } from 'react-icons/hi';
import Following from 'src/components/ProfilePage/Following';
import { useLazyQuery } from '@apollo/client';
import useDebounce from 'src/utils/hooks/useDebounce';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { BsSearch } from 'react-icons/bs';
import  ProfileId from '@/utils/lens';
import Navbar from '../Navbar';
import NavbarDetails from '../NavbarDetails';
import Search from '../Search/Search';

interface Props {
  className?: string;
  selectedConversationKey?: string;
}

const PreviewList: FC<Props> = ({ className, selectedConversationKey }) => {
    const router = useRouter();
    const currentProfile = useAppStore((state) => state.currentProfile);
    const addProfileAndSelectTab = useMessageStore((state) => state.addProfileAndSelectTab);
    const selectedTab = useMessageStore((state) => state.selectedTab);
    const setSelectedTab = useMessageStore((state) => state.setSelectedTab);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [keyword, setKeyword] = useState('')
    const debouncedValue = useDebounce<string>(keyword, 500)
    const [showResults, setResults] = useState(false)
    const [activeSearch, setActiveSearch] = useState(SearchRequestTypes.Profile)

    const { authenticating, loading, messages, profilesToShow, requestedCount, profilesError } = useMessagePreviews();
    const clearMessagesBadge = useMessagePersistStore((state) => state.clearMessagesBadge);

    const sortedProfiles = Array.from(profilesToShow).sort(([keyA], [keyB]) => {
        const messageA = messages.get(keyA);
        const messageB = messages.get(keyB);
        return (messageA?.sent?.getTime() || 0) >= (messageB?.sent?.getTime() || 0) ? -1 : 1;
    });

    const [getProfiles, { data: searchResults, loading: searchLoading }] = useLazyQuery( SearchProfilesDocument)

    const onDebounce = () => {
        if (keyword.trim().length) {
            getProfiles({
                variables: {
                    request: {
                        type: activeSearch,
                        query: keyword,
                        limit: 5,
                        
                    }
                }
            })
        }
    }

    useEffect(() => {
        onDebounce()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, activeSearch])

    const clearSearch = () => {
        setKeyword('')
    }

    const onSearchProfile = ((e: any) => {
        if (e.target.value.length > 0) {
            e.target.value
            setActiveSearch(SearchRequestTypes.Profile)
            setResults(true);
            setKeyword(e.target.value);
        } else {
            setResults(false);
            setKeyword('');
        }
    });

    
    useEffect(() => {
      if (!currentProfile) {
        return;
      }
      clearMessagesBadge(currentProfile.id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProfile]);
  
    const showAuthenticating = currentProfile && authenticating;
    const showLoading = loading && (messages.size === 0 || profilesToShow.size === 0);
  
    const newMessageClick = () => {
      setShowSearchModal(true);
    };
  
    const onProfileSelected = (profile: Profile) => {
      const conversationId = buildConversationId(currentProfile?.id, profile.id);
      const conversationKey = buildConversationKey(profile.ownedBy, conversationId);
      addProfileAndSelectTab(conversationKey, profile);
      router.push(`/messages/${conversationKey}`);
      setShowSearchModal(false);
    };


    return (
        <div
            className={clsx(
                'w-full h-full flex flex-col justify-between   rounded-3xl',
                className
            )}
        >
        <NavbarDetails />
            <Card className="flex h-full flex-col justify-between !border-r-0 !rounded-tl-3xl !rounded-bl-3xl !rounded-none">
                <div className="flex items-center justify-between bg-blue-500 border-4 border-black rounded-3xl p-5 ">
                    <div className="font-bold">Messages</div>
                    {currentProfile && !showAuthenticating && !showLoading && (
                        <button onClick={newMessageClick} type="button">
                            <BiPlusCircle className="h-6 w-6" />
                        </button>
                    )}
                </div>
                <div className="flex sm:hidden">
                    <div
                        onClick={() => setSelectedTab('Following')}
                        className={clsx(
                            'text-brand2-500 tab-bg m-2 ml-4 flex flex-1 cursor-pointer items-center justify-center rounded-full p-2 font-bold',
                            selectedTab === 'Following' ? 'bg-blue-300' : ''
                        )}
                    >
                        <HiOutlineUsers className="mr-2 h-4 w-4" />
                        Following
                    </div>
                    <div
                        onClick={() => setSelectedTab('Requested')}
                        className={clsx(
                        'text-brand2-500 tab-bg m-2 mr-4 flex flex-1 cursor-pointer items-center justify-center rounded-full p-2 font-bold',
                        selectedTab === 'Requested' ? 'bg-blue-300' : ''
                        )}
                    >
                        Requested
                        {requestedCount > 0 && (
                            <span className="bg-brand2-200 ml-2 rounded-2xl px-3 py-0.5 text-sm font-bold">
                                {requestedCount > 99 ? '99+' : requestedCount}
                            </span>
                        )}
                    </div>
                </div>
                {selectedTab === 'Requested' ? (
                <div className="mt-1 bg-yellow-100 p-2 px-5 text-sm text-yellow-800">
                    These conversations are from Lens profiles that you don&apos;t currently follow.
                </div>
                ) : null}
                <div className="h-full overflow-y-hidden overflow-x-hidden">
                {showAuthenticating ? (
                    <div className="flex h-full flex-grow items-center justify-center">
                        <Loader/>
                    </div>
                ) : showLoading ? (
                    <div className="flex h-full flex-grow items-center justify-center">
                        <Loader />
                    </div>
                ) : profilesError ? (
                    <ErrorMessage
                        className="m-5"
                        title={`Failed to load messages`}
                        error={{ message: ERROR_MESSAGE, name: ERROR_MESSAGE }}
                    />
                ) : sortedProfiles.length === 0 ? (
                    <button className="h-full w-full justify-items-center" onClick={newMessageClick} type="button">
                        <EmptyState
                            message={`Start messaging your Lens frens`}
                            icon={<BiMessageRoundedDots className="text-brand h-8 w-8" />}
                            hideCard
                        />
                    </button>
                ) : (
                    sortedProfiles?.map(([key, profile]) => {
                        const message = messages.get(key);
                        if (!message) {
                            return null;
                        }

                        return (
                            <Preview
                                isSelected={key === selectedConversationKey}
                                key={key}
                                profile={profile}
                                conversationKey={key}
                                message={message}
                            />
                        );
                    })
                )}
                </div>
            </Card>
        <div className='' >
        <Modal
        title={`New message`}
        icon={<BiMessageRoundedDots className="text-brand h-5 w-5" />}
        size="sm"
        show={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        >
        <div className="w-full px-4 pb pt-4">
          <Search
            modalWidthClassName="max-w"
            placeholder={`Search for someone to message...`}
            onProfileSelected={onProfileSelected}
          />
        </div>

         </Modal>
        </div>
    </div>
    );
};

export default PreviewList;