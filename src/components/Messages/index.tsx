import MetaTags from '@/components/UI/MetaTags';
import { APP_NAME } from '@/constants';

import type { NextPage } from 'next';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';


import PreviewList from './PreviewList';
import { GridItemEight, GridLayout } from '../UI/GridLayout';
import { Card } from '../UI/Card';
import Navbar from '../Navbar';
import BottomNav from '../Navs/BottomNav';

const NoConversationSelected = () => {
  return (
    <div className="flex h-full flex-col text-center">
      <div className="m-auto">
        <span className="text-center text-5xl">👋</span>
        <h3 className="mb-2 mt-3 text-lg">
          Select a conversation
        </h3>
        <p className="text-md lt-text-gray-500 max-w-xs">
          
            Choose an existing conversation or create a new one to start
            messaging
          
        </p>
      </div>
    </div>
  );
};

const Messages: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  if (!currentProfile) {
    return <Custom404 />;
  }

  return (
     <div className="flex-col"> 
    <Navbar/>
    <GridLayout classNameChild="md:gap-8">
      <MetaTags title={`Messages • ${APP_NAME}`} />
      
      <PreviewList />
    
      <GridItemEight className=" xs:mx-2 mb-0 sm:mx-2   md:col-span-8 md:hidden md:h-[80vh] lg:block xl:h-[84vh]">
     
      </GridItemEight>
    </GridLayout>
    <BottomNav/>
     </div>
  );
};

export default Messages;
