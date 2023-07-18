import { useAppStore } from '@/store/app';
import type { FC } from 'react';
import LoginWallet from './LoginWallet';
import MainButton from '../Buttons/Rainbow/mainbutton';

const ButtonTest: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <>
      <div
        className="border-grey-300 mt-3 inline-flex h-12 w-[284px] cursor-pointer 
      items-center justify-center rounded-full border-2 border-solid bg-[#000fff]
      px-6 py-3 font-bold text-[#000000] drop-shadow-lg hover:bg-blue-500
       hover:text-white"
      >
        {currentProfile ? (
          <div className="flex justify-center">{<MainButton/>}</div>
        ) : (
          <LoginWallet />
        )}
      </div>
      {/* <div className="px-7 py-3 bordeh-12 r-solid border gap-2.5 inline-flex justify-center 
      items-center rounded-lg text-black text-left font-bold w-[284px] drop-shadow-lg 
      bg-gradient-to-r from-[rgba(155,251,0,1)] to-[rgba(220,255,146,1)]
       border-[rgba(190,_253,_103,_1.22)] font-['Inter']">
       </div> */}
    </>
  );
};

export default ButtonTest;
