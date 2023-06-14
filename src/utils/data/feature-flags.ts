import { IS_MAINNET } from '@/constants'

export enum FEATURE_FLAGS {
  POST_WITH_SOURCE_URL = 'PostWithSource',
}
export enum FeatureFlags {
  TrendingWidget = 'trending-widget',
  NftGallery = 'nft-gallery',
  NftDetail = 'nft-detail',
  GatedLocales = 'gated-locales',
  Polls = 'polls',
  Spaces = 'spaces'
}

type FeatureFlag = {
  flag: string
  enabledFor: string[]
}

export const featureFlags: FeatureFlag[] = [
  {
    flag: FEATURE_FLAGS.POST_WITH_SOURCE_URL,
    enabledFor: IS_MAINNET ? ['0x27d4'] : []
  }
]
