import { lensshareMembers } from "./pinsta-members";




export enum FeatureFlag {
  TrendingWidget = 'trending-widget',
  NftGallery = 'nft-gallery',
  NftDetail = 'nft-detail',
  GatedLocales = 'gated-locales',
  Polls = 'polls',
  Spaces = 'spaces',
  ForYou = 'for-you',
  WTF2 = 'wtf2',
  ExploreTags = 'explore-tags',
  POST_WITH_SOURCE_URL = "POST_WITH_SOURCE_URL"
}

export const featureFlags = [
  {
    key: FeatureFlag.TrendingWidget,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.NftGallery,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.NftDetail,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.GatedLocales,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.Polls,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.Spaces,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.ForYou,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.WTF2,
    enabledFor: [...lensshareMembers]
  },
  {
    key: FeatureFlag.ExploreTags,
    enabledFor: [...lensshareMembers]
  }
];
