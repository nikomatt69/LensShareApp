import { WMATIC_TOKEN_ADDRESS } from '@/constants';
import { Community } from '@/types/communities';
import { NewLensshareAttachment } from '@/types/misc';
import { CREATOR_VIDEO_CATEGORIES } from '@/utils/data/categories';
import { Publication } from '@/utils/lens/generatedLenster';
import { create } from 'zustand';

interface PublicationState {
  publicationContent: string;
  setPublicationContent: (publicationContent: string) => void;
  quotedPublication: Publication | null;
  setQuotedPublication: (quotedPublication: Publication | null) => void;
  audioPublication: {
    title: string;
    author: string;
    cover: string;
    coverMimeType: string;
  };
  setAudioPublication: (audioPublication: {
    title: string;
    author: string;
    cover: string;
    coverMimeType: string;
  }) => void;
  attachments: NewLensshareAttachment[];
  setAttachments: (attachments: NewLensshareAttachment[]) => void;
  addAttachments: (attachments: NewLensshareAttachment[]) => void;
  updateAttachments: (attachments: NewLensshareAttachment[]) => void;
  removeAttachments: (ids: string[]) => void;
  videoThumbnail: {
    url?: string;
    type?: string;
    uploading?: boolean;
  };
  setVideoThumbnail: (videoThumbnail: {
    url?: string;
    type?: string;
    uploading?: boolean;
  }) => void;
  videoDurationInSeconds: string;
  setVideoDurationInSeconds: (videoDurationInSeconds: string) => void;
  isUploading: boolean;
  isByte: boolean;
  setIsUploading: (isUploading: boolean) => void;
  showPollEditor: boolean;
  setShowPollEditor: (showPollEditor: boolean) => void;
  pollConfig: {
    length: number;
    choices: string[];
  };
  setPollConfig: (pollConfig: { length: number; choices: string[] }) => void;
  resetPollConfig: () => void;
  showSpaceEditor: boolean;
  setShowSpaceEditor: (showSpaceEditor: boolean) => void;
  showLiveVideoEditor: boolean;
  setShowLiveVideoEditor: (showLiveVideoEditor: boolean) => void;
  liveVideoConfig: {
    id: string;
    streamKey: string;
    playbackId: string;
  };
  setLiveVideoConfig: (liveVideoConfig: {
    id: string;
    streamKey: string;
    playbackId: string;
  }) => void;
  resetLiveVideoConfig: () => void;
}

export const usePublicationStore = create<PublicationState>((set) => ({
  publicationContent: '',
  setPublicationContent: (publicationContent) =>
    set(() => ({ publicationContent })),
  quotedPublication: null,
  setQuotedPublication: (quotedPublication) =>
    set(() => ({ quotedPublication })),
  audioPublication: {
    title: '',
    author: '',
    cover: '',
    coverMimeType: 'image/jpeg'
  },
  setAudioPublication: (audioPublication) => set(() => ({ audioPublication })),
  attachments: [],
  setAttachments: (attachments) => set(() => ({ attachments })),
  addAttachments: (newAttachments) =>
    set((state) => {
      return { attachments: [...state.attachments, ...newAttachments] };
    }),
  updateAttachments: (updateAttachments) =>
    set((state) => {
      const attachments = [...state.attachments];
      updateAttachments.map((attachment) => {
        const index = attachments.findIndex((a) => a.id === attachment.id);
        if (index !== -1) {
          attachments[index] = attachment;
        }
      });
      return { attachments };
    }),
  removeAttachments: (ids) =>
    set((state) => {
      const attachments = [...state.attachments];
      ids.map((id) => {
        const index = attachments.findIndex((a) => a.id === id);
        if (index !== -1) {
          attachments.splice(index, 1);
        }
      });
      return { attachments };
    }),
  videoThumbnail: { url: '', type: '', uploading: false },
  setVideoThumbnail: (videoThumbnail) => set(() => ({ videoThumbnail })),
  videoDurationInSeconds: '',
  setVideoDurationInSeconds: (videoDurationInSeconds) =>
    set(() => ({ videoDurationInSeconds })),
  isUploading: false,
  isByte: false,
  setIsUploading: (isUploading) => set(() => ({ isUploading })),
  showPollEditor: false,
  setShowPollEditor: (showPollEditor) => set(() => ({ showPollEditor })),
  pollConfig: { length: 7, choices: ['', ''] },
  setPollConfig: (pollConfig) => set(() => ({ pollConfig })),
  resetPollConfig: () =>
    set(() => ({ pollConfig: { length: 1, choices: ['', ''] } })),
  showSpaceEditor: false,
  setShowSpaceEditor: (showSpaceEditor) => set(() => ({ showSpaceEditor })),
  showLiveVideoEditor: false,
  setShowLiveVideoEditor: (showLiveVideoEditor) =>
    set(() => ({ showLiveVideoEditor })),
  liveVideoConfig: { id: '', streamKey: '', playbackId: '' },
  setLiveVideoConfig: (liveVideoConfig) => set(() => ({ liveVideoConfig })),
  resetLiveVideoConfig: () =>
    set(() => ({ liveVideoConfig: { id: '', streamKey: '', playbackId: '' } }))
}));
