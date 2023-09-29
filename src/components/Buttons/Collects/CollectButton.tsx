//should also add authorisation so user cant like posttwice

import { useAppStore } from '@/store/app';
import { CollectModules, Publication } from '@/utils/lens/generatedLenster';
import { FC, useEffect, useState } from 'react';
import CollectOutline from './CollectOutline';
import { Modal } from '@/components/UI/Modal';
import { getModule } from '@/lib/getModule';
import GetModuleIcon from '@/components/UI/GetModuleIcon';
import CollectModule from '@/components/Publication/Actions/Collect/CollectModule';

interface Props {
  publication: Publication;
}

const CollectButton: FC<Props> = ({ publication }) => {
  const [alreadyCollected, setAlreadyCollected] = useState(false);
  const [count, setCount] = useState(publication?.stats?.totalAmountOfCollects);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const isFreeCollect =
    publication?.collectModule.__typename === 'FreeCollectModuleSettings';
  const isUnknownCollect =
    publication?.collectModule.__typename === 'UnknownCollectModuleSettings';
  const currentProfile = useAppStore((state) => state.currentProfile);

  useEffect(() => {
    if (publication?.hasCollectedByMe === true) {
      setAlreadyCollected(true);
    } else {
      setAlreadyCollected(false);
    }
    if (!currentProfile) {
      setAlreadyCollected(false);
    }
  }, [publication?.hasCollectedByMe]);

  return (
    <div className="block flex gap-6">
      <div className="flex cursor-pointer flex-col items-center justify-center md:mt-4">
        {alreadyCollected ? (
          <div
            onClick={() => {
              setShowCollectModal(true);
            }}
            className="flex cursor-pointer items-center  rounded-full bg-gray-600/50  p-2 drop-shadow-lg dark:bg-gray-600/50 md:bg-gray-200 "
          >
            <CollectOutline className="w-3 font-bold text-blue-700 md:h-3" />
          </div>
        ) : (
          <div
            onClick={() => {
              setShowCollectModal(true);
            }}
            className="flex cursor-pointer items-center  rounded-full bg-gray-600/50  p-2 drop-shadow-lg dark:bg-gray-600/50 md:bg-gray-200 "
          >
            <CollectOutline className="h-3 w-3 cursor-pointer font-bold" />
            <span
              className="pointer-events-none absolute -bottom-7 left-7 hidden w-max px-2 
         py-1 text-xs text-blue-700 opacity-0 shadow group-hover:opacity-100 md:block"
            >
              {' '}
              Collect{' '}
            </span>
          </div>
        )}

        <Modal
          title={
            isFreeCollect
              ? 'Free Collect'
              : isUnknownCollect
              ? 'Unknown Collect'
              : getModule(publication?.collectModule?.type).name
          }
          icon={
            <div className="text-[#57B8FF]">
              <GetModuleIcon
                module={
                  isFreeCollect
                    ? CollectModules.FreeCollectModule
                    : publication?.collectModule?.type
                }
                size={5}
              />
            </div>
          }
          show={showCollectModal}
          onClose={() => setShowCollectModal(false)}
        >
          <CollectModule
            publication={publication as Publication}
            setCount={setCount}
            count={count}
          />
        </Modal>

        <p className="lg:[pb-2] hidden text-xs font-semibold text-gray-400"></p>
      </div>
    </div>
  );
};

export default CollectButton;
