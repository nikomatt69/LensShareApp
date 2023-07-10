
import { NextPage } from 'next';
import PublicationPageShimmer from './Shimmer';
import { useAppStore } from '@/store/app';
import { useRouter } from 'next/router';
import { Profile, usePublicationQuery } from '@/utils/lens/generatedLenster';
import Custom404 from '@/pages/404';
import { GridItemEight, GridItemFour, GridLayout } from '../UI/GridLayout';
import MetaTags from '../UI/MetaTags';
import formatHandle from '@/utils/functions/formatHandle';
import { APP_NAME } from '@/constants';
import { Card } from '../UI/Card';
import FullPublication from './FullPublication';
import NewPublication from '../Composer/NewPublication';
import Feed from '../Comment/Feed';
import NoneRelevantFeed from '../Comment/NoneRelevantFeed';
import UserProfile from '../ProfilePage/UserProfile';
import RelevantPeople from './RelevantPeople';
import OnchainMeta from './OnchainMeta';
import Footer from '../Sidebar/Footer';
import BottomNav from '../Navs/BottomNav';
import Navbar from '../Navbar';

const ViewPublication: NextPage = (profile) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  
  const {
    query: { id }
  } = useRouter();

 

  const { data, loading, error } = usePublicationQuery({
    variables: {
      request: { publicationId: id },
      reactionRequest: currentProfile
        ? { profileId: currentProfile?.id }
        : null,
      profileId: currentProfile?.id ?? null
    },
    skip: !id
  });

  if (error) {
    return <Custom404 />;
  }

  if (loading || !data) {
    return <PublicationPageShimmer />;
  }

  if (!data.publication) {
    return <Custom404 />;
  }

  const { publication } = data as any;
  const canComment = publication?.canComment?.result;

  return (
    <div>
      <Navbar />
    <GridLayout>
      <MetaTags
        title={
          publication.__typename && publication?.profile?.handle
            ? `${publication.__typename} by @${formatHandle(
                publication.profile.handle
              )} • ${APP_NAME}`
            : APP_NAME
        }
      />
      <GridItemEight className="space-y-5 bg-[#C0C0C0] rounded-xl h-[vh-80]">
        <Card>
          <FullPublication profile={profile as Profile} publication={publication} />
        </Card>
        {currentProfile && !publication?.hidden }
         
            <NewPublication publication={publication} />
          
        
        <Feed publication={publication} />
        <NoneRelevantFeed publication={publication} />
      </GridItemEight>
      <GridItemFour className="space-y-5">
        <Card as="aside" className="p-5 bg-[#C0C0C0]" dataTestId="poster-profile">
          <UserProfile
            profile={
              publication.__typename === 'Mirror'
                ? publication?.mirrorOf?.profile
                : publication?.profile
            }
            showBio
          />
        </Card>
        <RelevantPeople publication={publication} />
        <OnchainMeta publication={publication} />
        
        <Footer />
      </GridItemFour>
    </GridLayout>
    
    <BottomNav/>
    </div>
  );
};

export default ViewPublication;
