import { ApolloLink, fromPromise, toPromise } from '@apollo/client';

import axios from 'axios';

import { parseJwt } from './lib';

export const API_URL = 'https://api.lens.dev';
const REFRESH_AUTHENTICATION_MUTATION = `
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

const clearStorage = () => {
  localStorage.removeItem(localStorage.AccessToken);
  localStorage.removeItem(localStorage.RefreshToken);
  localStorage.removeItem(localStorage.LensshareStore);
  localStorage.removeItem(localStorage.TransactionStore);
  localStorage.removeItem(localStorage.MessageStore);
  localStorage.removeItem(localStorage.AttachmentCache);
  localStorage.removeItem(localStorage.AttachmentStore);
};

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem(localStorage.AccessToken);

  if (!accessToken || accessToken === 'undefined') {
    clearStorage();
    return forward(operation);
  }

  const expiringSoon = Date.now() >= parseJwt(accessToken)?.exp * 1000;

  if (!expiringSoon) {
    operation.setContext({
      fetchOptions: 'no-cors',
      headers: {
        'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
      }
    });

    return forward(operation);
  }

  return fromPromise(
    axios(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: JSON.stringify({
        fetchOptions: 'no-cors',
        operationName: 'Refresh',
        query: REFRESH_AUTHENTICATION_MUTATION,
        variables: {
          request: {
            refreshToken: localStorage.getItem(localStorage.RefreshToken)
          }
        }
      })
    })
      .then(({ data }) => {
        const accessToken = data?.data?.refresh?.accessToken;
        const refreshToken = data?.data?.refresh?.refreshToken;
        operation.setContext({
          fetchOptions: 'no-cors',
          headers: {
            'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
          }
        });

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return toPromise(forward(operation));
      })
      .catch(() => {
        return toPromise(forward(operation));
      })
  );
});

export default authLink;
