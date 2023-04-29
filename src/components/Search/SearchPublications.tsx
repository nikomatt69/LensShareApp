import { useAppStore } from "@/store/app";
import { useSearchPublicationsQuery } from "@/types/graph";
import {
  Profile,
  Publication,
  PublicationSearchResult,
  SearchRequestTypes,
} from "@/utils/lens";
import React, { FC } from "react";
import VideoCard from "../HomePage/VideoCard";

interface Props {
  query: string | string[];
}

const SearchPublications: FC<Props> = ({ query }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const request = {
    query,
    type: SearchRequestTypes.Publication,
    limit: 10,
  };

  const { data, loading, error, fetchMore } = useSearchPublicationsQuery({
    variables: { request },
  });

  const search = data?.search as PublicationSearchResult;
  const publications = search?.items as Publication[];
  const pageInfo = search?.pageInfo;
  const hasMore =
    pageInfo?.next && publications?.length !== pageInfo.totalCount;

  const loadMore = async () => {
    await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next } },
    });
  };

  return (
    <div>
      {publications?.map((publication) => (
        <VideoCard
          key={publication?.id}
          publication={publication}
        />
      ))}
    </div>
  );
};

export default SearchPublications;
