export const Subscription = `
  subscription Notifications($request: NotificationRequest!) {
    notifications(request: $request) {
    items {
      ... on NewReactionNotification {
        id
      }
      ... on NewCommentNotification {
        id
      }
      ... on NewMirrorNotification {
        id
      }
      ... on NewCollectNotification {
        id
      }
      ... on NewFollowNotification {
        id
      }
      ... on NewMentionNotification {
        id
      }
    }
  }
`;
