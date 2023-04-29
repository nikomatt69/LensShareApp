import { useCreateStream, useStream } from '@livepeer/react';
 
import { useMemo, useState } from 'react';
 
const AccessControl = () => {
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
 
  const isLoading = useMemo(() => status === 'loading', [status]);
 
  return (
    <div>
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
    </div>
  );
};

export default AccessControl;