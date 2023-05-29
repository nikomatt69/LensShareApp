import {
  ExplorePublicationsDocument,
  ExplorePublicationResult,
  Profile,
} from "@/types/lens";
import type { Publication } from "@/utils/lens";
import { useQuery } from "@apollo/client";
import VideoCard from "@/components/HomePage/VideoCard";
import { useAppStore } from "@/store/app";
import { Card } from "./UI/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Loader from "./UI/Loader";
import { FC } from "react";
import { useInView } from "react-cool-inview";

const Latest = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;
  

  const { data, loading, error, fetchMore } = useQuery<{
    explorePublications: ExplorePublicationResult;
  }>(ExplorePublicationsDocument, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        publicationTypes: ["POST"],
        timestamp: 1,
        limit: 20,
        excludeProfileIds: [
          //nsfw
          "0x5eaf",
          "0x3f7d",
          "0x5b94",
          "0x5c7c",
          "0x62dd",
          "0x53cd",
        ],
        metadata: {
          mainContentFocus: ["VIDEO"],
        },
      },
      reactionRequest,
      profileId,
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
            sortCriteria: "LATEST",
        publicationTypes: ["POST"],
        timestamp: 1,
        limit: 20,
        excludeProfileIds: [
          //nsfw
          "0x5eaf",
          "0x3f7d",
          "0x5b94",
          "0x5c7c",
          "0x62dd",
          "0x53cd",
        ],
        metadata: {
          mainContentFocus: ["VIDEO"],
        },
      },
      reactionRequest,
      profileId,
           
          
        }
      })
    }
  })


  return (
    <div>
      <InfiniteScroll
        dataLength={publications?.length ?? 0}
        next={() => {}}
        hasMore={true}
        loader={pageInfo?.next && (
          <span ref={observe} className="flex justify-center p-10">
            <Loading />
          </span>
        )}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      <Card className="rounded-xl px-3">
      {publications?.map((pub: Publication) => (
        <VideoCard key={pub.id} publication={pub as Publication} />
      ))}
      </Card>
      </InfiniteScroll>
    </div>
  );
};

export default Latest;


