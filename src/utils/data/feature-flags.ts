import { lensshareMembers } from './pinsta-members';
import {mainnetVerified} from './verified'

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
  POST_WITH_SOURCE_URL = 'POST_WITH_SOURCE_URL'
}

export const featureFlags = [
  {
    key: FeatureFlag.TrendingWidget,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.NftGallery,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.NftDetail,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.GatedLocales,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.Polls,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.Spaces,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.ForYou,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.WTF2,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  },
  {
    key: FeatureFlag.ExploreTags,
    enabledFor: [...lensshareMembers,...mainnetVerified]
  }
];
