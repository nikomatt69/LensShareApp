import { useAppStore } from '@/store/app';
import type { FC } from 'react';
import { IoIosContact } from 'react-icons/io';
import LoginWalletMobile from './LoginWalletMobile';

const LoginButton: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <>
      <div className="">
        <button className="text-md flex items-center gap-2 border-2 border-[#57B8FF] px-2 py-2 font-semibold text-blue-700 md:px-4">
          <LoginWalletMobile />
          <IoIosContact className="text-xl" />{' '}
        </button>
      </div>
    </>
  );
};

export default LoginButton;
