import { Tooltip } from '@/components/UI/Tooltip';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { FC } from 'react';

import { usePublicationStore } from '@/store/publication4';

const SpaceSettings: FC = () => {
  const showPollEditor = usePublicationStore((state) => state.showPollEditor);
  const setShowPollEditor = usePublicationStore(
    (state) => state.setShowPollEditor
  );

  return (
    <Tooltip placement="top" content={`Space`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={() => {
          setShowPollEditor(!showPollEditor);
        }}
        aria-label="Space"
      >
        <MicrophoneIcon className="text-brand h-5 w-5" />
      </motion.button>
    </Tooltip>
  );
};

export default SpaceSettings;
