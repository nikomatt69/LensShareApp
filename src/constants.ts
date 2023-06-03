import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { CustomFiltersTypes } from '@/utils/lens'

export const IS_MAINNET = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

export const LENSSHARE_API_URL = 'https://api.lenshareapp.xyz';

export const APP_ID = "lensshare";
export const APP_NAME = "LensShare";
export const LENSTOK_URL = process.env.NEXT_PUBLIC_LENSTOK_URL;
export const APP_INFOPAGE = "Decentralized Social Video & Message Platform"

export const EVER_ACCESS_SECRET= process.env.NEXT_PUBLIC_EVER_ACCESS_SECRET;
export const EVER_ACCESS_KEY= process.env.NEXT_PUBLIC_EVER_ACCESS_KEY;

export const PINSTA_API_URL = 'https://apipost.lenshareapp.xyz';
export const MUX_DATA_KEY = '2h11sq1qeahiaejrjegjti847';

export const NEXT_PUBLIC_STUDIO_API_KEY="9e17a7ab-3370-4e31-85c3-43072da2315e";

export const LENS_MEDIA_SNAPSHOT_URL =
  'https://ik.imagekit.io/lens/media-snapshot';



export const PINSTA_SERVER_URL = 'https://lensshare.4everland.store';

export const NEXT_PUBLIC_EVER_BUCKET_NAME = 'lensshare';
export const EVER_ENDPOINT = 'https://endpoint.4everland.co';
export const EVER_REGION = 'us-west-2';

export const SCROLL_ROOT_MARGIN = '40% 0px';


export const XMTP_ENV = IS_MAINNET ? 'production' : 'dev';
export const XMTP_PREFIX = 'lens.dev/dm';

export const CHAIN_ID = IS_MAINNET ? polygon.id : polygonMumbai.id;
export const API_URL = IS_MAINNET
  ? "https://api.lens.dev"
  : "https://api-mumbai.lens.dev";
export const LENSHUB_PROXY = IS_MAINNET
  ? "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"
  : "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";
export const LENS_PERIPHERY = IS_MAINNET
  ? "0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f"
  : "0xD5037d72877808cdE7F669563e9389930AF404E8";

export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID ;
export const INFURA_RPC = IS_MAINNET
  ? `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`
  : `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`;

export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 80001

export const LS_KEYS = {
  LENSTTOK_STORE: "lensshare.store",
  TRANSACTION_STORE: "transaction.store",
  TIMELINE_STORE: "timeline.store",
  MESSAGE_STORE: "message.store",
};
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


export const SIGN_IN_REQUIRED_MESSAGE = 'Sign in required'
export const WRONG_NETWORK = IS_MAINNET
  ? 'Please change network to Polygon mainnet.'
  : 'Please change network to Polygon Mumbai testnet.'
export const SIGN_ERROR = 'Failed to sign data'
export const RELAYER_ENABLED = true

export const LIVEPEER_VIEWS_URL = 'https://views.lenshareapp.xyz';
export const BUNDLR_METADATA_UPLOAD_URL = 'https://metadata.lenshareapp.xyz';


export const LENSSHARE_EMBED_URL = 'https://embed.lenshareapp.xyz'

export const STATIC_ASSETS_URL = 'https://asset.lenshareapp.xyz';
export const STATIC_IMAGES_URL = `${STATIC_ASSETS_URL}/images`;

export const FALLBACK_COVER_URL=`${STATIC_ASSETS_URL}/images/logo.png`;

export const LENS_CUSTOM_FILTERS = [CustomFiltersTypes.Gardeners]

export const LENSSHARE_TWITTER_HANDLE = 'lensshareappxyz'

export const RELAY_ON = true
export const ERROR_MESSAGE = "Something went wrong!";

export const LENSTUBE_APP_ID = 'lenstube'
export const LENSTUBE_BYTES_APP_ID = 'lenstube-bytes'
export const LENSTOK_APP_ID = 'lenstok'

export const WMATIC_TOKEN_ADDRESS = IS_MAINNET
  ? "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
  : "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";

export const BUNDLR_NODE_URL = IS_MAINNET
  ? "https://node1.bundlr.network"
  : "https://devnet.bundlr.network";

export const BUNDLR_CURRENCY = "matic";
export const BUNDLR_CONNECT_MESSAGE = 'Sign to initialize & estimate upload...'



export const VIDEO_CDN_URL = "https://cdn.livepeer.com";

export const IMAGEPROXY_URL = IS_MAINNET ? "https://img.lenstube.xyz" : "https://img.lenstube.xyz";

export const API_ORIGINS = "https://lenshareapp.xyz/*";

export const ARWEAVE_WEBSITE_URL = "https://arweave.net";
export const ARWEAVE_GATEWAY = 'https://arweave.net/';
export const OPENSEA_MARKETPLACE_URL = IS_MAINNET ? "https://opensea.io" : "https://testnets.opensea.io";

export const RARIBLE_URL = IS_MAINNET ? 'https://rarible.com' : 'https://testnet.rarible.com';

export const IMAGE_CDN_URL = IS_MAINNET ? "https://img.lenstube.xyz" : "https://img.lenstube.xyz";

export const USER_CONTENT_URL = 'https://static-assets.lenster.xyz';

export const UPDATE_OWNABLE_FEE_COLLECT_MODULE_ADDRESS = IS_MAINNET
  ? "0x432960b3209686Cc69e2EEC1dBBaB52A1c0Bf938"
  : "0xA78E4a4D0367f0f4674130F0Bb2653957ab5917e";

export const FREE_COLLECT_MODULE = IS_MAINNET
  ? "0x23b9467334bEb345aAa6fd1545538F3d54436e96"
  : "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c";

export const MAINNET_DEFAULT_TOKEN =
  "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";

export const POLYGONSCAN_URL = IS_MAINNET
  ? "https://polygonscan.com"
  : "https://mumbai.polygonscan.com";
  
export const API_KEY = process.env.NEXT_PUBLIC_STUDIO_API_KEY;

export const  LIVE_API_KEY = process.env.NEXT_PUBLIC_LIVE_STUDIO_API_KEY;

export const DEFAULT_COLLECT_TOKEN = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"

export const LIT_PROTOCOL_ENV = IS_MAINNET ? "polygon" : "mumbai"

export const GIPHY_TOKEN = 'mztAE0vdQdlfCYsM11E6UaPjUmjpYDHV';



export const OG_IMAGE=`${STATIC_ASSETS_URL}/images/logo.png`;

export const MESSAGE_PAGE_LIMIT = 35;
export const SCROLL_THRESHOLD = 0.1;
export const MIN_WIDTH_DESKTOP = 600;

// Named transforms
export const AVATAR = 'avatar';
export const COVER = 'cover';
export const ATTACHMENT = 'attachment';

// External Apps
export const LENSTER_URL = 'https://lenster.xyz'

export const LENSPROTOCOL_HANDLE = 'lensprotocol';
export const HANDLE_SUFFIX = IS_MAINNET ? '.lens' : '.test';

// Regex
export const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[\da-z]+([.\-][\da-z]+)*\.[a-z]{2,63}(:\d{1,5})?(\/.*)?$/;
export const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;
export const HANDLE_REGEX = /^[\da-z]+$/;
export const ALL_HANDLES_REGEX = /([\s+])@(\S+)/g;
export const HANDLE_SANITIZE_REGEX = /[^\d .A-Za-z]/g;