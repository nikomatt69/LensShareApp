import nFormatter from '@/lib/nFormatter';
import { Publication } from '@/utils/lens/generatedLenster';
import { HeartIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';
import { useState } from 'react';
import { Modal } from '../UI/Modal';
import Collectors from '../ProfilePage/Collectors';
import MirroredList from '../Bytes/MirrorList';

import { MdCollections } from 'react-icons/md';
import Like from './Actions/Like';
import MirrorOutline from '../UI/Icons/MirrorOutline';
import Mirrores from '../ProfilePage/ Mirrores';
import LikeList from '../Bytes/LikeList';
import Likes from './Actions/Likes';
import Mirrors from './Actions/Mirrors';

interface PublicationStatsProps {
  publication: Publication;
}

const PublicationStats: FC<PublicationStatsProps> = ({ publication }) => {
  const [showMirrorsModal, setShowMirrorsModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCollectorsModal, setShowCollectorsModal] = useState(false);

  const isMirror = publication.__typename === 'Mirror';
  const commentsCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfComments
    : publication?.stats?.totalAmountOfComments
  const mirrorCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;
  const reactionCount = isMirror
    ? publication?.mirrorOf?.stats?.totalUpvotes
    : publication?.stats?.totalUpvotes;
  const collectCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfCollects
    : publication?.stats?.totalAmountOfCollects;

  const publicationId = isMirror ? publication?.mirrorOf?.id : publication?.id;

  return (
    <div className="lt-text-gray-500 flex flex-wrap items-center gap-6 py-3 text-sm sm:gap-8">
      {mirrorCount > 0 && (
        <>
          <span data-testid="comment-stats">
            <b className="text-black dark:text-blue-700">
              {nFormatter(commentsCount)}
            </b>{' '}
          </span>
          <button
            type="button"
            onClick={() => {
              setShowMirrorsModal(true);
            }}
            data-testid="mirror-stats"
          >
            <b className="text-emerald-500  dark:text-emerald-500">
              {nFormatter(mirrorCount)}
            </b>{' '}
          </button>
          <Modal
            title={`Mirrored by`}
            icon={<MirrorOutline className="text-brand h-5 w-5" />}
            show={showMirrorsModal}
            onClose={() => setShowMirrorsModal(false)}
          >
            <Mirrors publicationId={publicationId} />
          </Modal>
        </>
      )}
      {reactionCount > 0 && (
        <>
          <button
            type="button"
            onClick={() => {
              setShowLikesModal(true);
            }}
            data-testid="like-stats"
          >
            <b className="text-red-700  dark:text-red-700">
              {nFormatter(reactionCount)}
            </b>{' '}
          </button>
          <Modal
            title={`Liked by`}
            icon={<HeartIcon className="text-red-700 h-5 w-5" />}
            show={showLikesModal}
            onClose={() => setShowLikesModal(false)}
          >
            <Likes publicationId={publicationId}  />
          </Modal>
        </>
      )}
      {collectCount > 0 && (
        <>
          <button
            type="button"
            onClick={() => {
              setShowCollectorsModal(true);
            }}
            data-testid="collect-stats"
          >
            <b className="text-red-500  dark:text-red-500">
              {nFormatter(collectCount)}
            </b>{' '}
          </button>
          <Modal
            title={`Collected by`}
            icon={<MdCollections className="text-brand h-5 w-5" />}
            show={showCollectorsModal}
            onClose={() => setShowCollectorsModal(false)}
          >
            <Collectors publicationId={publicationId} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default PublicationStats;
