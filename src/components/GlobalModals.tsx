import NewPublication from '@/components/Composer/NewPublication';
import ReportPublication from '@/components/ReportPublication';
import { PublicationTypes } from '@/utils/lens/generatedLenster';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';
import { Modal } from './UI/Modal';
import { usePublicationStore } from '@/store/publication4';
import { NewPublicationTypes } from '@/enums';



const GlobalModals: FC = () => {
  // Report modal state
  const {
    showPublicationReportModal,
    reportingPublication,
    setShowPublicationReportModal,
    showStatusModal,
    setShowStatusModal,
    showProfileSwitchModal,
    setShowProfileSwitchModal,
    showComposerModal,
    setShowComposerModal,
    showAuthModal,
    setShowAuthModal,
    showWrongNetworkModal,
    setShowWrongNetworkModal,
    showInvitesModal,
    setShowInvitesModal,
    showReportProfileModal,
    reportingProfile,
    setShowReportProfileModal,
    setShowDiscardModal
  } = useGlobalModalStateStore();

  const {
    publicationContent,
    attachments,
    isUploading,
    videoDurationInSeconds,
    videoThumbnail,
    audioPublication,
    quotedPublication,
    showPollEditor,
    pollConfig
  } = usePublicationStore();

  const checkIfPublicationNotDrafted = () => {
    if (
      publicationContent === '' &&
      quotedPublication === null &&
      attachments.length === 0 &&
      audioPublication.title === '' &&
      videoThumbnail.url === '' &&
      videoDurationInSeconds === '' &&
      !showPollEditor &&
      !isUploading &&
      pollConfig.choices[0] === ''
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      
    
      <Modal
        title={`Create post`}
        size="md"
        show={showComposerModal}
        onClose={() => {
          if (checkIfPublicationNotDrafted()) {
            setShowComposerModal(false, NewPublicationTypes.Publication);
          } else {
            setShowDiscardModal(true);
          }
        }}
      >
        <NewPublication />
      </Modal>
    
    </>
  );
};

export default GlobalModals;
