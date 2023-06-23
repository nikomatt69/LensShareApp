
import { MAINNET_DEFAULT_TOKEN, WMATIC_TOKEN_ADDRESS } from 'src/constants';
import { CreatePin, NewLensshareAttachment } from '@/utils/custom-types2';
import { CREATOR_CATEGORIES } from 'src/utils/data/categories';
import { create } from 'zustand';

export const UPLOADED_FORM_DEFAULTS = {
    title: '',
    description: '',
    board: {id: '', name: '', slug: '', pfp: '', description: '', user_id: '', cover: '', is_private: false, category: '', tags: [], created_at: new Date(), updated_at: new Date()},
    isSensitiveContent: false,
    buttonText: 'Create',
    category: CREATOR_CATEGORIES[0],
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
    isNSFW: false,
    isNSFWThumbnail: false,
}

interface PublicationState {
    attachments: NewLensshareAttachment[];
    setAttachments: (attachments: NewLensshareAttachment[]) => void;
    addAttachments: (attachments: NewLensshareAttachment[]) => void;
    updateAttachments: (attachments: NewLensshareAttachment[]) => void;
    removeAttachments: (ids: string[]) => void;
    isUploading: boolean;
    setIsUploading: (isUploading: boolean) => void;
    publicationContent: string;
    setPublicationContent: (publicationContent: string) => void;
    buttonText: string;
    createPin: CreatePin;
    setCreatePin: (publication: { [k: string]: any }) => void;
}

export const usePublicationStore = create<PublicationState>((set) => ({
    createPin: UPLOADED_FORM_DEFAULTS,
    buttonText: 'Create Pin',
    setCreatePin: (pinData) =>
        set((state) => ({
            createPin: { ...state.createPin, ...pinData }
        })),
    attachments: [],
    publicationContent: '',
    setPublicationContent: (publicationContent) => set(() => ({ publicationContent })),
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
    isUploading: false,
    setIsUploading: (isUploading) => set(() => ({ isUploading }))
}));