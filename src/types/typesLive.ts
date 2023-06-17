
export type StreamRequirements = {
  assetAddress: string | null;
  isAssetAddress: boolean;
  TokenAmount: string | null;
  isToken: boolean;
  chain: number | undefined;
};

export type CreateSignedPlaybackResponse = {
  acknowledged: boolean;
  insertedId: string;
};

export type Stream = {
  playbackId: string | undefined;
  streamId: string | undefined;
  streamName: string | undefined;
  requirements: StreamRequirements;
  author: `0x${string}` | undefined;
  createdAt: Date | undefined;
};
