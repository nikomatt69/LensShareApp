import { useAppStore } from "@/store/app";
import { useSearchPublicationsQuery } from "@/types/graph";
import {
  Profile,
  Publication,
  PublicationSearchResult,
  SearchRequestTypes,
} from "@/types/lens";
import React, { FC, useState } from "react";
import VideoCard from "../HomePage/VideoCard";
import Video from "../HomePage/Video";
import Loading from "../Loading";
import { useInView } from "react-cool-inview";

interface Props {
  query: string | string[];
}

const SearchPublications: FC<Props> = ({ query }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [byte, setByte] = useState<Publication>();
  const [show, setShow] = useState(false);

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

  const openDetail = (byte: Publication) => {
    const nextUrl = `/${byte.id}`
    setByte(byte)
    history.pushState({ path: nextUrl }, '', nextUrl)
    setShow(!show)
  }
  const { observe } = useInView({

    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            cursor: pageInfo?.next,
            ...request
          }
        }
      })
    }
  })

  return (
    <div>
      {publications?.map((publication) => (
        <VideoCard
          
          key={publication?.id}
          publication={publication} 
          onDetail={openDetail}        />
      ))}
       {pageInfo?.next && (
            <span ref={observe} className="flex border-0 justify-center p-10">
              <Loading />
            </span>
          )}
    </div>
  );
};

export default SearchPublications;
