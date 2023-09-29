import { Image } from '../UI/Image';
import { FC, useState } from 'react';

import Stories from 'react-insta-stories';
import { Modal } from '../UI/Modal';
import { XCircleIcon } from '@heroicons/react/24/outline';
import {
  FeedEventItemType,
  Profile,
  Publication,
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedLazyQuery,
  usePublicationLazyQuery
} from '@/utils/lens/generatedLenster';
import { APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID } from '@/constants';
import { useAppStore } from '@/store/app';
import { Story } from 'react-insta-stories/dist/interfaces';
import sanitizeIpfsUrl from '@/utils/functions/sanitizeDStorageUrl';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import { LightBox } from '../UI/LightBox';
import ByteVideo from './ByteVideo';
import router from 'next/router';
import FullScreenModal from '../UI/FullScreenModal';
import { Card } from '../UI/Card';

interface Props {
  profile: Profile;
  video: Publication;
}

const ProfileImage: FC<Props> = ({ profile, video }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [currentViewingId, setCurrentViewingId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const profilePic = currentProfile?.picture;
  const request = {
    feedEventItemTypes: [FeedEventItemType.Post],
    limit: 5,
    sortCriteria: PublicationSortCriteria.Latest,
    noRandomize: false,
    sources: [APP_ID, LENSTUBE_BYTES_APP_ID],

    metadata: {
      mainContentFocus: [PublicationMainFocus.Video]
    }
  };
  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
    usePublicationLazyQuery();
  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useExploreFeedLazyQuery({
      variables: {
        request,
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
        profileId: currentProfile?.id ?? null
      },
      onCompleted: ({ explorePublications }) => {
        const items = explorePublications?.items as Publication[];
        const publicationId = router.query.id;
        if (!publicationId) {
          const nextUrl = `${location.origin}/bytes/${items[0]?.id}`;
          history.pushState({ path: nextUrl }, '', nextUrl);
        }
      }
    });

  const bytes = data?.explorePublications?.items as Publication[];

  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="mr-6 h-auto w-1/3 md:mr-8">
      <div
        className="h-20 w-20 md:mx-auto md:h-40 md:w-40"
        onClick={() => setShowModal(!showModal)}
      >
        <Image
          src={getAvatar(profile)}
          className="rounded-xl"
          alt={formatHandle(profile?.handle)}
          data-testid="profile-avatar"
        />
      </div>

      <Modal show={showModal}>
        {/* <div>Stories</div> */}
        <div className="z-[99] cursor-pointer rounded-lg">
          <Card>
            {bytes?.map(
              (video: Publication, index) =>
                singleByte?.publication?.id !== video.id && (
                  <ByteVideo
                    video={video}
                    currentViewingId={currentViewingId}
                    intersectionCallback={(id) => setCurrentViewingId(id)}
                    key={`${video?.id}_${index}`}
                  />
                )
            )}

            <div className="absolute right-2 top-2">
              <button
                type="button"
                onClick={() => setShowModal(!showModal)}
                className="text-white"
              >
                <XCircleIcon />
              </button>
            </div>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImage;
