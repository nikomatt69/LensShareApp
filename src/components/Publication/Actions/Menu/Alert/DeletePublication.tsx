
import { Alert } from '@/components/UI/Alert';
import { publicationKeyFields } from '@/utils/functions/publicationKeyFields';
import { useHidePublicationMutation } from '@/utils/lens/generatedLenster';

import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useGlobalAlertStateStore } from 'src/store/alerts';


const DeletePublication: FC = () => {
  const showPublicationDeleteAlert = useGlobalAlertStateStore(
    (state) => state.showPublicationDeleteAlert
  );
  const setShowPublicationDeleteAlert = useGlobalAlertStateStore(
    (state) => state.setShowPublicationDeleteAlert
  );
  const deletingPublication = useGlobalAlertStateStore(
    (state) => state.deletingPublication
  );

  const [hidePost, { loading }] = useHidePublicationMutation({
    onCompleted: () => {
      setShowPublicationDeleteAlert(false, null);
      
      toast.success(`Publication deleted successfully`);
    },
    update: (cache) => {
      cache.evict({ id: publicationKeyFields(deletingPublication) });
    }
  });

  return (
    <Alert
      title={`Delete Publication?`}
      description={`Delete`}
      confirmText={`Delete`}
      show={showPublicationDeleteAlert}
      isDestructive
      isPerformingAction={loading}
      onConfirm={() =>
        hidePost({
          variables: { request: { publicationId: deletingPublication?.id } }
        })
      }
      onClose={() => setShowPublicationDeleteAlert(false, null)}
    />
  );
};

export default DeletePublication;
