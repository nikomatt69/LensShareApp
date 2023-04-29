import { Player } from "@livepeer/react";
import React, { useState } from "react";
import CreateRender from "./CreateRender";
import CreateStream from "./CreateStream";
import Live from "./Live";
import LiveContent from "./LiveContent";
import LiveRender from "./LiveRender";
    
const Toggle = () => {
  const [selectedTab, setSelectedTab] = useState("watch");

  return (
    <div>
    <div className="bg-blue-800 rounded-full w-48 max-w-50% mx-auto">
      <div className="flex justify-between">
        <button
          className={`cursor-pointer bg-blue-800 rounded-full py-2 px-4 font-semibold text-sm ${
            selectedTab === "go" ? "text-purple-100" : "text-[#57B8FF]"
          } border-blue-700 hover:bg-blue-900`}
          onClick={() => setSelectedTab("watch")}
        >
          Watch LIVE
        </button>
        <button
          className={`cursor-pointer bg-blue-800 rounded-full py-2 px-4 font-semibold text-sm ${
            selectedTab === "watch" ? "text-purple-100" : "text-[#57B8FF]"
          } hover:bg-blue-900`}
          onClick={() => setSelectedTab("go")}
        >
          Go LIVE
        </button>
      </div>
    </div>
    {selectedTab === "watch" && <LiveContent/>}
    {selectedTab === "go" && <CreateStream/>}
    </div>
  );
};

export default Toggle;
