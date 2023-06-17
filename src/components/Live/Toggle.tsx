import { Player, Stream } from "@livepeer/react";
import React, { FC, useState } from "react";
import CreateRender from "./CreateRender";
import CreateStream from "./CreateStream";

import LiveContent from "./LiveContent";

import Live from "./Live";
import { Publication } from "@/types/lens";

import Create from "../LiveStream/Create";
import Watch from "../LiveStream/Watch";
import Hero from "../LiveStream/Hero";
import { polygon } from "wagmi/dist/chains";
import { useAppStore } from "@/store/app";
import { AccessControl } from "./AccessControl";
import Huddle from "./Hudd";
import Hudd from "./Hudd";

    
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
          Create2
        </button>
        <button
          className={`cursor-pointer bg-blue-800 rounded-full py-2 px-4 font-semibold text-sm ${
            selectedTab === "watch" ? "text-black" : "text-black"
          } hover:bg-blue-900`}
          onClick={() => setSelectedTab("create2")}
        >
          Create
        </button>

      </div>
    </div>
    {selectedTab === "watch" && <Hudd/>}
    {selectedTab === "go" && <CreateStream/>}
    </div>
  );
};

export default Toggle;
