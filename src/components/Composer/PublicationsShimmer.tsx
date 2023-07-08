
import type { FC } from 'react';
import PublicationShimmer from './PublicationShimmer';
import { Card } from '../UI/Card';



const PublicationsShimmer: FC = () => {
  return (
    <Card className="divide-y-[1px] dark:divide-gray-700">
      <PublicationShimmer />
      <PublicationShimmer />
      <PublicationShimmer />
    </Card>
  );
};

export default PublicationsShimmer;
