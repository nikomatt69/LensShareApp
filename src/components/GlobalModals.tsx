import NewPublication from '@/components/Composer/NewPublication';

import type { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';
import { Modal } from './UI/Modal';

const GlobalModals: FC = () => {
  // Report modal state

  const showNewPostModal = useGlobalModalStateStore(
    (state) => state.showNewPostModal
  );
  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
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
