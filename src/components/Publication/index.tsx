import { NextPage } from 'next';

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
import Loading from '../Loading';
import Loader from '../UI/Loader';
import { useGlobalModalStateStore } from '@/store/modals';

const ViewPublication: NextPage = (profile) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const showComposerModal = useGlobalModalStateStore(
    (state) => state.showComposerModal
  );



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
    return <Loader />;
  }

  if (!data.publication) {
    return <Custom404 />;
  }

  const { publication } = data as any;
  const canComment = publication?.canComment?.result;

  return (
    <div>
      
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

      
        <GridItemEight className="h-[vh-80] space-y-5 rounded-xl mb-10 bg-[#F2F6F9] dark:bg-black">
          <Card className='rounded-xl border-blue-700'>
            <FullPublication
              profile={profile as Profile}
              publication={publication}
              showCount={true}
            />
          </Card>
          {currentProfile && !publication?.hidden && !showComposerModal ? (
        
            <NewPublication publication={publication} />
          
        ) : null}

          <Feed publication={publication} />
          <NoneRelevantFeed publication={publication} />
        </GridItemEight>
        <GridItemFour className="space-y-5">
          <RelevantPeople publication={publication} />
          <OnchainMeta publication={publication} />
          <Footer />
        </GridItemFour>
      </GridLayout>

      <BottomNav />
    </div>
  );
};

export default ViewPublication;
