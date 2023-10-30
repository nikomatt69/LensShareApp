
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';
import { useState } from 'react';
import Filter from './Filter';
import { Modal } from '../UI/Modal';
import { Tooltip } from '../UI/Tooltip';

const Settings: FC = () => {
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);

  return (
    <>
      <button
        className="mx-3 rounded-md p-1 hover:bg-gray-300/20 sm:mx-0"
        onClick={() => setShowNotificationSettings(true)}
      >
        <Tooltip placement="top" content="Notification settings">
          <Cog6ToothIcon className="lt-text-gray-500 h-5 w-5" />
        </Tooltip>
      </button>
      <Modal
        title="Notification settings"
        icon={<BellIcon className="text-brand h-5 w-5" />}
        show={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      >
        <div className="p-5">
          <Filter />
        </div>
      </Modal>
    </>
  );
};

export default Settings;
