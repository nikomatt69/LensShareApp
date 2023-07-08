
import { Tooltip } from '@/components/UI/Tooltip';
import { FeatureFlag } from '@/utils/data/feature-flags';
import isFeatureEnabled from '@/utils/functions/isFeatureEnabled';

import { motion } from 'framer-motion';
import type { FC } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { usePublicationStore } from 'src/store/publication4';

const PollSettings: FC = () => {
  const showPollEditor = usePublicationStore((state) => state.showPollEditor);
  const setShowPollEditor = usePublicationStore(
    (state) => state.setShowPollEditor
  );
  const resetPollConfig = usePublicationStore((state) => state.resetPollConfig);
  const isPollsEnabled = isFeatureEnabled(FeatureFlag.Polls);

  if (!isPollsEnabled) {
    return null;
  }

  return (
    <Tooltip placement="top" content={`Poll`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={() => {
          resetPollConfig();
          setShowPollEditor(!showPollEditor);
        }}
        aria-label="Poll"
      >
        <BiMenuAltRight className="text-brand h-5 w-5" />
      </motion.button>
    </Tooltip>
  );
};

export default PollSettings;
