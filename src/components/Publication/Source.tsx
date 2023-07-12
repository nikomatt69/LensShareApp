import type { FC } from 'react';
import { Tooltip } from '../UI/Tooltip';
import { STATIC_IMAGES_URL } from '@/constants';
import { Publication } from '@/utils/lens/generatedLenster';
import { apps } from '@/utils/data/apps';

interface SourceProps {
  publication: Publication;
}

const Source: FC<SourceProps> = ({ publication }) => {
  const { appId } = publication;
  const show = apps.includes(appId);

  if (!show) {
    return null;
  }

  return (
    <Tooltip content={appId} placement="top">
      <img
        className="h-4 w-4 rounded-full"
        src={`${STATIC_IMAGES_URL}/source/${appId}.jpeg`}
        alt={appId}
      />
    </Tooltip>
  );
};

export default Source;
