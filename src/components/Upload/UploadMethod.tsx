import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React, { useEffect } from 'react';

import BundlrInfo from './BundlrInfo';
import { useAppStore } from '@/store/app';
import { canUploadedToIpfs } from './canUploadedToIpfs';
import { Tab } from '@headlessui/react';

import { IPFS_FREE_UPLOAD_LIMIT } from '@/constants';
import Tooltip from './Tooltip';

const UploadMethod = () => {
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo);

  const isUnderFreeLimit = canUploadedToIpfs(uploadedVideo.file?.size);

  const onClickArweave = () => {
    setUploadedVideo({ isUploadToIpfs: false });
  };

  useEffect(() => {
    if (isUnderFreeLimit && !uploadedVideo.isUploadToIpfs) {
      setUploadedVideo({ isUploadToIpfs: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Group
      as="div"
      className="mt-4"
      defaultIndex={isUnderFreeLimit ? 1 : 0}
    >
      <Tab.List className="flex space-x-1 rounded-lg bg-gray-200 p-1 dark:bg-gray-800">
        <Tab
          className={({ selected }) =>
            clsx(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none',
              selected ? 'dark:bg-theme bg-white' : 'hover:bg-white/[0.12]'
            )
          }
          onClick={onClickArweave}
        >
          Upload to Arweave
        </Tab>
        <Tab
          className={({ selected }) =>
            clsx(
              'w-full rounded-lg text-sm font-medium leading-5 focus:outline-none disabled:opacity-30',
              selected
                ? 'dark:bg-theme bg-white'
                : 'enabled:hover:bg-white/[0.12]'
            )
          }
          onClick={() => setUploadedVideo({ isUploadToIpfs: true })}
          disabled={!isUnderFreeLimit}
        >
          <Tooltip
            visible={!isUnderFreeLimit}
            content={`Video size under ${IPFS_FREE_UPLOAD_LIMIT}mb can be uploaded to IPFS for free`}
            placement="top-end"
          >
            <div className="py-2.5">Upload to IPFS</div>
          </Tooltip>
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="focus:outline-none">
          {!uploadedVideo.isUploadToIpfs && <BundlrInfo />}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default UploadMethod;
