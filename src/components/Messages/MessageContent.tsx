import Markup from '@/components/UI/Markup';
import {
  type FailedMessage,
  isQueuedMessage,
  type PendingMessage
} from '@/lib/useSendOptimisticMessage';
import type { Profile } from '@/utils/lens/generatedLenster';
import type { DecodedMessage } from '@xmtp/xmtp-js';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import { ContentTypeRemoteAttachment } from 'xmtp-content-type-remote-attachment';

import RemoteAttachmentPreview from './RemoteAttachmentPreview';
import Link from 'next/link';

interface MessageContentProps {
  message: DecodedMessage | PendingMessage | FailedMessage;
  profile: Profile | undefined;
  sentByMe: boolean;
  preview?: ReactNode;
}

const MessageContent: FC<MessageContentProps> = ({
  message,
  profile,
  sentByMe,
  preview
}) => {
  const previewRef = useRef<ReactNode>();

  const hasQueuedMessagePreview = isQueuedMessage(message);

  // if message is pending, render a custom preview if available
  if (hasQueuedMessagePreview && message.render) {
    if (!previewRef) return previewRef;
  }

  if (message.contentType.sameAs(ContentTypeRemoteAttachment)) {
    return (
      <RemoteAttachmentPreview
        remoteAttachment={message.content}
        profile={profile}
        sentByMe={sentByMe}
        preview={previewRef.current}
      />
    );
  }

  const meetingUrlMatches = message.content.match(/(https?:\/\/.*)/);
  const meetingLink = meetingUrlMatches ? meetingUrlMatches[0] : null;

  return meetingLink ? (
    <div>
      {'Join here for a call: '}
      <Link
        href={`javascript:window.open('${meetingLink}', 'newwindow', 'height=800,width=1200');`}
      >
        Click here
      </Link>
    </div>
  ) : (
    <Markup>{message.content}</Markup>
  );
};

export default MessageContent;
