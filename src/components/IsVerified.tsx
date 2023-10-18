import clsx from 'clsx';
import type { FC } from 'react';
import { mainnetVerified } from '../utils/data/verified';
import {
  ChatBubbleOvalLeftIcon,
  CheckBadgeIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';
import React from 'react';
import { VERIFIED_CHANNELS } from '../utils/data/verifiedprofiles';
type Props = {
  id: string;
  size?: 'xs' | 'sm' | 'lg';
  color?: string;
};

const IsVerified: FC<Props> = ({
  id,
  size = 'sm',
  color = 'text-blue-700 dark:text-blue-700'
}) => {
  if (!VERIFIED_CHANNELS.includes(id)) return null;
  return (
    <div>
      <CheckBadgeIcon
        className={clsx(
          'ml-1',
          {
            'h-3 w-3': size === 'xs',
            'h-4 w-4': size === 'sm',
            'h-5 w-5': size === 'lg'
          },
          color
        )}
      />
    </div>
  );
};

export default IsVerified;
