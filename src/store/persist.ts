import { BoardType, QueuedCommentType, QueuedPublicationType } from '@/utils/custom-types2'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CustomNotificationsFilterEnum } from '@/utils/custom-types'

type Tokens = {
  accessToken: string | null
  refreshToken: string | null
}

interface AppPerisistState {
  accessToken: Tokens['accessToken']
  refreshToken: Tokens['refreshToken']
  currentProfileId: string | null
  sidebarCollapsed: boolean
  latestNotificationId: string
  notificationCount: number;
  selectedNotificationsFilter: CustomNotificationsFilterEnum
  setLatestNotificationId: (id: string) => void
  setNotificationCount: (notificationCount: number) => void;
  queuedComments: QueuedCommentType[]
  queuedPublications: QueuedPublicationType[]
  currentBoard: BoardType[] | string
  setCurrentBoard: (currentBoard: BoardType[] | string) => void
  setQueuedComments: (queuedComments: QueuedCommentType[]) => void
  setQueuedPublications: (queuedPublications: QueuedPublicationType[]) => void
  setCurrentProfileId: (currentProfileId: string | null) => void
  signIn: (tokens: { accessToken: string; refreshToken: string }) => void
  signOut: () => void
  hydrateAuthTokens: () => Tokens
  setSelectedNotificationsFilter: (
    filter: CustomNotificationsFilterEnum
  ) => void
}

export const usePersistStore = create(
  persist<AppPerisistState>(
    (set, get) => ({
      accessToken: null,
      latestNotificationId: '',
      refreshToken: null,
      currentProfileId: null,
      sidebarCollapsed: true,
      notificationCount: 0,
      setNotificationCount: (notificationCount) => set(() => ({ notificationCount })),
      queuedComments: [],
      queuedPublications: [],
      currentBoard: [],
      setLatestNotificationId: (latestNotificationId) =>set({ latestNotificationId }),
      selectedNotificationsFilter: CustomNotificationsFilterEnum.HIGH_SIGNAL,
      setSelectedNotificationsFilter: (selectedNotificationsFilter) =>
      set({ selectedNotificationsFilter }),
      setCurrentBoard: (currentBoard) => set({ currentBoard }),
      setQueuedComments: (queuedComments) => set({ queuedComments }),
      setQueuedPublications: (queuedPublications) => set({ queuedPublications }),
      setCurrentProfileId: (currentProfileId) => set({ currentProfileId }),
      signIn: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      signOut: () => localStorage.removeItem('lensshare.store'),
      hydrateAuthTokens: () => {
        return {
          accessToken: get().accessToken,
          refreshToken: get().refreshToken
        }
      }
    }),
    {
      name: 'lensshare.store'
    }
  )
)

export default usePersistStore

export const signIn = (tokens: { accessToken: string; refreshToken: string }) => usePersistStore.getState().signIn(tokens)
export const signOut = () => usePersistStore.getState().signOut()
export const hydrateAuthTokens = () => usePersistStore.getState().hydrateAuthTokens()