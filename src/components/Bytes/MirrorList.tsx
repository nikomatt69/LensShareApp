import { Image } from '@/components/UI/Image';
import React, { FC } from 'react';
import Loader from '../UI/Loader';
import getAvatar from '@/lib/getAvatar';
import { GoVerified } from 'react-icons/go';
import InfiniteLoader from '../UI/InfiniteLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import formatHandle from '@/utils/functions/formatHandle';
import Link from 'next/link';
import { usePublicationQuery } from '@/types/graph';
import { Profile, useProfilesQuery } from '@/utils/lens/generatedLenster';
import { useInView } from 'react-cool-inview';
import { useAllProfilesQuery } from '@/utils/lens/generated';

interface Props {
  publicationId: string;
  publication: any;
}

const MirroredList: FC<Props> = ({ publicationId }) => {
  const request = { whoMirroredPublicationId: publicationId, limit: 30 };

  const { data, loading, fetchMore } = useAllProfilesQuery({
    variables: {
      request
    },
    skip: !publicationId
  });

  const mirroredByProfiles = data?.profiles?.items as Profile[];
  const pageInfo = data?.profiles?.pageInfo;

  const { observe } = useInView({
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      });
    }
  });
  const loadMore = async () => {
    await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next } }
    });
  };

  if (loading) {
    return <Loader message="Loading collectors" />;
  }

  return (
    <div
      className="display:absolute max-h-[80vh] overflow-auto  overflow-y-auto"
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={mirroredByProfiles?.length ?? 0}
        scrollThreshold={0.5}
        hasMore={!!pageInfo?.next}
        next={loadMore}
        loader={<InfiniteLoader />}
        scrollableTarget="scrollableDiv"
      >
        <div className="divide-y">
          {mirroredByProfiles?.map((profile: Profile) => (
            <Link href={`/u/${profile.ownedBy?.id}`} key={profile.ownedBy}>
              <div className="p-5" key={profile.ownedBy}>
                {profile?.ownedBy ? (
                  <div className="flex cursor-pointer  items-center gap-3 rounded p-2 font-semibold">
                    <div>
                      <Image
                        width={40}
                        height={40}
                        className="cursor-pointer rounded-full"
                        src={getAvatar(profile.ownedBy)}
                        alt={profile.ownedBy?.handle}
                      />
                    </div>
                    <div>
                      <p className="text-md flex items-center gap-1 font-bold lowercase text-primary">
                        {profile.ownedBy.name}
                      </p>
                      <p className="text-xs capitalize text-gray-400">
                        {formatHandle(profile?.ownedBy.handle)} {''}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MirroredList;
