import getAvatar from '@/lib/getAvatar';
import getStampFyiURL from '@/lib/getStampFyiURL';
import formatAddress from '@/utils/functions/formatAddress';
import formatHandle from '@/utils/functions/formatHandle';
import useSendMessage from '@/utils/hooks/useSendMessage';
import { Profile } from '@/utils/lens/generatedLenster';
import { ChevronLeftIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { ContentTypeText } from '@xmtp/xmtp-js';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useMessageStore } from 'src/store/message';
import UnfollowButton from '../Buttons/UnfollowButton';
import FollowButton from '../Buttons/FollowButton';

import { Image } from '../UI/Image';
import UserProfile from '../ProfilePage/UserProfile';
import { Modal } from '../UI/Modal';
import FullScreenModal from '../UI/FullScreenModal';
import Link from 'next/link';

import Follow from '../Profile/Follow';
import Unfollow from '../Profile/Unfollow';
import { Button } from '../UI/Button';
import { LENSTOK_URL } from '@/constants';
import MeetingIcon from '../Meet/MeetingIcon';
import useSendOptimisticMessage from '@/lib/useSendOptimisticMessage';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { BiPhoneIncoming } from 'react-icons/bi';

interface MessageHeaderProps {
  profile?: Profile;
  conversationKey?: string;
}

const MessageHeader: FC<MessageHeaderProps> = ({
  profile,
  conversationKey
}) => {
  const [meetingUrl, setMeetingUrl] = useState('');
  const router = useRouter();
  const [following, setFollowing] = useState(true);
  const unsyncProfile = useMessageStore((state) => state.unsyncProfile);
  const ensNames = useMessageStore((state) => state.ensNames);
  const ensName = ensNames.get(conversationKey?.split('/')[0] ?? '');
  const url =
    (ensName && getStampFyiURL(conversationKey?.split('/')[0] ?? '')) ?? '';

  const { sendMessage } = useSendOptimisticMessage(conversationKey ?? '');
  const [show, setShow] = useState(false);

  const currentProfile = profile;

  const HUDDLE_API_KEY = 'wWUkmfVYqMCcYLKEGA8VE1fZ4hWyo5d0';

  const setFollowingWrapped = useCallback(
    (following: boolean) => {
      setFollowing(following);
      unsyncProfile(profile?.id ?? '');
    },
    [setFollowing, unsyncProfile, profile?.id]
  );

  const onBackClick = () => {
    router.push('/messages');
  };

  useEffect(() => {
    setFollowing(profile?.isFollowedByMe ?? false);
  }, [profile?.isFollowedByMe]);

  if (!profile && !conversationKey) {
    return null;
  }

  return (
    <div className="divider flex items-center justify-between rounded-xl  border border-blue-700 px-3 py-1">
      <div className="flex items-center">
        <ChevronLeftIcon
          onClick={onBackClick}
          className="mr-1 h-6 w-6 cursor-pointer text-blue-700 lg:hidden"
        />
        {profile?.id ? (
          <UserProfile profile={profile} />
        ) : (
          <>
            <Image
              src={ensName ? url : getAvatar(profile)}
              loading="lazy"
              className="mr-4 h-10 w-10 rounded-full border bg-gray-200 dark:border-gray-700"
              height={40}
              width={40}
              alt={formatHandle('')}
            />
            {ensName ?? formatAddress(conversationKey ?? '')}
          </>
        )}
      </div>
      {profile && (
  <div className='flex mx-3 mt-1'>
    <img
      src="/camera-video.svg"
      onClick={async () => {
        const apiCall = await fetch('/api/create-room', {
          mode: 'no-cors',
          method: 'POST',
          body: JSON.stringify({
            title: 'LensShare-Space'
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'wWUkmfVYqMCcYLKEGA8VE1fZ4hWyo5d0' || ''
          }
        });
        const data = (await apiCall.json()) as {
          data: { roomId: string };
        };
        const { roomId } = data.data;
        const currentUrl = window.location.href;
        const url = currentUrl.match(/^https?:\/\/([^/]+)/)?.[0];
        const meetingUrl = `${url}/meet/${roomId}`;
        sendMessage(
          `VideoCall Incoming at ${url}/meet/${roomId}`,
          ContentTypeText
        );

        // Instead of sending a message, set the meeting URL in the state
        setShow(true);
        setMeetingUrl(meetingUrl);
      }}
      className="mb-2 mr-4  inline h-8 w-8 cursor-pointer"
    />
    <div className='mx-3 mt-2 '>

    {show && (
      <Link href={meetingUrl}>
        
          <BiPhoneIncoming className='h-6 w-6 text-green-500'/>
        
      </Link>
    )}
    </div>
    <div className='mx-2 '>
    {!following ? (
      <FollowButton
        profile={profile}
        setFollowing={setFollowingWrapped}
      />
    ) : (
      <UnfollowButton
        profile={profile}
        setFollowing={setFollowingWrapped}
      />
    )}
    </div>
  </div>
 )}
  </div>
  );
};
export default MessageHeader;
