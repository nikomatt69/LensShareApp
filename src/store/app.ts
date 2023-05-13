import { WebBundlr } from "@bundlr-network/client";
import { Profile, ReferenceModules } from "@/types/lens";
import { BundlrDataState, UploadedVideo } from "@/types/app";
import type { FetchSignerResult } from "@wagmi/core";
import create from "zustand";
import { persist } from "zustand/middleware";
import {
  LS_KEYS,
  WMATIC_TOKEN_ADDRESS,
  BUNDLR_NODE_URL,
  BUNDLR_CURRENCY,
  INFURA_RPC,
} from "@/constants";

export const UPLOADED_VIDEO_FORM_DEFAULTS = {
  stream: null,
  preview: "",
  videoType: "",
  file: null,
  title: "",
  description: "",
  category: "",
  thumbnail: "",
  thumbnailType: "",
  videoSource: "",
  percent: 0,
  playbackId: "",
  isSensitiveContent: false,
  isuploadIpfs: false,
  isUploadToAr: false,
  isIndexed: false,
  loading: false,
  uploadingThumbnail: false,
  buttonText: "Post Video",
  durationInSeconds: null,
  /* videoCategory: CREATOR_VIDEO_CATEGORIES[0], */
  collectModule: {
    followerOnlyCollect: false,
    amount: { currency: WMATIC_TOKEN_ADDRESS, value: "" },
    referralFee: 0,
    isTimedFeeCollect: false,
    isFreeCollect: true,
    isFeeCollect: false,
    isRevertCollect: false,
  },
  referenceModule: {
    followerOnlyReferenceModule: false,
    degreesOfSeparationReferenceModule: null,
  },
};

export const UPLOADED_VIDEO_BUNDLR_DEFAULTS = {
  balance: "0",
  estimatedPrice: "0",
  deposit: null,
  instance: null,
  depositing: false,
  showDeposit: false,
};

interface AppState {
  showCreateBoard: boolean;
  setShowCreateBoard: (showCreateBoard: boolean) => void
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
  getBundlrInstance: (signer: FetchSignerResult) => Promise<WebBundlr | null>;
  hasNewNotification: boolean
  setHasNewNotification: (value: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  showCreateBoard: false,
  hasNewNotification: false,
  setHasNewNotification: (b) => set({ hasNewNotification: b }),
  setShowCreateBoard: (showCreateBoard) => set({ showCreateBoard }),
  uploadedVideo: UPLOADED_VIDEO_FORM_DEFAULTS,
  setUploadedVideo: (videoData) =>
    set((state) => ({
      uploadedVideo: { ...state.uploadedVideo, ...videoData },
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
      const bundlr = new WebBundlr(
        BUNDLR_NODE_URL,
        BUNDLR_CURRENCY,
        signer?.provider,
        {
          providerUrl: INFURA_RPC,
        }
      );
      await bundlr.utils.getBundlerAddress(BUNDLR_CURRENCY);
      await bundlr.ready();
      return bundlr;
    } catch (error) {
      console.log("[Error Init Bundlr]", error);
      set((state) => ({
        uploadedVideo: { ...state.uploadedVideo, loading: false },
      }));
      return null;
    }
  },
}));

interface AppPersistState {
  profileId: string | null;
  setProfileId: (profileId: string | null) => void;
}

export const useAppPersistStore = create(
  persist<AppPersistState>(
    (set) => ({
      profileId: null,
      setProfileId: (profileId) => set(() => ({ profileId })),
    }),
    { name: "lensshare.store" }
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
    set(() => ({ degreesOfSeparation })),
}));

interface TransactionPersistState {
  txnQueue: any[];
  setTxnQueue: (txnQueue: any[]) => void;
}

export const useTransactionPersistStore = create(
  persist<TransactionPersistState>(
    (set) => ({
      txnQueue: [],
      setTxnQueue: (txnQueue) => set(() => ({ txnQueue })),
    }),
    { name: LS_KEYS.TRANSACTION_STORE }
  )
);
