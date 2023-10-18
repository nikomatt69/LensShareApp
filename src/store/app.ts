import { Localstorage } from '@/storage';
import { Channel } from '@/types/lenster';
import { Profile } from '@/utils/lens/generatedLenster';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  profiles: Profile[] | [];
  setProfiles: (profiles: Profile[]) => void;
  currentProfile: Profile | null;
  setCurrentProfile: (currentProfile: Profile | null) => void;
  isMute: boolean;
  setMute: (isOn: boolean) => void;
  featuredChannels: Channel[];
  setFeaturedChannels: (featuredChannels: Channel[]) => void;
  verifiedMembers: string[];
  setVerifiedMembers: (verifiedMembers: string[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  profiles: [],
  setProfiles: (profiles) => set(() => ({ profiles })),
  currentProfile: null,
  setCurrentProfile: (currentProfile) => set(() => ({ currentProfile })),
  isMute: true,
  setMute: (isMute: boolean) => set({ isMute }),
  verifiedMembers: [],
  setVerifiedMembers: (verifiedMembers) => set(() => ({ verifiedMembers })),
  featuredChannels: [],
  setFeaturedChannels: (featuredChannels) => set(() => ({ featuredChannels }))
}));

interface AppPersistState {
  profileId: string | null;
  setProfileId: (profileId: string | null) => void;
  staffMode: boolean;
  setStaffMode: (staffMode: boolean) => void;
  modMode: boolean;
  setModMode: (modMode: boolean) => void;
}

export const useAppPersistStore = create(
  persist<AppPersistState>(
    (set) => ({
      profileId: null,
      setProfileId: (profileId) => set(() => ({ profileId })),
      staffMode: false,
      setStaffMode: (staffMode) => set(() => ({ staffMode })),
      modMode: false,
      setModMode: (modMode) => set(() => ({ modMode }))
    }),
    { name: Localstorage.LensshareStore }
  )
);

export const featuredChannels = () => useAppStore.getState().featuredChannels;
export const verifiedMembers = () => useAppStore.getState().verifiedMembers;
