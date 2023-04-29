import { useAppStore } from "@/store/app";
import type { FC } from "react";
import LoginWallet from "./LoginWallet";

const ButtonTest: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile)
  return (
    <>
        <div className="px-6 py-3 h-12 border-solid inline-flex justify-center 
      items-center rounded-full text-[#000000] font-bold w-[284px] drop-shadow-lg 
      bg-blue-500 border-grey-300 border-2 cursor-pointer mt-3 hover:text-white
       hover:bg-[#57B8FF]">
      {currentProfile ? (
          <div className="flex justify-center">{currentProfile.handle}</div>
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
