import NewPublication from '@/components/Composer/NewPublication';

import type { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';
import { Modal } from '../UI/Modal';

const GlobalModals: FC = () => {
  // Report modal state
  const showReportModal = useGlobalModalStateStore(
    (state) => state.showReportModal
  );
  const reportingPublication = useGlobalModalStateStore(
    (state) => state.reportingPublication
  );
  const setShowReportModal = useGlobalModalStateStore(
    (state) => state.setShowReportModal
  );
  const showStatusModal = useGlobalModalStateStore(
    (state) => state.showStatusModal
  );
  const setShowStatusModal = useGlobalModalStateStore(
    (state) => state.setShowStatusModal
  );
  const showProfileSwitchModal = useGlobalModalStateStore(
    (state) => state.showProfileSwitchModal
  );
  const setShowProfileSwitchModal = useGlobalModalStateStore(
    (state) => state.setShowProfileSwitchModal
  );
  const showNewPostModal = useGlobalModalStateStore(
    (state) => state.showNewPostModal
  );
  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
  );
  const showAuthModal = useGlobalModalStateStore(
    (state) => state.showAuthModal
  );
  const setShowAuthModal = useGlobalModalStateStore(
    (state) => state.setShowAuthModal
  );

  return (
    <>
      <Modal
        title={`Create post`}
        show={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
      >
        <NewPublication />
      </Modal>
    </>
  );
};

export default GlobalModals;
