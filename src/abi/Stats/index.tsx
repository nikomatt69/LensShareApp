import { APP_ID } from '@/constants';

import type {
  GlobalProtocolStats,
  ProfileStats,
  Publication
} from '@/utils/lens/generatedLenster';

import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { BsPin, BsPinAngle } from 'react-icons/bs';
import { HiHeart, HiOutlineChatAlt2 } from 'react-icons/hi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { RiArrowLeftRightFill, RiShoppingBag3Fill } from 'react-icons/ri';
import useIsMounted from '@/utils/hooks/useIsMounted';
import { useAppStore } from '@/store/app';
import MetaTags from '@/components/UI/MetaTags';
import Loader from '@/components/UI/Loader';
import { useProfileQuery } from '@/utils/lens/generatedLenster';

interface Props {
  icon: React.ReactNode;
  count: number;
  text: string;
  publications: any;
  data: ProfileStats;
  profileId: string;
  revenue: number;
}

const StatCard = dynamic(() => import('./StatCard'));

const Stats: FC<Props> = () => {
  const { mounted } = useIsMounted();
  const currentProfile = useAppStore((state) => state.currentProfile);

  const { data, loading } = useProfileQuery({
    variables: {
      request: {
        profileId: currentProfile?.id
      }
    }
  });

  const stats = data as ProfileStats;

  return (
    <>
      <MetaTags title="LensShare Stats" />
      {loading && !mounted ? (
        <Loader />
      ) : (
        <>
          <div className="mx-auto max-w-5xl p-3 px-4 md:px-0">
            <div className="mb-7 flex items-center justify-center p-3">
              <h1 className="brandGradientText relative pb-4 text-sm font-black uppercase tracking-widest">
                <span>LensShare Stats</span>
                <span className="absolute bottom-0 left-0 right-0 mx-auto h-1 w-1/2 bg-gradient-to-r from-blue-500 to-[#070000] p-2" />
              </h1>
            </div>
            <div className="center-items grid grid-cols-2 justify-center gap-4 object-center p-3 text-xs md:grid-cols-2 lg:grid-cols-5">
              <StatCard
                icon={<BsPin size={20} />}
                count={currentProfile?.id.stats?.postsTotal}
                text="Total Posts"
              />
              <StatCard
                icon={<HiOutlineChatAlt2 size={20} />}
                count={currentProfile?.id.stats?.commentsTotal}
                text="Total Comments"
              />
              <StatCard
                icon={<RiArrowLeftRightFill size={20} />}
                count={currentProfile?.id.stats?.mirrorsTotal}
                text="Total Mirrors"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Stats;
