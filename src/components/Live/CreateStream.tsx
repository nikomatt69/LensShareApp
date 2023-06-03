import { API_KEY, LENSTOK_URL, LIVE_API_KEY } from "@/constants";
import { useAppStore } from "@/store/app";
import { Player, useCreateStream } from "@livepeer/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const CreateStream = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [streamTerminated, setstreamTerminated] = useState(false);
  const streamName = currentProfile?.handle;

  const isLoading = useMemo(() => status === 'loading', [status]);

  const {
    mutate: createStream,
    data: stream,
    status: createStreamStatus,
  } = useCreateStream(streamName
    ? {
        name: streamName,
        playbackPolicy: { type: "public" },
      }
      : null);
    
   console.log(stream);

  const CreatedStream = () => {
    const response = {
      method:`get`,
      url: `https://livepeer.studio/api/stream/${stream?.playbackId}`,
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

  return (
    <div className="flex flex-col justify-items-center m-auto text-black text-center p-3 w-[600px]">
      {!streamTerminated ? (
        <>
          {stream?.playbackId && (
            <>
              <div className="mb-5  text-black text-center">
                For the stream to work please input the following keys in OBS
                Studio:
                <ul>
                  <li>
                    <b>RTMP Ingest Url:</b> rtmp://rtmp.livepeer.com/live
                  </li>
                  <li>
                    <b>Stream Key:</b> {stream?.streamKey}
                  </li>
                </ul>
                Don&apos;t have OBS?{" "}
                <a href="https://obsproject.com/">Download here.</a>
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
            </>
          )}

          {!stream && (  
            <>
              {currentProfile ? (
                <>
                  <button
                    className=" py-1 px-3 drop-shadow-xl rounded text-sm mt-2 border hover:text-[#ffffff] hover:bg-[#57B8FF] transition cursor-pointer bg-[#57B8FF] text-black font-semibold"
                    onClick={() => {
                      createStream?.();
                    }}
                    disabled={isLoading || !createStream}
                  >
                    Create Stream
                  </button>
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