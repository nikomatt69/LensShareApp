import { QueuedVideoType } from '@/custom-types';
import { QueuedCommentType } from '@/custom-types';
import { Localstorage } from '@/storage';
import { CustomNotificationsFilterEnum } from '@/utils/custom-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

interface AppPerisistState {
  accessToken: Tokens['accessToken'];
  refreshToken: Tokens['refreshToken'];
  currentProfileId: string | null;
  sidebarCollapsed: boolean;
  latestNotificationId: string;
  selectedNotificationsFilter: CustomNotificationsFilterEnum;
  highSignalNotificationFilter: boolean;
  setHighSignalNotificationFilter: (
    highSignalNotificationFilter: boolean
  ) => void;
  queuedVideos: QueuedVideoType[];
  queuedComments: QueuedCommentType[];
  setLatestNotificationId: (id: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCurrentProfileId: (id: string | null) => void;
  setQueuedComments: (queuedComments: QueuedCommentType[]) => void;
  setQueuedVideos: (queuedVideos: QueuedVideoType[]) => void;
  signIn: (tokens: { accessToken: string; refreshToken: string }) => void;
  signOut: () => void;
  hydrateAuthTokens: () => Tokens;
  setSelectedNotificationsFilter: (
    filter: CustomNotificationsFilterEnum
  ) => void;
}

export const usePersistStore = create(
  persist<AppPerisistState>(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      currentProfileId: null,
      sidebarCollapsed: true,
      latestNotificationId: '',
      queuedComments: [],
      queuedVideos: [],
      highSignalNotificationFilter: false,
     setHighSignalNotificationFilter: (highSignalNotificationFilter) =>
     set(() => ({ highSignalNotificationFilter })),
      setQueuedVideos: (queuedVideos) => set({ queuedVideos }),
      setQueuedComments: (queuedComments) => set({ queuedComments }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setLatestNotificationId: (latestNotificationId) =>
        set({ latestNotificationId }),
      selectedNotificationsFilter: CustomNotificationsFilterEnum.HIGH_SIGNAL,
      setSelectedNotificationsFilter: (selectedNotificationsFilter) =>
        set({ selectedNotificationsFilter }),
      setCurrentProfileId: (id) => set({ currentProfileId: id }),
      signIn: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      signOut: () => localStorage.removeItem(Localstorage.LensshareStore),
      hydrateAuthTokens: () => {
        return {
          accessToken: get().accessToken,
          refreshToken: get().refreshToken
        };
      }
    }),
    {
      name: Localstorage.LensshareStore
    }
  )
);

export default usePersistStore;

export const signIn = (tokens: { accessToken: string; refreshToken: string }) =>
  usePersistStore.getState().signIn(tokens);
export const signOut = () => usePersistStore.getState().signOut();
export const hydrateAuthTokens = () =>
  usePersistStore.getState().hydrateAuthTokens();
