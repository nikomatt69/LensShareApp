import React, { useEffect, useState } from 'react';
import type { FC } from 'react'
import { FolderPlusIcon } from '@heroicons/react/24/solid';
import { CollectModules, Publication } from '@/utils/lens/generatedLenster';
import CollectModule from './CollectModule';
import { Modal } from '../../UI/Modal';
import { getModule } from '@/lib/getModule';
import GetModuleIcon from '@/utils/GetModuleIcon';
import { useAppStore } from '@/store/app';
import FullScreenModal from '@/components/UI/FullScreenModal';
import CollectOutline from './CollectOutline';


//should also add authorisation so user cant like posttwice

interface Props {
  publication: Publication
  
  
}

const CollectButton: FC<Props> = ({publication}) => {
  const [alreadyCollected, setAlreadyCollected] = useState(false);
  const [count, setCount] = useState(publication?.stats?.totalAmountOfCollects);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const isFreeCollect = publication?.collectModule.__typename === 'FreeCollectModuleSettings';
  const isUnknownCollect = publication?.collectModule.__typename === 'UnknownCollectModuleSettings';
  const currentProfile = useAppStore((state) => state.currentProfile);


  useEffect(() => {
    if (publication?.hasCollectedByMe === true) {
      setAlreadyCollected(true)
    } else {
      setAlreadyCollected(false)
    }
    if (!currentProfile) {
      setAlreadyCollected(false)
    }
  }, [publication?.hasCollectedByMe])

    return (
      <div className="flex block gap-6">
      <div className="md:mt-4 flex flex-col justify-center items-center cursor-pointer">
      {alreadyCollected ? (
       <div 
       onClick={() =>{setShowCollectModal(true)}} 
       className="flex items-center drop-shadow-lg  rounded-full cursor-pointer  md:bg-gray-200 bg-gray-600/50 dark:bg-gray-600/50 p-2 ">
       <CollectOutline className="w-3 md:h-3 text-blue-700 font-bold"  />
       </div>
      ) : (
        <div 
        onClick={() => {setShowCollectModal(true)}} 
        className="flex items-center drop-shadow-lg  rounded-full cursor-pointer  md:bg-gray-200 bg-gray-600/50 dark:bg-gray-600/50 p-2 ">
         <CollectOutline className='w-3 h-3 cursor-pointer font-bold'  />
         <span className="hidden md:block pointer-events-none absolute -bottom-7 left-7 w-max 
         shadow px-2 py-1 text-xs text-blue-700 opacity-0 group-hover:opacity-100"> Collect </span>
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
                module={isFreeCollect ? CollectModules.FreeCollectModule : publication?.collectModule?.type}
                size={5}
              />
            </div>
          }
          show={showCollectModal}
          onClose={() => setShowCollectModal(false)}
      >
        <CollectModule 
          
          publication={ publication as Publication }
          setCount={setCount}
          count={count} 
        />
      </Modal>
     
        <p className="text-xs hidden lg:[pb-2] font-semibold text-gray-400"></p>
        </div>
        </div>
    );
}

export default CollectButton; 