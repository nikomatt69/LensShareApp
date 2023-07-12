import type { FC } from 'react';
import { useState } from 'react';

import Followers from './Followers';
import Following from './Following';
import { Profile } from '@/utils/lens/generatedLenster';
import humanize from '@/lib/humanize';
import { Modal } from '../Modal';
import { UsersIcon } from '@heroicons/react/24/outline';

interface FolloweringsProps {
  profile: Profile;
}

const Followerings: FC<FolloweringsProps> = ({ profile }) => {
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  return (
    <div className="flex gap-8">
      <button
        type="button"
        className="text-left"
        onClick={() => {
          setShowFollowingModal(!showFollowingModal);
        }}
        data-testid="profile-followings"
      >
        <div className="text-xl">
          {humanize(profile?.stats?.totalFollowing)}
        </div>
        <div className="lt-text-gray-500"></div>
      </button>
      <button
        type="button"
        className="text-left"
        onClick={() => {
          setShowFollowersModal(!showFollowersModal);
        }}
        data-testid="profile-followers"
      >
        <div className="text-xl">
          {humanize(profile?.stats?.totalFollowers)}
        </div>
        <div className="lt-text-gray-500"></div>
      </button>
      <Modal
        title={`Following`}
        icon={<UsersIcon className="text-brand h-5 w-5" />}
        show={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
      >
        <Following profile={profile} />
      </Modal>
      <Modal
        title={`Followers`}
        icon={<UsersIcon className="text-brand h-5 w-5" />}
        show={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
      >
        <Followers profile={profile} />
      </Modal>
    </div>
  );
};

export default Followerings;
