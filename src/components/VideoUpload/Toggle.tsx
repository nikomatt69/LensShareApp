import { Player, Stream } from "@livepeer/react";
import React, { FC, useState } from "react";

import { Publication } from "@/types/lens";

import Create from "../LiveStream/Create";
import Watch from "../LiveStream/Watch";
import Hero from "../LiveStream/Hero";
import { polygon } from "wagmi/dist/chains";
import { useAppStore } from "@/store/app";
import UploadVideo from ".";
import Live from "../Live/Live";


    
interface Props {
  publication: Publication;
}
const Toggle: FC<Props> = ({ publication }) => {
  const [selectedTab, setSelectedTab] = useState("go");
  const [mounted, setMounted] = useState(false);
  const [stream, setStream] = useState<Stream | null>(null);
  const [streamId, setStreamId] = useState<string | null>(null);
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <div className="mt-[10%]">
    <div className="bg-blue-800 rounded-full w-48  max-w-80% mx-auto">
      <div className="flex justify-between">
        <button
          className={`cursor-pointer bg-blue-800 rounded-full py-2 px-4 font-semibold text-sm ${
            selectedTab === "go" ? "text-purple-100" : "text-[#57B8FF]"
          } border-blue-700 hover:bg-blue-900`}
          onClick={() => setSelectedTab("go")}
        >
          Watch
        </button>
        <button
          className={`cursor-pointer bg-blue-800 rounded-full py-2 px-4 font-semibold text-sm ${
            selectedTab === "go" ? "text-purple-100" : "text-[#57B8FF]"
          } border-blue-700 hover:bg-blue-900`}
          onClick={() => setSelectedTab("watch")}
        >
          Create
        </button>
       

      </div>
    </div>
    {selectedTab === "watch" && <UploadVideo/>}
    {selectedTab === "go" && <Live publication={publication}/>}
    </div>
  );
};

export default Toggle;
