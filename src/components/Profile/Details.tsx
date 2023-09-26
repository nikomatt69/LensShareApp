import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import type { Dispatch, FC, ReactNode } from 'react';
import { useState } from 'react';
import { MessageTabs } from 'src/enums';
import { useAppStore } from 'src/store/app';
import type { TabValues } from 'src/store/message';
import { useMessageStore } from 'src/store/message';

import Followerings from './Followerings';

import { Profile } from '@/utils/lens/generatedLenster';
import { useMessageDb } from '@/lib/useMessageDb';
import { buildConversationKey } from '@/lib/conversationKey';
import buildConversationId from '@/utils/functions/buildConversationId';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import { LightBox } from '../UI/LightBox';
import sanitizeDisplayName from '@/utils/sanitizeDisplayName';
import Slug from '../UI/Slug';
import formatAddress from '@/lib/formatAddress';
import Markup from '../UI/Markup';
import { Button } from '../UI/Button';
import {
  CogIcon,
  HashtagIcon,
  MapIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import Unfollow from './Unfollow';
import Message from './Message';
import Follow from './Follow';
import { Modal } from '../Modal';
import { Tooltip } from '../UI/Tooltip';
import { RARIBLE_URL, STATIC_IMAGES_URL } from '@/constants';
import getProfileAttribute from '@/lib/getProfileAttribute';
import { Image } from '../UI/Image';
import Sidebar from '../Sidebar/Sidebar';

interface DetailsProps {
  profile: Profile;
  following: boolean;
  setFollowing: Dispatch<boolean>;
}

const Details: FC<DetailsProps> = ({ profile, following, setFollowing }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [showMutualFollowersModal, setShowMutualFollowersModal] =
    useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const { persistProfile } = useMessageDb();
  const setSelectedTab = useMessageStore((state) => state.setSelectedTab);

  const onMessageClick = () => {
    if (!currentProfile) {
      return;
    }
    const conversationId = buildConversationId(currentProfile.id, profile.id);
    const conversationKey = buildConversationKey(
      profile.ownedBy,
      conversationId
    );
    persistProfile(conversationKey, profile);
    const selectedTab: TabValues = profile.isFollowedByMe
      ? MessageTabs.Lens
      : MessageTabs.Requests;
    setSelectedTab(selectedTab);
    router.push(`/messages/${conversationKey}`);
  };

  const MetaDetails = ({
    children,
    icon,
    dataTestId = ''
  }: {
    children: ReactNode;
    icon: ReactNode;
    dataTestId?: string;
  }) => (
    <div className="flex items-center gap-2" data-testid={dataTestId}>
      {icon}
      <div className="text-md truncate">{children}</div>
    </div>
  );

  const followType = profile?.followModule?.__typename;

  return (
    <div className="mb-4 space-y-5 px-5 sm:px-0">
      <div className="relative -mt-24 h-32 w-32 sm:-mt-32 sm:h-52 sm:w-52">
        <Image
          onClick={() => setExpandedImage(getAvatar(profile))}
          src={getAvatar(profile)}
          className="h-32 w-32 cursor-pointer rounded-xl bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-52 sm:w-52"
          height={128}
          width={128}
          alt={formatHandle(profile?.handle)}
          data-testid="profile-avatar"
        />
        <LightBox
          show={Boolean(expandedImage)}
          url={expandedImage}
          onClose={() => setExpandedImage(null)}
        />
      </div>
      <div className="space-y-1 py-2">
        <div className="flex items-center gap-1.5 text-2xl font-bold">
          <div className="truncate" data-testid="profile-name">
            {sanitizeDisplayName(profile?.name) ??
              formatHandle(profile?.handle)}
          </div>
        </div>
        <div
          className="flex items-center space-x-3"
          data-testid="profile-handle"
        >
          {profile?.name ? (
            <Slug
              className="text-sm sm:text-base"
              slug={formatHandle(profile?.handle)}
              prefix="@"
            />
          ) : (
            <Slug
              className="text-sm sm:text-base"
              slug={formatAddress(profile?.ownedBy)}
            />
          )}
          {currentProfile &&
            currentProfile?.id !== profile?.id &&
            profile?.isFollowing && (
              <div className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
                Follows you
              </div>
            )}
        </div>
      </div>
      {profile?.bio && (
        <div
          className="markup linkify text-md mr-0 break-words sm:mr-10"
          data-testid="profile-bio"
        >
          <Markup>{profile?.bio}</Markup>
        </div>
      )}
      <div className="space-y-5">
        <Followerings profile={profile} />
        <div>
          {currentProfile?.id === profile?.id ? (
            <Link href="/settings">
              <Button
                variant="secondary"
                icon={<CogIcon className="h-5 w-5" />}
                outline
              >
                Edit Profile
              </Button>
            </Link>
          ) : followType !== 'RevertFollowModuleSettings' ? (
            following ? (
              <div className="flex space-x-2">
                <Unfollow
                  profile={profile}
                  setFollowing={setFollowing}
                  showText
                />

                {currentProfile && <Message onClick={onMessageClick} />}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Follow
                  profile={profile}
                  setFollowing={setFollowing}
                  showText
                />
                {currentProfile && <Message onClick={onMessageClick} />}
              </div>
            )
          ) : null}
        </div>

        <div className="divider w-full" />
        <div className="space-y-2">
          {getProfileAttribute(profile?.attributes, 'location') && (
            <MetaDetails
              icon={<MapIcon className="h-4 w-4" />}
              dataTestId="profile-meta-location"
            >
              {getProfileAttribute(profile?.attributes, 'location')}
            </MetaDetails>
          )}
          {profile?.onChainIdentity?.ens?.name && (
            <MetaDetails
              icon={
                <img
                  src={`${STATIC_IMAGES_URL}/brands/ens.svg`}
                  className="h-4 w-4"
                  height={16}
                  width={16}
                  alt="ENS Logo"
                />
              }
              dataTestId="profile-meta-ens"
            >
              {profile?.onChainIdentity?.ens?.name}
            </MetaDetails>
          )}
          {getProfileAttribute(profile?.attributes, 'website') && (
            <MetaDetails
              icon={
                <img
                  src={`https://www.google.com/s2/favicons?domain=${getProfileAttribute(
                    profile?.attributes,
                    'website'
                  )
                    ?.replace('https://', '')
                    .replace('http://', '')}`}
                  className="h-4 w-4 rounded-full"
                  height={16}
                  width={16}
                  alt="Website"
                />
              }
              dataTestId="profile-meta-website"
            >
              <Link
                href={`https://${getProfileAttribute(
                  profile?.attributes,
                  'website'
                )
                  ?.replace('https://', '')
                  .replace('http://', '')}`}
                target="_blank"
                rel="noreferrer noopener me"
              >
                {getProfileAttribute(profile?.attributes, 'website')
                  ?.replace('https://', '')
                  .replace('http://', '')}
              </Link>
            </MetaDetails>
          )}
          {getProfileAttribute(profile?.attributes, 'x') && (
            <MetaDetails
              icon={
                resolvedTheme === 'dark' ? (
                  <img
                    src={`${STATIC_IMAGES_URL}/brands/twitter-light.svg`}
                    className="h-4 w-4"
                    height={16}
                    width={16}
                    alt="Twitter Logo"
                  />
                ) : (
                  <img
                    src={`${STATIC_IMAGES_URL}/brands/twitter-dark.svg`}
                    className="h-4 w-4"
                    height={16}
                    width={16}
                    alt="Twitter Logo"
                  />
                )
              }
              dataTestId="profile-meta-twitter"
            >
              <Link
                href={`https://x.com/${getProfileAttribute(
                  profile?.attributes,
                  'x'
                )}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {getProfileAttribute(profile?.attributes, 'x')?.replace(
                  'https://x.com/',
                  ''
                )}
              </Link>
            </MetaDetails>
          )}
     
        </div>
      </div>
    </div>
  );
};

export default Details;
