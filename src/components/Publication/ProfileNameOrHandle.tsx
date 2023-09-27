import formatHandle from '@/utils/functions/formatHandle';
import { Profile } from '@/utils/lens/generatedLenster';
import sanitizeDisplayName from '@/utils/sanitizeDisplayName';
import cn from '@/components/UI/cn';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import Slug from '../UI/Slug';

interface ProfileNameOrHandleProps {
  profile?: Profile;
  className?: string;
  separator?: ReactNode;
}

const ProfileNameOrHandle: FC<ProfileNameOrHandleProps> = ({
  profile,
  className = '',
  separator = ''
}) => {
  if (!profile) {
    return null;
  }

  return (
    <>
      <Link
        href={`/u/${profile?.id}`}
        className={cn('max-w-sm truncate hover:underline', className)}
      >
        <b className="whitespace-nowrap">
          {profile?.name ? (
            sanitizeDisplayName(profile?.name)
          ) : (
            <Slug slug={formatHandle(profile?.handle)} prefix="@" />
          )}
        </b>
      </Link>
      {separator ? <span>{separator}</span> : null}
    </>
  );
};

export default ProfileNameOrHandle;
