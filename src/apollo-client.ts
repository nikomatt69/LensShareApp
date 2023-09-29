import { API_URL } from '@/constants';

import toast from 'react-hot-toast';
import { fromPromise, toPromise } from '@apollo/client';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  from,
  InMemoryCache
} from '@apollo/client';
import { publicationKeyFields } from './lib/keyFields';
import cursorBasedPagination from './lib/cursorBasedPagination';
import result from './types/lens';

import axios from 'axios';
import createFeedFieldPolicy from './utils/lens/apollo/cache/createFeedFieldPolicy';
import createFeedHighlightsFieldPolicy from './utils/lens/apollo/cache/createFeedHighlightsFieldPolicy';
import createForYouFieldPolicy from './utils/lens/apollo/cache/createForYouFieldPolicy';
import createExplorePublicationsFieldPolicy from './utils/lens/apollo/cache/createExplorePublicationsFieldPolicy';
import createPublicationsFieldPolicy from './utils/lens/apollo/cache/createPublicationsFieldPolicy';
import createNftsFieldPolicy from './utils/lens/apollo/cache/createNftsFieldPolicy';
import createNotificationsFieldPolicy from './utils/lens/apollo/cache/createNotificationsFieldPolicy';
import createFollowersFieldPolicy from './utils/lens/apollo/cache/createFollowersFieldPolicy';
import createFollowingFieldPolicy from './utils/lens/apollo/cache/createFollowingFieldPolicy';
import createSearchFieldPolicy from './utils/lens/apollo/cache/createSearchFieldPolicy';
import createProfilesFieldPolicy from './utils/lens/apollo/cache/createProfilesFieldPolicy';
import createWhoCollectedPublicationFieldPolicy from './utils/lens/apollo/cache/createWhoCollectedPublicationFieldPolicy';
import createWhoReactedPublicationFieldPolicy from './utils/lens/apollo/cache/createWhoReactedPublicationFieldPolicy';
import createMutualFollowersProfilesFieldPolicy from './utils/lens/apollo/cache/createMutualFollowersProfilesFieldPolicy';
import superfluidLink from './superfluidLink';
import { Localstorage } from './storage';
import parseJwt from './utils/lens/apollo/lib/parseJwt';

const superfluidClient = new ApolloClient({
  link: superfluidLink,
  cache: new InMemoryCache()
});

export default superfluidClient;

const httpLink = new HttpLink({ uri: API_URL, fetchOptions: 'no-cors', fetch });

const resetAuthData = () => {
  localStorage.removeItem(Localstorage.NotificationStore);
  localStorage.removeItem(Localstorage.TransactionStore);
  localStorage.removeItem(Localstorage.TimelineStore);
  localStorage.removeItem(Localstorage.MessageStore);
  localStorage.removeItem(Localstorage.AttachmentCache);
  localStorage.removeItem(Localstorage.AttachmentStore);
  localStorage.removeItem(Localstorage.NonceStore);
};

const REFRESH_AUTHENTICATION_MUTATION = `
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem(Localstorage.AccessToken);
  const refreshToken = localStorage.getItem(Localstorage.RefreshToken);

  if (!accessToken || accessToken === 'undefined') {
    resetAuthData();
    return forward(operation);
  }

  const expiringSoon = Date.now() >= parseJwt(accessToken)?.exp * 1000;

  if (!expiringSoon) {
    operation.setContext({
      headers: {
        'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
      }
    });

    return forward(operation);
  }

  return fromPromise(
    axios
      .post(
        API_URL,
        {
          fetchOptions: 'no-cors',
          operationName: 'Refresh',
          query: REFRESH_AUTHENTICATION_MUTATION,
          variables: { request: { refreshToken } }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then(({ data }) => {
        const accessToken = data?.data?.refresh?.accessToken;
        const refreshToken = data?.data?.refresh?.refreshToken;
        operation.setContext({
          fetchOptions: 'no-cors',
          headers: {
            'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
          }
        });

        localStorage.setItem(Localstorage.AccessToken, accessToken);
        localStorage.setItem(Localstorage.RefreshToken, refreshToken);

        return toPromise(forward(operation));
      })
      .catch(() => {
        return toPromise(forward(operation));
      })
  );
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    possibleTypes: result.possibleTypes,
    typePolicies: {
      Post: { keyFields: publicationKeyFields },
      Comment: { keyFields: publicationKeyFields },
      Mirror: { keyFields: publicationKeyFields },
      Query: {
        fields: {
          feed: createFeedFieldPolicy(),
          feedHighlights: createFeedHighlightsFieldPolicy(),
          forYou: createForYouFieldPolicy(),
          explorePublications: createExplorePublicationsFieldPolicy(),
          publications: createPublicationsFieldPolicy(),
          publicationsProfileBookmarks: createPublicationsFieldPolicy(),
          nfts: createNftsFieldPolicy(),
          notifications: createNotificationsFieldPolicy(),
          followers: createFollowersFieldPolicy(),
          following: createFollowingFieldPolicy(),
          search: createSearchFieldPolicy(),
          profiles: createProfilesFieldPolicy(),
          whoCollectedPublication: createWhoCollectedPublicationFieldPolicy(),
          whoReactedPublication: createWhoReactedPublicationFieldPolicy(),
          mutualFollowersProfiles: createMutualFollowersProfilesFieldPolicy()
        }
      }
    }
  })
});
