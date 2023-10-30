import type { Notification } from '@/utils/lens/generated5';

const getPushNotificationData = (
  notification: Notification
): {
  title: string;
} | null => {
  switch (notification?.__typename) {
    
    case 'NewCommentNotification':
      const commentedProfile = notification.comment.profile;
      const commentedHandle =
        commentedProfile.handle||
        commentedProfile.id;
      const commentedType =
        notification.comment.__typename?.toLowerCase();

      return {
        title: `${commentedHandle} commented on your ${commentedType}`
      };
    case 'NewMirrorNotification':
      const mirroredProfile = notification?.publication.id?.profile.id;
      const mirroredHandle =
        mirroredProfile.handle ||
        mirroredProfile.id;
      const mirroredType = notification.publication.__typename?.toLowerCase();

      return {
        title: `${mirroredHandle} mirrored your ${mirroredType}`
      };
    case 'NewMentionNotification':
      const mentionedProfile = notification.mentionPublication.profile;
      const mentionedHandle =
        mentionedProfile.handle||
        mentionedProfile.id;
      const mentionedType = notification.mentionPublication.__typename?.toLowerCase();

      return {
        title: `${mentionedHandle} mentioned your on a ${mentionedType}`
      };
    
    case 'NewReactionNotification':
      const reactedProfile =  notification.publication.__typename === 'Post'
      ? notification.publication?.id
      : notification?.publication.id
      const reactedHandle =
        reactedProfile.handle ||
        reactedProfile.id;
      const reactedType = notification.publication.__typename?.toLowerCase();

      return {
        title: `${reactedHandle} liked your ${reactedType}`
      };
    case 'NewFollowerNotification':
      const followedProfile = notification?.wallet?.defaultProfile?.id[0];
      const followedHandle =
        followedProfile.handle ||
        followedProfile.id;

      return {
        title: `${followedHandle} followed you`
      };
    default:
      return null;
  }
};

export default getPushNotificationData;
