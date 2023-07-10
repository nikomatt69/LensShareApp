
import type { FC } from 'react';
import { useAppStore } from 'src/store/app';
import UserProfile from '../ProfilePage/UserProfile';
import { Profile } from '@/utils/lens/generatedLenster';
import { BookmarkIcon, ChartPieIcon, FingerPrintIcon, ShareIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline';
import { BsDatabaseFill, BsExclamation } from 'react-icons/bs';
import Sidebar from '../UI/Sidebar';
import Navbar from '../Navbar';
import BottomNav from '../Navs/BottomNav';

const SettingsSidebar: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    
  
    <div className="mb-4 space-y-1.5 px-3 sm:px-0">
       <div>
    <Navbar/>
    </div>
      <div className="pb-3">
        <UserProfile
          profile={currentProfile as Profile}
          showUserPreview={false}
        />
      </div>
      <Sidebar
        items={[
          {
            title: `Profile`,
            icon: <UserIcon className="h-4 w-4" />,
            url: '/settings'
          },
          {
            title: `Account`,
            icon: <ChartPieIcon className="h-4 w-4" />,
            url: '/settings/account'
          },
          {
            title: `Interests`,
            icon: <BookmarkIcon className="h-4 w-4" />,
            url: '/settings/interests'
          },
          {
            title: `Dispatcher`,
            icon: <FingerPrintIcon className="h-4 w-4" />,
            url: '/settings/dispatcher'
          },
          {
            title: `Allowance`,
            icon: <ShareIcon className="h-4 w-4" />,
            url: '/settings/allowance'
          },
          {
            title: `Cleanup`,
            icon: <SparklesIcon className="h-4 w-4" />,
            url: '/settings/cleanup'
          },
          {
            title: `Export`,
            icon: <BsDatabaseFill className="h-4 w-4" />,
            url: '/settings/export'
          },
          {
            title: (
              <div className="text-red-500">
                Danger Zone
              </div>
            ),
            icon: <BsExclamation className="h-4 w-4 text-red-500" />,
            url: '/settings/delete'
          }
        ]}
      />
       <div>
      <BottomNav/>
    </div>
    </div>
   
  );
};

export default SettingsSidebar;
