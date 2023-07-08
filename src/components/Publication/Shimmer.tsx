
import type { FC } from 'react';
import { GridItemEight, GridItemFour, GridLayout } from '../UI/GridLayout';
import PublicationShimmer from '../Composer/PublicationShimmer';
import { Card } from '../UI/Card';
import PublicationsShimmer from '../Composer/PublicationsShimmer';
import UserProfileShimmer from '../Composer/UserProfileShimmer';
import Footer from '../Sidebar/Footer';

const PublicationPageShimmer: FC = () => {
  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <Card>
          <PublicationShimmer />
        </Card>
        <PublicationsShimmer />
      </GridItemEight>
      <GridItemFour className="space-y-5">
        <Card className="p-5">
          <UserProfileShimmer />
        </Card>
        <Card className="space-y-4 p-5">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </Card>
        <Card className="flex justify-between p-5">
          <div className="shimmer h-3 w-1/2 rounded-lg" />
          <div className="shimmer h-3 w-1/4 rounded-lg" />
        </Card>
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};

export default PublicationPageShimmer;
