import { WebBundlr } from '@bundlr-network/client';
import { Profile, ReferenceModules } from '@/utils/lens/generatedLenster';
import { BundlrDataState, UploadedVideo } from '@/custom-types';

import create from 'zustand';
import { persist } from 'zustand/middleware';
import {
  WMATIC_TOKEN_ADDRESS,
  BUNDLR_NODE_URL,
  BUNDLR_CURRENCY,
  INFURA_RPC
} from '@/constants';
import { Localstorage } from '@/storage';
import { logger } from '@/utils/functions/logger';
import { CREATOR_VIDEO_CATEGORIES } from '@/utils/data/categories';

export const UPLOADED_VIDEO_FORM_DEFAULTS = {
  stream: null,
  preview: '',
  videoType: '',
  file: null,
  title: '',
  description: '',
  thumbnail: '',
  thumbnailType: '',
  videoSource: '',
  percent: 0,
  playbackId: '',
  isSensitiveContent: false,
  isUploadToIpfs: false,
  loading: false,
  uploadingThumbnail: false,
  buttonText: 'Post Video',
  durationInSeconds: null,
  videoCategory: CREATOR_VIDEO_CATEGORIES[0],
  collectModule: {
    type: 'revertCollectModule',
    followerOnlyCollect: false,
    amount: { currency: WMATIC_TOKEN_ADDRESS, value: '' },
    referralFee: 0,
    isTimedFeeCollect: false,
    isFreeCollect: false,
    isFeeCollect: false,
    isRevertCollect: true
  },
  referenceModule: {
    followerOnlyReferenceModule: false,
    degreesOfSeparationReferenceModule: null
  },

  isByteVideo: true
};

export const UPLOADED_VIDEO_BUNDLR_DEFAULTS = {
  balance: '0',
  estimatedPrice: '0',
  deposit: null,
  instance: null,
  depositing: false,
  showDeposit: false
};
interface AppState {
  currentviewingId: string | null;
  videoWatchTime: number;
  showCreateBoard: boolean;
  setShowCreateBoard: (showCreateBoard: boolean) => void;
  uploadedVideo: UploadedVideo;
  setUploadedVideo: (video: { [k: string]: any }) => void;
  bundlrData: BundlrDataState;
  setBundlrData: (bundlrData: { [k: string]: any }) => void;
  profiles: Profile[] | [];
  setProfiles: (profiles: Profile[]) => void;
  currentProfile: Profile | null;
  setCurrentProfile: (currentProfile: Profile | null) => void;
  userSigNonce: number;
  setUserSigNonce: (userSigNonce: number) => void;
  getBundlrInstance: (signer: {
    signMessage: (message: string) => Promise<string>;
  }) => Promise<WebBundlr | null>;
  hasNewNotification: boolean;
  setHasNewNotification: (value: boolean) => void;
  activeTagFilter: string;
  setActiveTagFilter: (activeTagFilter: string) => void;
  setCurrentviewingId: (id: string) => void;
  setVideoWatchTime: (videoWatchTime: number) => void;
  isMute: boolean;
  setMute: (isOn: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  videoWatchTime: 0,
  isMute: true,
  setMute: (isMute: boolean) => set({ isMute }),
  currentviewingId: null,
  showCreateBoard: false,
  activeTagFilter: 'all',
  hasNewNotification: false,
  setVideoWatchTime: (videoWatchTime) => set({ videoWatchTime }),
  setActiveTagFilter: (activeTagFilter) => set({ activeTagFilter }),
  setCurrentviewingId: (id) => set({ currentviewingId: id }),
  setHasNewNotification: (b) => set({ hasNewNotification: b }),
  setShowCreateBoard: (showCreateBoard) => set({ showCreateBoard }),
  uploadedVideo: UPLOADED_VIDEO_FORM_DEFAULTS,
  setUploadedVideo: (videoData) =>
    set((state) => ({
      uploadedVideo: { ...state.uploadedVideo, ...videoData }
    })),
  bundlrData: UPLOADED_VIDEO_BUNDLR_DEFAULTS,
  setBundlrData: (bundlrData) =>
    set((state) => ({ bundlrData: { ...state.bundlrData, ...bundlrData } })),
  profiles: [],
  setProfiles: (profiles) => set(() => ({ profiles })),
  currentProfile: null,
  setCurrentProfile: (currentProfile) => set(() => ({ currentProfile })),
  userSigNonce: 0,
  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce })),
  getBundlrInstance: async (signer) => {
    try {
      const bundlr = new WebBundlr(BUNDLR_NODE_URL, BUNDLR_CURRENCY, signer);
      bundlr.utils.getBundlerAddress(BUNDLR_CURRENCY);
      bundlr.ready();
      return bundlr;
    } catch (error) {
      logger.error('[Error Init Bundlr]', error);
      return null;
    }
  }
}));

interface AppPersistState {
  profileId: string | null;
  setProfileId: (profileId: string | null) => void;
  
}



export const useAppPersistStore = create(
  persist<AppPersistState>(
    (set) => ({
      profileId: null,
      setProfileId: (profileId) => set(() => ({ profileId }))
    }),
    { name: Localstorage.LensshareStore }
  )
);

interface ReferenceModuleState {
  selectedReferenceModule: ReferenceModules;
  setSelectedReferenceModule: (selectedModule: ReferenceModules) => void;
  onlyFollowers: boolean;
  setOnlyFollowers: (onlyFollowers: boolean) => void;
  degreesOfSeparation: number;
  setDegreesOfSeparation: (degreesOfSeparation: number) => void;
}

export const useReferenceModuleStore = create<ReferenceModuleState>((set) => ({
  selectedReferenceModule: ReferenceModules.DegreesOfSeparationReferenceModule,
  setSelectedReferenceModule: (selectedReferenceModule) =>
    set(() => ({ selectedReferenceModule })),
  onlyFollowers: false,
  setOnlyFollowers: (onlyFollowers) => set(() => ({ onlyFollowers })),
  degreesOfSeparation: 2,
  setDegreesOfSeparation: (degreesOfSeparation) =>
    set(() => ({ degreesOfSeparation }))
}));

interface TransactionPersistState {
  txnQueue: any[];
  setTxnQueue: (txnQueue: any[]) => void;
}

export const useTransactionPersistStore = create(
  persist<TransactionPersistState>(
    (set) => ({
      txnQueue: [],
      setTxnQueue: (txnQueue) => set(() => ({ txnQueue }))
    }),
    { name: Localstorage.TransactionStore }
  )
);
