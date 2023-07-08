import { Publication } from "@/utils/lens/generatedLenster";
import HiddenPublication from "../Composer/HiddenPublication";
import PublicationBody from "../Composer/PublicationBody";
import PublicationHeader from "../Composer/PublicationHeader";
import PublicationWrapper from "../Composer/PublicationWrapper";
import PublicationActions from "./Actions";
import { FC } from "react";

interface ThreadBodyProps {
  publication: Publication;
}

const ThreadBody: FC<ThreadBodyProps> = ({ publication }) => {
  return (
    <PublicationWrapper publication={publication}>
      <PublicationHeader publication={publication} />
      <div className="flex">
        <div className="-my-6 ml-5 mr-8 border-[0.8px] border-gray-300 bg-gray-300 dark:border-gray-700 dark:bg-gray-700" />
        <div className="w-full max-w-[calc(100%_-_53px)] pb-5">
          {publication?.hidden ? (
            <HiddenPublication type={publication.__typename} />
          ) : (
            <>
              <PublicationBody publication={publication} />
              <PublicationActions publication={publication} />
            </>
          )}
        </div>
      </div>
    </PublicationWrapper>
  );
};

export default ThreadBody;
