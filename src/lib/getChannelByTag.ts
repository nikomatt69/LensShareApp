import { featuredChannels } from '@/store/app';
import { Community } from '@/types/communities';
import { Channel } from '@/types/lenster';

const getChannelByTag = (tags: string[]): Channel | undefined => {
  for (const tag of tags) {
    const channel = featuredChannels().find(
      (channel) => channel.tags?.includes(tag)
    );
    if (channel) {
      return;
    }
  }

  return undefined;
};

export default getChannelByTag;
