import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import packageJson from '../package.json';
import { CustomFiltersTypes } from '@/utils/lens/generatedLenster';
import getEnvConfig from './utils/data/getEnvConfig';

export const IS_MAINNET = process.env.NEXT_PUBLIC_NETWORK === 'mainnet';
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';

export const LENSSHARE_API_URL = 'https://api.lenshareapp.xyz';

export const APP_ID = 'lensshare';
export const APP_NAME = 'LensShare';
export const APP_VERSION = packageJson.version;
export const LENSTOK_URL = process.env.NEXT_PUBLIC_LENSTOK_URL;
export const APP_INFOPAGE = 'Decentralized Social Video & Message Platform';
export const LENS_NETWORK = process.env.NEXT_PUBLIC_LENS_NETWORK ?? 'mainnet';

export const API_URL = getEnvConfig().apiEndpoint;

export const LENSHUB_PROXY = getEnvConfig().lensHubProxyAddress;
export const LENS_PERIPHERY = getEnvConfig().lensPeripheryAddress;
export const DEFAULT_COLLECT_TOKEN = getEnvConfig().defaultCollectToken;
export const LIT_PROTOCOL_ENVIRONMENT = getEnvConfig().litProtocolEnvironment;

export const SUPERFLUID_SUBGRAPH ='https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic';

export const OLD_LENS_RELAYER_ADDRESS =
  '0xD1FecCF6881970105dfb2b654054174007f0e07E';

export const LENSSHARE_TAIL_INGEST_URL = 'https://tail.lenshareapp.xyz';

export const IPFS_FREE_UPLOAD_LIMIT = IS_MAINNET ? 5000 : 100; // in MB

export const MUX_DATA_KEY = '2h11sq1qeahiaejrjegjti847';

export const NEXT_PUBLIC_STUDIO_API_KEY =
  '9e17a7ab-3370-4e31-85c3-43072da2315e';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MESSAGING_PROVIDER = {
  XMTP: 'xmtp',
  PUSH: 'push'
};
export const BASE_URL = IS_MAINNET
  ? 'https://lenshareapp.xyz'
  : 'https://lenshareapp.xyz';

export const ALCHEMY_KEY = '7jxlM7yIx-aJXDivcEZxsLFFRKQS6-ue';

export const REQUESTING_SIGNATURE_MESSAGE = 'Requesting signature...';

export const LENS_MEDIA_SNAPSHOT_URL = 'https://ik.imagekit.io/lens/media-snapshot';

export const PINSTA_SERVER_URL = 'https://lensshare.4everland.store';

export const STS_GENERATOR_WORKER_URL = IS_PRODUCTION
  ? 'https://sts.lenshareapp.xyz'
  : 'https://sts.lenshareapp.xyz';
export const METADATA_WORKER_URL = IS_PRODUCTION
  ? 'https://meta.lenshareapp.xyz'
  : 'https://meta.lenshareapp.xyz';
export const FRESHDESK_WORKER_URL = IS_PRODUCTION
  ? 'https://freshdesk.lenster.xyz'
  : 'http://localhost:8084';
export const SNAPSHOR_RELAY_WORKER_URL = IS_PRODUCTION
  ? 'https://snapshot-relay.lenshareapp.xyz'
  : 'https://snapshot-relay.lenshareapp.xyz';
export const ENS_RESOLVER_WORKER_URL = IS_PRODUCTION
  ? 'https://ens-resolver.lenshareapp.xyz'
  : 'https://ens-resolver.lenshareapp.xyz';
export const OEMBED_WORKER_URL = IS_PRODUCTION
  ? 'https://oembed.lenshareapp.xyz'
  : 'https://oembed.lenshareapp.xyz';
export const SPACES_WORKER_URL = IS_PRODUCTION
  ? 'https://spaces.lenshareapp.xyz'
  : 'https://spaces.lenshareapp.xyz';
export const LEAFWATCH_WORKER_URL = IS_PRODUCTION
  ? 'https://leafwatch.lenster.xyz'
  : 'http://localhost:8089';

export const CHANNELS_WORKER_URL = IS_PRODUCTION
  ? 'https://channels.lenster.xyz'
  : 'http://localhost:8093';
export const COMMUNITIES_WORKER_URL = IS_PRODUCTION
  ? 'https://communities.lenshareapp.xyz'
  : 'http://localhost:8091';

export const S3_BUCKET = {
  LENSTER_MEDIA: 'lensshare'
};
export const EVER_API = 'https://endpoint.4everland.co';
export const IMAGE_TRANSFORMATIONS = {
  
  AVATAR_LG: 'tr:w-300,h-300',
  THUMBNAIL: 'tr:w-720,h-404',
  THUMBNAIL_V: 'tr:w-404,h-720',
  SQUARE: 'tr:w-200,h-200',
}
export const AVATAR = 'tr:w-300,h-300';
export const EXPANDED_AVATAR = 'tr:w-1000,h-1000';
export const COVER = 'tr:w-1500,h-500';
export const ATTACHMENT ='tr:w-300';


export const TALLY_VERIFICATION_FORM_URL = 'https://tally.so/r/mY5e80';
export const HUDDLE_API_KEY = 'wWUkmfVYqMCcYLKEGA8VE1fZ4hWyo5d0';

export const GROWTHBOOK_KEY = IS_MAINNET
  ? 'sdk-fDLRMwvpyh4Kq3b'
  : 'sdk-STENQl8vU1da648';

export const EVER_BUCKET_NAME = 'lensshare';

export const SCROLL_ROOT_MARGIN = '40% 0px';

export const XMTP_ENV = IS_MAINNET ? 'production' : 'dev';
export const XMTP_PREFIX = 'lens.dev/dm';

export const CHAIN_ID = IS_MAINNET ? polygon.id : polygon.id;


export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const INFURA_RPC = IS_MAINNET
  ? `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`
  : `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`;

export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 137;

// Utils
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];
export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/mp4',
  'audio/aac',
  'audio/ogg',
  'audio/webm',
  'audio/flac'
];
export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime'
];
export const ALLOWED_MEDIA_TYPES = [
  ...ALLOWED_VIDEO_TYPES,
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_AUDIO_TYPES
];


export const IPFS_GATEWAY = 'https://nftstorage.link/ipfs';
export const EVER_ENDPOINT = 'https://endpoint.4everland.co';
export const EVER_REGION = 'us-west-2';
export const EVER_ACCESS_KEY = process.env.EVER_ACCESS_KEY as string;
export const EVER_ACCESS_SECRET = process.env.EVER_ACCESS_SECRET as string;

export const SIGN_IN_REQUIRED_MESSAGE = 'Sign in required';
export const WRONG_NETWORK = IS_MAINNET
  ? 'Please change network to Polygon mainnet.'
  : 'Please change network to Polygon Mumbai testnet.';
export const SIGN_ERROR = 'Failed to sign data';
export const RELAYER_ENABLED = true;

export const LIVEPEER_VIEWS_URL = 'https://views.lenshareapp.xyz';

export const LENSSHARE_EMBED_URL = 'https://embed.lenshareapp.xyz';

export const STATIC_ASSETS_URL = 'https://asset.lenshareapp.xyz';


export const FALLBACK_COVER_URL = `${STATIC_ASSETS_URL}/images/logo.png`;

export const LENS_CUSTOM_FILTERS = [CustomFiltersTypes.Gardeners];

export const LENSSHARE_TWITTER_HANDLE = 'lensshareappxyz';

export const RELAY_ON = true;
export const ERROR_MESSAGE = 'Something went wrong!';

export const LENSTUBE_APP_ID = 'lenstube';
export const LENSTUBE_BYTES_APP_ID = 'lenstube-bytes';
export const LENSTOK_APP_ID = 'lenstok';
export const LENSTER_APP_ID = 'lenster';
export const RIFF_APP_ID = 'beats';
export const ORB_APP_ID = 'orb';
export const WMATIC_TOKEN_ADDRESS = IS_MAINNET
  ? '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
  : '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';

export const BUNDLR_NODE_URL = IS_MAINNET
  ? 'https://node2.bundlr.network'
  : 'https://devnet.bundlr.network';

export const BUNDLR_CURRENCY = 'matic';
export const BUNDLR_CONNECT_MESSAGE = 'Sign to initialize & estimate upload...';

export const VIDEO_CDN_URL = 'https://cdn.livepeer.com';

export const IMAGEPROXY_URL = IS_MAINNET
  ? 'https://img.lenstube.xyz'
  : 'https://img.lenstube.xyz';

export const API_ORIGINS = 'https://lenshareapp.xyz/';

export const ARWEAVE_WEBSITE_URL = 'https://arweave.net';
export const ARWEAVE_GATEWAY = 'https://arweave.net';
export const OPENSEA_MARKETPLACE_URL = IS_MAINNET
  ? 'https://opensea.io'
  : 'https://testnets.opensea.io';

export const RARIBLE_URL = IS_MAINNET
  ? 'https://rarible.com'
  : 'https://testnet.rarible.com';

export const IMAGE_CDN_URL = IS_MAINNET
  ? 'https://img.lenstube.xyz'
  : 'https://img.lenstube.xyz';

export const USER_CONTENT_URL = 'https://static-assets.lenster.xyz';
export const STATIC_IMAGES_URL = `${USER_CONTENT_URL}/images`;
export const UPDATE_OWNABLE_FEE_COLLECT_MODULE_ADDRESS = IS_MAINNET
  ? '0x432960b3209686Cc69e2EEC1dBBaB52A1c0Bf938'
  : '0xA78E4a4D0367f0f4674130F0Bb2653957ab5917e';

export const FREE_COLLECT_MODULE = IS_MAINNET
  ? '0x23b9467334bEb345aAa6fd1545538F3d54436e96'
  : '0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c';

export const MAINNET_DEFAULT_TOKEN =
  '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';

export const POLYGONSCAN_URL = IS_MAINNET
  ? 'https://polygonscan.com'
  : 'https://mumbai.polygonscan.com';

export const API_KEY = process.env.NEXT_PUBLIC_STUDIO_API_KEY;

export const LIVE_API_KEY = process.env.NEXT_PUBLIC_LIVE_STUDIO_API_KEY;



export const LIT_PROTOCOL_ENV = IS_MAINNET ? 'polygon' : 'mumbai';

export const GIPHY_TOKEN = 'mztAE0vdQdlfCYsM11E6UaPjUmjpYDHV';

export const OG_IMAGE = `${STATIC_ASSETS_URL}/images/logo.png`;

export const MESSAGE_PAGE_LIMIT = 35;
export const SCROLL_THRESHOLD = 0.1;
export const MIN_WIDTH_DESKTOP = 600;



// External Apps
export const LENSTER_URL = 'https://lenster.xyz';

export const WALLETCONNECT_PROJECT_ID = '8974231b47453a6cae531515ed1787c7';

export const LENSPROTOCOL_HANDLE = 'lensprotocol';
export const HANDLE_SUFFIX = IS_MAINNET ? '.lens' : '.test';

// Regex
export const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[\da-z]+([.\-][\da-z]+)*\.[a-z]{2,63}(:\d{1,5})?(\/.*)?$/;
export const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;
export const HANDLE_REGEX = /^[\da-z]+$/;
export const ALL_HANDLES_REGEX = /([\s+])@(\S+)/g;
export const HANDLE_SANITIZE_REGEX = /[^\d .A-Za-z]/g;
