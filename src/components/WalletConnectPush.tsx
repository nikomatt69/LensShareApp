import { DappClient as PushDappClient } from '@walletconnect/push-client';
import { Core } from '@walletconnect/core';

const core = new Core({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!
});

const pushDappClient = await PushDappClient.init({
  core,
  metadata: {
    name: 'LensShare Push',
    description: 'Lenshare push client',
    url: 'https://lenshareapp.xyz',
    icons: ['https://lenshareapp.xyz/images/icon.png']
  }
});

pushDappClient.on('push_response', (event) => {
  if (event.params.error) {
    console.error('Error on `push_response`:', event.params.error);
  } else {
    console.log('Established PushSubscription:', event.params.subscription);
  }
});
// Resolve known pairings from the Core's Pairing API.
const pairings = pushDappClient.core.pairing.getPairings();
// Use the latest pairing for this example.
const latestPairing = pairings[pairings.length - 1];

const id = await pushDappClient.propose({
  account: 'eip155:1:0xafeb...', // Target account to request push notifications for.
  pairingTopic: latestPairing.topic
});

const notificationPayload = {
  // Target `accounts` that should receive the push notification.
  accounts: ['eip155:1:0xafeb...'],
  // The `type` of notification. Based on the notification types defined in your `/.well-known/wc-push-config.json`.
  type: 'alerts',
  // The notification body itself.
  notification: {
    title: 'Activity',
    body: 'NewNotification',
    icon: 'https://lenshareapp.xyz/images/icon.png',
    url: 'https://lenshareapp.xyz'
  }
};

// We can construct the URL to the Notify Server using the `castUrl` property
// of the `PushDappClient` (which will be `https://cast.walletconnect.com` by default),
// together with our Project ID.
const result = await fetch(
  `${pushDappClient.castUrl}/${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}/notify`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notificationPayload)
  }
);

await result.json(); // { "sent": ["eip155:1:0xafeb..."], "failed": [], "not_found": [] }
