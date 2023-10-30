
import { API_URL } from '@/constants';
import { useAppPersistStore } from '@/store/app';


import { FC } from 'react';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useAccount } from 'wagmi';
import useWebSocket from 'react-use-websocket';
import {

  type Notification,
  NotificationsDocument,
  type UserSigNonces,
  UserSigNoncesDocument
} from '@/utils/lens/generated5';
import {
 
  AuthorizationRecordRevokedDocument,

} from '@/utils/lens/generated7';

import getCurrentSessionId from '@/lib/getCurrentSessionId';
import getPushNotificationData from '@/lib/getPushNotificationData';
import { BrowserPush } from '@/lib/browserPush';
import resetAuthData from '@/utils/hooks/resetAuthData';
import { isSupported, share} from 'shared-zustand';
import { useNotificationPersistStore } from '@/store/notification';
import { useNonceStore } from '@/store/nonce';

const LensSubscriptionsProvider: FC = () => {
  const profileId = useAppPersistStore((state) => state.profileId);
  const setLatestNotificationId = useNotificationPersistStore(
    (state) => state.setLatestNotificationId
  );
  const {
    setLensHubOnchainSigNonce,
    setLensTokenHandleRegistryOnchainSigNonce,
    setLensPublicActProxyOnchainSigNonce
  } = useNonceStore();
  const { address } = useAccount();

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    API_URL.replace('http', 'ws'),
    { protocols: ['graphql-ws'] }
  );

  useEffectOnce(() => {
    sendJsonMessage({ type: 'connection_init' });
  });

  useUpdateEffect(() => {
    if (readyState === 1 && profileId && address) {
      sendJsonMessage({
        id: '1',
        type: 'start',
        payload: {
          variables: { for: profileId },
          query: NotificationsDocument
        }
      });
      sendJsonMessage({
        id: '2',
        type: 'start',
        payload: { variables: { address }, query: UserSigNoncesDocument }
      });
      sendJsonMessage({
        id: '3',
        type: 'start',
        payload: {
          variables: { authorizationId: getCurrentSessionId() },
          query: AuthorizationRecordRevokedDocument
        }
      });
    }
  }, [readyState, profileId]);

  useUpdateEffect(() => {
    const jsonData = JSON.parse(lastMessage?.data || '{}');
    const wsData = jsonData?.payload?.data;

    if (profileId && address && wsData) {
      if (jsonData.id === '1') {
        const notification = wsData.newNotification as Notification;
        if (getPushNotificationData(notification)) {
          const notify = getPushNotificationData(notification);
          BrowserPush.notify({
            title: notify?.title || ''
          });
        }
        setLatestNotificationId(notification.notificationId);
      }
      if (jsonData.id === '2') {
        const userSigNonces = wsData.userSigNonces as UserSigNonces;
        setLensHubOnchainSigNonce(userSigNonces.lensHubOnChainSigNonce);
        
        setLensPublicActProxyOnchainSigNonce(
          userSigNonces.peripheryOnChainSigNonce
        );
      }
      if (jsonData.id === '3') {
        resetAuthData();
        location.reload();
      }
    }
  }, [lastMessage]);

  // Sync zustand stores between tabs
  if (isSupported()) {
    share('lensHubOnchainSigNonce', useNonceStore);
    share('lensTokenHandleRegistryOnchainSigNonce', useNonceStore);
    share('lensPublicActProxyOnchainSigNonce', useNonceStore);
  }

  return null;
};

export default LensSubscriptionsProvider;
