import {
  ExplorePublicationsDocument,
  ExplorePublicationResult,
  Profile,
} from "@/types/lens";
import type { Publication } from "@/utils/lens";
import { useQuery } from "@apollo/client";
import VideoCard from "@/components/HomePage/VideoCard";
import { useAppStore } from "@/store/app";
import { Card } from "../UI/Card";
import { PlayButton } from "@livepeer/react";
import Loading from "../Loading";
import Loader from "../UI/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { FC } from "react";
import MetaTags from "../UI/MetaTags";
import { APP_NAME } from "@/constants";
import Navbar from "../Navbar";
import { useInView } from "react-cool-inview";
import BottomNav from "../Navs/BottomNav";

const Explore = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const reactionRequest = currentProfile ? { profileId: currentProfile?.id } : null
  const profileId = currentProfile?.id ?? null
  const LoadingMore: FC = () => (
    <div className="p-1 mt-6 text-center text-gray-500 font-bold text-sm">Loading...</div>

  );

  interface InfiniteScrollProps {
    fetchNextMessages: () => void;
    profile?: Profile;
    currentProfile?: Profile | null;
    hasMore: boolean;
    missingXmtpAuth: boolean;
  }




  const { data, loading, error, fetchMore } = useQuery<{
    explorePublications: ExplorePublicationResult;
  }>(ExplorePublicationsDocument, {
    variables: {
      request: {
        sortCriteria: "CURATED_PROFILES",
        publicationTypes: ["POST"],
        limit: 30,
        metadata: {
          mainContentFocus: ["VIDEO"],
        },
      },
      reactionRequest,
      profileId
    },
  });
  const publications = data?.explorePublications.items;
  console.log("DATA", data?.explorePublications.items);
  const pageInfo = data?.explorePublications?.pageInfo

  const { observe } = useInView({
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            cursor: pageInfo?.next,
            
          }
        }
      })
    }
  })
  
  return (
    <div>
      <MetaTags
        title={`Home • ${APP_NAME}`}
      />
     <InfiniteScroll
        dataLength={publications?.length ?? 0}
        next={() => {}}
        hasMore={true}
        loader={<Loading/>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      <Card className="rounded-xl flex flex-auto flex-col break-word break-text px-3" >
      {publications?.map((pub: Publication) => (
        <VideoCard key={pub.id} publication={pub as Publication} />
      ))}
      {pageInfo?.next && (
            <span ref={observe} className="flex justify-center p-10">
              <Loader />
            </span>
          )}
      </Card>
      </InfiniteScroll>
    <BottomNav/>
    </div>
  );
};

export default Explore;
