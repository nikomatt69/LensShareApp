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

const Latest = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;
  const LoadingMore: FC = () => (
    <div className="p-1 mt-6 text-center text-gray-500 font-bold text-sm">Loading...</div>

  );

  const { data, loading, error } = useQuery<{
    explorePublications: ExplorePublicationResult;
  }>(ExplorePublicationsDocument, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        publicationTypes: ["POST"],
        timestamp: 1,
        limit: 30,
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

  const onlyVideoPublications = publications?.filter((publication) => {
    if (
      publication.metadata.media[0].original.mimeType.startsWith("video/") &&
      publication.metadata.media[0].original.url
    ) {
      return (
        publication.metadata.media[0].original.url.startsWith("https://lens.infura-ipfs.io") ||
        publication.metadata.media[0].original.url.startsWith("ipfs://") ||
        publication.metadata.media[0].original.url.startsWith("https://arweave") ||
        publication.metadata.media[0].original.url.startsWith("https://lenshareapp.infura-ipfs.io")
      );
    }
  });

  return (
    <div>
      <InfiniteScroll
        dataLength={publications?.length ?? 0}
        next={() => {}}
        hasMore={true}
        loader={<LoadingMore/>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      <Card className="rounded-xl px-3">
      {onlyVideoPublications?.map((pub: Publication) => (
        <VideoCard key={pub.id} publication={pub as Publication} />
      ))}
      </Card>
      </InfiniteScroll>
    </div>
  );
};

export default Latest;
