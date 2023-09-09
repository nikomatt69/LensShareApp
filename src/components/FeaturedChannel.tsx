
import getChannelByTag from '@/lib/getChannelByTag';
import { MetadataOutput } from '@/utils/lens/generated5';
import type { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { useRouter } from 'next/router';
import { COMMUNITIES_WORKER_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Community } from '@/types/communities';
import { Channel } from '@/types/lenster';
interface FeaturedChannelProps {

  className?: string;

  
  community:Channel
}

const FeaturedChannel: FC<FeaturedChannelProps> = ({

  className = ''
}) => {
  const {
    query: { slug }
  } = useRouter();
  

  const fetchCommunity = async () => {
    try {
      const response = await axios(
        `${COMMUNITIES_WORKER_URL}/getCommunityBySlug/${slug}`
      );

      return response.data;
    } catch (error) {
      return [];
    }
  };

  const { data, isLoading, error } = useQuery(['community', slug], () =>
    fetchCommunity().then((res) => res)
  );

  
  const community: Channel = data;

  return (
    <Link
      href={`/c/${community.slug}`}
      className={clsx(
        'flex items-center space-x-2 text-xs hover:underline',
        className
      )}
      onClick={(e) => stopEventPropagation(e)}
    >
      <img src={community.avatar} className="h-4 w-4 rounded" />
      <div className="font-bold">{community.name}</div>
    </Link>
  );
};

export default FeaturedChannel;
