
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

const SpaceSettings: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tooltip placement="top" content={`Token Gate Spaces`}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setShowModal(!showModal)}
          aria-label={`Token Gate Spaces`}
        >
          <LockClosedIcon className="text-brand h-5 w-5" />
        </motion.button>
      </Tooltip>
      <Modal
        title={`Token Gate Spaces`}
        icon={<LockClosedIcon className="text-brand h-5 w-5" />}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <TokenGateForm setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default SpaceSettings;
