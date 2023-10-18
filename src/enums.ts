export enum OptmisticPublicationType {
  NewPost = 'NEW_POST',
  NewComment = 'NEW_COMMENT'
}

export enum HomeFeedType {
  FOR_YOU = 'FOR_YOU',
  FOLLOWING = 'FOLLOWING',
  HIGHLIGHTS = 'HIGHLIGHTS',
  LATEST = 'LATEST',
  MUSIC = 'MUSIC',
  EXPLORE = 'EXPLORE',
 
  K3L_RECENT = 'K3L_RECENT',
  K3L_RECOMMENDED = 'K3L_RECOMMENDED',
  K3L_POPULAR = 'K3L_POPULAR',
  K3L_CROWDSOURCED = 'K3L_CROWDSOURCED',
  K3L_FOLLOWING = 'K3L_FOLLOWING',
  LENSTER_MOSTVIEWED = 'LENSTER_MOSTVIEWED',
  LENSTER_MOSTINTERACTED = 'LENSTER_MOSTINTERACTED'
}

export enum NotificationType {
  All = 'ALL',
  Mentions = 'MENTIONS',
  Comments = 'COMMENTS',
  Likes = 'LIKES',
  Collects = 'COLLECTS'
}

export enum ProfileFeedType {
  Feed = 'FEED',
  Replies = 'REPLIES',
  Media = 'MEDIA',
  Collects = 'COLLECTS',
  Nft = 'NFT',
  Subscribers = 'SUBSCRIBERS',
  Superfluid = 'SUBSCRIBERSFEED'
}

export enum MessageTabs {
  All = 'All',
  Lens = 'Lens',
  Other = 'Other',
  Requests = 'Requests'
}

export enum TokenGateCondition {
  HAVE_A_LENS_PROFILE = 'HAVE_HANDLE',
  FOLLOW_A_LENS_PROFILE = 'FOLLOW_HANDLE',
  COLLECT_A_POST = 'COLLECT_POST',
  MIRROR_A_POST = 'MIRROR_POST'
}

export enum MusicTrack {
  DEFAULT = 'DEFAULT',
  CALM_MY_MIND = 'CALM_MY_MIND',
  CRADLE_OF_SOUL = 'CRADLE_OF_SOUL',
  FOREST_LULLABY = 'FOREST_LULLABY'
}

export enum NewPublicationTypes {
  Publication = 'PUBLICATION',
  Spaces = 'SPACES'
}
export enum SpacesEvents {
  APP_INITIALIZED = 'app:initialized',
  APP_MIC_ON = 'app:mic-on',
  APP_MIC_OFF = 'app:mic-off',
  ROOM_DATA_RECEIVED = 'room:data-received',
  ROOM_PEER_JOINED = 'room:peer-joined',
  ROOM_ME_LEFT = 'room:me-left',
  ROOM_ME_ROLE_UPDATE = 'room:me-role-update'
}
