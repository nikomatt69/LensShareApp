import { Publication, PublicationTypes } from '@/utils/lens/generatedLenster';
import { create } from 'zustand';

interface GlobalModalState {
  showAuthModal: boolean;
  setShowAuthModal: (showAuthModal: boolean) => void;
  showNewModal: boolean;
  showNewPostModal: boolean;
  setShowNewPostModal: (showNewPostModal: boolean) => void;
  modalPublicationType: PublicationTypes;
  setShowNewModal: (
    showNewModal: boolean,
    modalPublicationType: PublicationTypes
  ) => void;
  showReportModal: boolean;
  reportingPublication: Publication | null;
  reportConfig: any;
  setShowReportModal: (
    showReportModal: boolean,
    reportingPublication: Publication | null,
    reportConfig?: any
  ) => void;
  showStatusModal: boolean;
  setShowStatusModal: (showStatusModal: boolean) => void;
  showProfileSwitchModal: boolean;
  setShowProfileSwitchModal: (showProfileSwitchModal: boolean) => void;
  showMobileDrawer: boolean;
  setShowMobileDrawer: (showMobileDrawer: boolean) => void;
  showNewSpacesModal: boolean;
  setShowNewSpacesModal: (showNewSpacesModal: boolean) => void;

}

export const useGlobalModalStateStore = create<GlobalModalState>((set) => ({
  showAuthModal: false,
  showNewPostModal: false,
  setShowNewPostModal: (showNewPostModal) => set(() => ({ showNewPostModal })),
  setShowAuthModal: (showAuthModal) => set(() => ({ showAuthModal })),
  showNewModal: false,
  modalPublicationType: PublicationTypes.Post,
  setShowNewModal: (showNewModal, modalPublicationType) =>
    set(() => ({ showNewModal, modalPublicationType })),
  showReportModal: false,
  reportingPublication: null,
  reportConfig: null,
  setShowReportModal: (showReportModal, reportingPublication, reportConfig) =>
    set(() => ({ showReportModal, reportingPublication, reportConfig })),
  showStatusModal: false,
  setShowStatusModal: (showStatusModal) => set(() => ({ showStatusModal })),
  showProfileSwitchModal: false,
  setShowProfileSwitchModal: (showProfileSwitchModal) =>
    set(() => ({ showProfileSwitchModal })),
  showMobileDrawer: false,
  setShowMobileDrawer: (showMobileDrawer) => set(() => ({ showMobileDrawer })),
  showNewSpacesModal: false,
  setShowNewSpacesModal: (showNewSpacesModal) =>
    set(() => ({ showNewSpacesModal }))
}));
