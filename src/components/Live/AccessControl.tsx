import { Player, useCreateStream, useStream } from '@livepeer/react';
 
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
 

import {
  ApiError,
  CreateSignedPlaybackBody,
  CreateSignedPlaybackResponse,
} from '../../pages/api/sign-jwt';
 
export const AccessControl = () => {
  const [streamName, setStreamName] = useState<string>('');
  const {
    mutate: createStream,
    data: createdStream,
    status,
  } = useCreateStream(
    streamName
      ? {
          name: streamName,
          playbackPolicy: { type: 'jwt' },
        }
      : null,
  );
 
  const { data: stream } = useStream({
    streamId: createdStream?.id,
    refetchInterval: (stream) => (!stream?.isActive ? 5000 : false),
  });
 
  const { mutate: createJwt, data: createdJwt } = useMutation({
    mutationFn: async () => {
      if (!stream?.playbackId) {
        throw new Error('No playback ID yet.');
      }
 
      const body: CreateSignedPlaybackBody = {
        playbackId: stream.playbackId,
        // we pass along a "secret key" to demonstrate how gating can work
     
      };
 
      // we make a request to the Next.JS API route shown above
      const response = await fetch('/api/sign-jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
 
      return response.json() as Promise<
        CreateSignedPlaybackResponse | ApiError
      >;
    },
  });
 
  useEffect(() => {
    if (stream?.playbackId) {
      // when we have a playbackId for the stream, create a JWT
      createJwt();
    }
  }, [stream?.playbackId, createJwt]);
 
  const isLoading = useMemo(() => status === 'loading', [status]);
 
  return (
    <div>
      {!stream?.id ? (
        <>
          <input
            placeholder="Stream Name"
            onChange={(e) => setStreamName(e.target.value)}
          />
          <button
            onClick={() => {
              createStream?.();
            }}
            disabled={isLoading || !createStream || Boolean(stream)}
          >
            Create Gated Stream
          </button>
        </>
      ) : (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
          jwt={(createdJwt as CreateSignedPlaybackResponse)?.token}
        />
      )}
    </div>
  );
};