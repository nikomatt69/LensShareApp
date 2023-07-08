import { Tooltip } from '@/components/UI/Tooltip';
import { FeatureFlag } from '@/utils/data/feature-flags';
import isFeatureEnabled from '@/utils/functions/isFeatureEnabled';
import { MicrophoneIcon } from '@heroicons/react/24/outline';



import { motion } from 'framer-motion';
import type { FC } from 'react';
import { usePublicationStore } from 'src/store/publication4';

const SpaceSettings: FC = () => {
  const showSpaceEditor = usePublicationStore((state) => state.showSpaceEditor);
  const setShowSpaceEditor = usePublicationStore(
    (state) => state.setShowSpaceEditor
  );
  const isSpacesEnabled = isFeatureEnabled(FeatureFlag.Spaces);

  if (!isSpacesEnabled) {
    return null;
  }

  return (
    <Tooltip placement="top" content={`Space`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={() => {
          setShowSpaceEditor(!showSpaceEditor);
        }}
        aria-label="Space"
      >
        <MicrophoneIcon className="text-brand h-5 w-5" />
      </motion.button>
    </Tooltip>
  );
};

export default SpaceSettings;
