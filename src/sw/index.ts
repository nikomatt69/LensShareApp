import { ServiceWorkerCache } from './cache';

declare let self: ServiceWorkerGlobalScope;
declare let browserPushWorker: Worker;
const preCachedAssets = (process.env.STATIC_ASSETS ?? []) as string[];
const CACHEABLE_PATHS = ['/', '/contact', '/explore'];
const CACHEABLE_DOMAINS = ['https://static-asset.lenshareapp.xyz','https://asset.lenshareapp.xyz',];

const cache = new ServiceWorkerCache({
  cachePrefix: 'SWCache',
  cacheableRoutes: [...CACHEABLE_PATHS, ...CACHEABLE_DOMAINS],
  staticAssets: preCachedAssets
});

async function handleInstall(): Promise<void> {
  void self.skipWaiting();
  await cache.cacheStaticAssets();
}

const handleActivate = async (): Promise<void> => {
  await self.clients.claim();
  await cache.invalidatePreviousCache();
};

const handleFetch = (event: FetchEvent): void => {
  const request = event.request.clone();
  const { origin } = new URL(request.url);

  if (self.location.origin === origin || CACHEABLE_DOMAINS.includes(origin)) {
    event.respondWith(cache.get(event));
  }
  return;
};


if (typeof Worker !== 'undefined') {
  browserPushWorker = new Worker(
    new URL('./browserPushWorker', import.meta.url)
  );
}

/**
 * Browser push notification
 */
export const BrowserPush = {
  notify: ({ title }: { title: string }) => {
    browserPushWorker.postMessage({ title });

    browserPushWorker.onmessage = function (event: MessageEvent) {
      const response = event.data;
      new Notification('LensShare', {
        body: response.title,
        icon: '/public/images/icon.png'
      });
    };
  }
};

const onBrowserPushWorkerMessage = (event: MessageEvent) => {
  const { data } = event;
  postMessage(data);
  
};

addEventListener('message', onBrowserPushWorkerMessage);

self.addEventListener('message', (event) => event.data);
self.addEventListener('fetch', handleFetch);
self.addEventListener('install', (event) => event.waitUntil(handleInstall()));
self.addEventListener('activate', (event) => event.waitUntil(handleActivate()));

export {};
