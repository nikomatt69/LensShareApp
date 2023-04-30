import MetaTags from '@/components/UI/MetaTags';
import MessageHeader from '@/components/Messages/MessageHeader';
import Loader from '@/components/UI/Loader';
import { Card } from '@/components/UI/Card';
import useGetConversation from '@/utils/hooks/useGetConversation';
import useGetMessages from '@/utils/hooks/useGetMessages';
import useSendMessage from '@/utils/hooks/useSendMessage';
import useStreamMessages from '@/utils/hooks/useStreamMessages';
import { parseConversationKey } from '@/lib/conversationKey';
import { APP_NAME } from '@/constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';
import { useMessageStore } from 'src/store/message';

import Composer from './Composer';
import MessagesList from './MessagesList';
import PreviewList from './PreviewList';
import Navbar from '../Navbar';
import NavbarDetails from '../NavbarDetails';

interface MessageProps {
  conversationKey: string;
}

const Message: FC<MessageProps> = ({ conversationKey }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const profile = useMessageStore((state) => state.messageProfiles.get(conversationKey));
  const { selectedConversation, missingXmtpAuth } = useGetConversation(conversationKey, profile);
  const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());
  const { messages, hasMore } = useGetMessages(
    conversationKey,
    selectedConversation,
    endTime.get(conversationKey)
  );
  useStreamMessages(conversationKey, selectedConversation);
  const { sendMessage } = useSendMessage(selectedConversation);

  const fetchNextMessages = useCallback(() => {
    if (hasMore && Array.isArray(messages) && messages.length > 0) {
      const lastMsgDate = messages[messages.length - 1].sent;
      const currentEndTime = endTime.get(conversationKey);
      if (!currentEndTime || lastMsgDate <= currentEndTime) {
        endTime.set(conversationKey, lastMsgDate);
        setEndTime(new Map(endTime));
      }
    }
  }, [conversationKey, hasMore, messages, endTime]);

  if (!currentProfile) {
    return <Custom404 />;
  }

  const showLoading = !missingXmtpAuth && (!profile || !currentProfile || !selectedConversation);

  const userNameForTitle = profile?.name ?? profile?.handle;
  const title = userNameForTitle ? `${userNameForTitle} • ${APP_NAME}` : APP_NAME;

  return (
    <div>
     <MetaTags title={`Messages  • ${profile?.name} ${APP_NAME}`} />
      <NavbarDetails />
      <PreviewList
          className="hidden md:hidden sm:hidden xs:hidden"
          selectedConversationKey={conversationKey} />
          <div className=" flex-auto xs:w-[100vh] w-full h-full mb-0 sm:w-[100vh]  md:h-[100vh] xl:h-[100vh]">
          <Card className="flex-1 w-full h-full !rounded-tr-lg !rounded-br-lg ">
              {showLoading ? (
                  <div className="flex h-full flex-grow justify-center items-center">
                      <Loader message="Loading messages" />
                  </div>
              ) : (
                  <>
                      <MessageHeader profile={profile} />
                      <MessagesList
                          currentProfile={currentProfile}
                          profile={profile}
                          fetchNextMessages={fetchNextMessages}
                          messages={messages ?? []}
                          hasMore={hasMore}
                          missingXmtpAuth={missingXmtpAuth ?? false} />
                      <Composer
                          sendMessage={sendMessage}
                          conversationKey={conversationKey}
                          disabledInput={missingXmtpAuth ?? false} />
                  </>
              )}
          </Card>
      </div>
      </div>
    
  );
};

const MessagePage: NextPage = () => {
  const currentProfileId = useAppStore((state) => state.currentProfile?.id);
  const {
    query: { conversationKey }
  } = useRouter();

  // Need to have a login page for when there is no currentProfileId
  if (!conversationKey || !currentProfileId || !Array.isArray(conversationKey)) {
    return <Custom404 />;
  }

  const joinedConversationKey = conversationKey.join('/');
  const parsed = parseConversationKey(joinedConversationKey);

  if (!parsed) {
    return <Custom404 />;
  }

  const { members } = parsed;
  const profileId = members.find((member) => member !== currentProfileId);

  if (!profileId) {
    return <Custom404 />;
  }

  return <Message conversationKey={joinedConversationKey} />;
};

export default MessagePage;
