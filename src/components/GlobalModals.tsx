import NewPublication from '@/components/Composer/NewPublication';
import ReportPublication from '@/components/ReportPublication';
import { PublicationTypes } from '@/utils/lens/generatedLenster';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

import { t } from '@lingui/macro';
import type { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';
import { Modal } from './UI/Modal';



const GlobalModals: FC = () => {
  // Report modal state
  const {

    reportingPublication,

    showStatusModal,
    setShowStatusModal,
    showProfileSwitchModal,
    setShowProfileSwitchModal,
    showNewModal,
    showAuthModal,
    setShowNewModal,
    setShowAuthModal,
    setShowNewSpacesModal
 
  } = useGlobalModalStateStore();

  return (
    <>
     
      <Modal
        title={`Create post`}
        size="md"
        show={showNewModal}
        onClose={() => {
          setShowNewModal(false, PublicationTypes.Post);
        }}
      >
        <NewPublication />
      </Modal>
     
    </>
  );
};

export default GlobalModals;