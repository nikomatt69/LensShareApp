import { useAppStore } from "@/store/app";
import type { FC } from "react";
import LoginWallet from "./LoginWallet";

const LoginButton: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile)
  return (
    <>
      <div className="cursor-pointer bg-blue-500 text-md text-[#000000]  border-grey-400 border-2  font-semibold px-6 py-3 rounded-full
       outline-none w-full mt-3 hover:text-white hover:bg-blue-500">
      {currentProfile ? (
          <div className="flex justify-center">{currentProfile.handle}</div>
        ) : (
          <LoginWallet />
        )}
      </div>
    </>
  );
};

export default LoginButton;
