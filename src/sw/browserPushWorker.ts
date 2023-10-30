const onBrowserPushWorkerMessage = (event: MessageEvent) => {
  const { data } = event;
  postMessage(data);
};

self.addEventListener('message', onBrowserPushWorkerMessage);
self.addEventListener('message',  (event) => event.data.onBrowserPushWorkerMessage);
self.addEventListener('message', (event) => event.data);
