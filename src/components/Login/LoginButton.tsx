import { useAppStore } from '@/store/app';
import type { FC } from 'react';
import LoginWallet from './LoginWallet';
import MainButton from '../Buttons/Rainbow/mainbutton';

const LoginButton: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <>
      <div
        className="text-md border-grey-400 mt-3 w-full  cursor-pointer rounded-full  border-2 bg-black px-6 py-3
       font-semibold text-blue-700 outline-none hover:bg-blue-500 hover:text-white"
      >
        {currentProfile ? (
          <div className="flex justify-center"><MainButton/></div>
        ) : (
          <LoginWallet />
        )}
      </div>
    </>
  );
};

export default LoginButton;
