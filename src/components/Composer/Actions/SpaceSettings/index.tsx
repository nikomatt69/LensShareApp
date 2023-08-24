
import { Input } from '@/components/UI/Input';
import MenuTransition from '@/components/UI/MenuTransition';

import { Toggle } from '@/components/UI/Toggle';
import { useSpacesStore } from '@/store/spaces';
import { Menu } from '@headlessui/react';

import { CheckCircleIcon, CheckIcon, ChevronDownIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import React, { useState } from 'react';


import TokenGateForm from './TokenGateForm';
import { Modal } from '@/components/UI/Modal';
import { Tooltip } from '@/components/UI/Tooltip';
import { motion } from 'framer-motion';

interface SpaceSettingsProps {
  children?: ReactNode;
}

const SpaceSettings: FC<SpaceSettingsProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const { isRecordingOn, setIsRecordingOn } = useSpacesStore();

  return (
    <div>
      <div className="block items-center pt-3 sm:flex">
        <div className="flex flex-[0_0_1] gap-2 space-x-1">
          <div>
            <Toggle
              on={isRecordingOn}
              setOn={() => setIsRecordingOn(!isRecordingOn)}
            />
          </div>
          <div className="flex flex-col items-start text-sm text-neutral-400 dark:text-neutral-500">
            Record Spaces
          </div>
          <Tooltip placement="top" content="Token Gate Spaces">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setShowModal(!showModal)}
              aria-label="Token Gate Spaces"
            >
              <LockClosedIcon className="text-brand h-5 w-5" />
            </motion.button>
          </Tooltip>
          <Modal
            title={`Token Gate Spaces`}
            icon={<LockClosedIcon className="text-brand h-5 w-5" />}
            show={showModal}
            onClose={() => {
              setShowModal(false);
            }}
          >
            <TokenGateForm setShowModal={setShowModal} />
          </Modal>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SpaceSettings;