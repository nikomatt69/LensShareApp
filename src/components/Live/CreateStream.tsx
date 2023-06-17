import { API_KEY, LENSTOK_URL, LIVE_API_KEY } from "@/constants";
import { useAppStore } from "@/store/app";
import { Player, useCreateStream, useStream } from "@livepeer/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { AccessControl } from "./AccessControl";
import LiveContent from "./LiveContent";


const CreateStream = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [streamTerminated, setstreamTerminated] = useState(false);
  

  const [streamUrl, setStreamUrl] = useState<string>("");
  const [streamPlaybackId, setStreamPlaybackId] = useState<string>("");
  const [streamPlaybackUrl, setStreamPlaybackUrl] = useState<string>("");


  const streamName = currentProfile?.id;

  const {
    mutate: createStream,
    data: createdStream,
    status,
  } = useCreateStream(
    streamName
      ? {
          name: streamName,
          playbackPolicy: { type: 'public' },
        }
      : null,
  );
 

  const CreatedStream = () => {
    const response = {
      method:`get`,
      url: `/api/get-ipfs-cid-stream/${stream?.id}`,
      headers: {
        'authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',

      },
    };

    axios(response)
      .then((response) => {
        console.log("Stream terminated");
        setstreamTerminated(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  const { data: stream } = useStream({
    streamId: createdStream?.id,
    refetchInterval: (stream) => (!stream?.isActive ? 5000 : false),


  });

  const isLoading = useMemo(() => status === 'loading', [status]);
  return (
    <div className="flex flex-col justify-items-center m-auto text-black text-center p-3 w-[600px]">
      {!streamTerminated ? (
        <>
          {stream?.playbackId && (
            <>
              <div className="mb-5  text-black text-center">
               <AccessControl />
              </div>

              <Player
                title={stream?.name}
                playbackId={stream?.playbackId}
                autoPlay
                muted
              />

              <button
                className="py-1 px-3 drop-shadow-xl rounded text-sm mt-2 border hover:text-[#ffffff] hover:bg-[#57B8FF] transition cursor-pointer bg-[##57B8FF] text-black font-semibold"
                onClick={() => CreatedStream()}
              >
                Terminate Stream
              </button>

              <div className="flex m-3">
              <LiveContent />
              </div>

            </>
          )}

          {!stream && (  
            <>
              {currentProfile ? (
                <>
                 <div className="mb-5  text-black text-center">
               <AccessControl />
              </div>

              <Player
                title={streamName}
                playbackId={stream}
                autoPlay
                muted
              />
               <div className="flex m-3">
              <LiveContent />
              </div>

              
                </>
              ) : (
                <div>Please log in to be able to create stream!</div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div>Stream Terminated Sussesfully</div>
          <Link href="/">Home</Link>
        </>
      )}
    </div>
  );
};

export default CreateStream;