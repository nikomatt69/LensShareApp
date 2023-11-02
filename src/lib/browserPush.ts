let browserPushWorker: Worker;

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
