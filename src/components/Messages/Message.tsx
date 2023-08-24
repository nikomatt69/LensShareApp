import MetaTags from '@/components/UI/MetaTags';
import MessageHeader from '@/components/Messages/MessageHeader';
import Loader from '@/components/UI/Loader';
import useGetMessages from '@/lib/useGetMessages';
import { useGetProfile } from '@/lib/useMessageDb';
import type {
  FailedMessage,
  PendingMessage
} from '@/lib/useSendOptimisticMessage';
import useSendOptimisticMessage from '@/lib/useSendOptimisticMessage';
import useStreamMessages from '@/utils/hooks/useStreamMessages';

import { parseConversationKey } from '@/lib/conversationKey';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';
import { useMessageStore } from 'src/store/message';

import Composer from './Composer';
import MessagesList from './MessagesList';
import PreviewList from './PreviewList';
import { Card } from '../UI/Card';
import { APP_NAME, STATIC_ASSETS_URL } from '@/constants';
import sanitizeDisplayName from '@/utils/sanitizeDisplayName';
import formatHandle from '@/utils/functions/formatHandle';
import { GridItemEight, GridLayout } from '../UI/GridLayout';
import Navbar from '../Navbar';
import BottomNav from '../Navs/BottomNav';
import NavbarDetails from '../NavbarDetails';
import { imageCdn } from '@/utils/functions/imageCdn';

interface MessageProps {
  conversationKey: string;
}

const Message: FC<MessageProps> = ({ conversationKey }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const { profile } = useGetProfile(currentProfile?.id, conversationKey);
  const queuedMessages = useMessageStore((state) =>
    state.queuedMessages.get(conversationKey)
  );
  const addQueuedMessage = useMessageStore((state) => state.addQueuedMessage);
  const removeQueuedMessage = useMessageStore(
    (state) => state.removeQueuedMessage
  );
  const updateQueuedMessage = useMessageStore(
    (state) => state.updateQueuedMessage
  );
  const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());
  const { messages, hasMore } = useGetMessages(
    conversationKey,
    endTime.get(conversationKey)
  );
  useStreamMessages(conversationKey);

  const onMessageQueue = useCallback(
    (message: PendingMessage | FailedMessage) => {
      addQueuedMessage(conversationKey, message);
    },
    [addQueuedMessage, conversationKey]
  );
  const onMessageCancel = useCallback(
    (id: string) => {
      removeQueuedMessage(conversationKey, id);
    },
    [removeQueuedMessage, conversationKey]
  );
  const onMessageUpdate = useCallback(
    (id: string, message: PendingMessage | FailedMessage) => {
      updateQueuedMessage(conversationKey, id, message);
    },
    [updateQueuedMessage, conversationKey]
  );
  const { missingXmtpAuth, sendMessage } = useSendOptimisticMessage(
    conversationKey,
    {
      onQueue: onMessageQueue,
      onCancel: onMessageCancel,
      onUpdate: onMessageUpdate
    }
  );

  const allMessages = useMemo(() => {
    // if the queued message is in sent messages, ignore it
    // it is expected that this will occur and provides a clean
    // transition from "pending" to "sent" state
    const finalQueuedMessage = (queuedMessages ?? []).reduce(
      (result, queuedMessage) => {
        const found = messages?.some((m) => m.id === queuedMessage.id);
        if (!found) {
          return [...result, queuedMessage];
        }
        return result;
      },
      [] as (PendingMessage | FailedMessage)[]
    );
    return [...finalQueuedMessage, ...(messages ?? [])];
  }, [messages, queuedMessages]);

  // remove pending messages from state after they've been sent
  useEffect(() => {
    if (queuedMessages) {
      for (const queuedMessage of queuedMessages) {
        let found: string = '';
        messages?.some((m) => {
          if (m.id === queuedMessage.id) {
            found = m.id;
            return true;
          }
        });
        if (found) {
          removeQueuedMessage(conversationKey, found);
          continue;
        }
      }
    }
    // only run this effect when messages changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

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

  const showLoading = !missingXmtpAuth && !currentProfile;

  const userNameForTitle =
    sanitizeDisplayName(profile?.name) ?? formatHandle(profile?.handle);

  const title = userNameForTitle
    ? `${userNameForTitle} • ${APP_NAME}`
    : APP_NAME;

  return (

    <GridLayout classNameChild="gap-1">
      <MetaTags title={title} />
      <PreviewList
        className="xs:hidden hidden sm:hidden md:hidden lg:block"
        selectedConversationKey={conversationKey}
      />
      <GridItemEight className="xs:mx-2 sm:mx-2 md:col-span-8">
        <Card className="flex h-[87vh] flex-col justify-between">
          {showLoading ? (
            <div className="flex   items-center justify-center">
              <Loader message={`Loading messages`} />
            </div>
          ) : (
            <>
              <MessageHeader
                profile={profile}
                conversationKey={conversationKey}
              />
              <MessagesList
                conversationKey={conversationKey}
                currentProfile={currentProfile}
                profile={profile}
                fetchNextMessages={fetchNextMessages}
                messages={allMessages}
                hasMore={hasMore}
                missingXmtpAuth={missingXmtpAuth ?? false}
              />
              <Composer
                sendMessage={sendMessage}
                conversationKey={conversationKey}
                disabledInput={missingXmtpAuth ?? false}
              />
            </>
          )}
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

const MessagePage: NextPage = () => {
  const currentProfileId = useAppStore((state) => state.currentProfile?.id);
  const {
    query: { conversationKey }
  } = useRouter();

  // Need to have a login page for when there is no currentProfileId
  if (
    !conversationKey ||
    !currentProfileId ||
    !Array.isArray(conversationKey)
  ) {
    return <Custom404 />;
  }

  const joinedConversationKey = conversationKey.join('/');
  const parsed = parseConversationKey(joinedConversationKey);

  if (!parsed) {
    return <Custom404 />;
  }

  const { members } = parsed;
  const profileId = members.find((member) => member !== currentProfileId);

  if (members.length > 1 && !profileId) {
    return <Custom404 />;
  }

  return <Message conversationKey={joinedConversationKey} />;
};

export default MessagePage;
