import { API_URL } from "@/constants";
import { onError } from "@apollo/client/link/error";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { publicationKeyFields } from "./lib/keyFields";
import cursorBasedPagination from "./lib/cursorBasedPagination";
import result from "./types/lens";

const REFRESH_AUTHENTICATION_MUTATION = `
    mutation Refresh($request: RefreshRequest!) {
      refresh(request: $request) {
        accessToken
        refreshToken
      }
    }
  `;

const httpLink = new HttpLink({ uri: API_URL, fetch });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken === "undefined" || !accessToken) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("selectedProfile");

    return forward(operation);
  } else {
    operation.setContext({
      headers: {
        "x-access-token": accessToken ? `Bearer ${accessToken}` : "",
      },
    });

    const { exp }: { exp: number } = jwtDecode(accessToken);

    if (Date.now() >= exp * 1000) {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operationName: "Refresh",
          query: REFRESH_AUTHENTICATION_MUTATION,
          variables: {
            request: { refreshToken: localStorage.getItem("refreshToken") },
          },
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          operation.setContext({
            headers: {
              "x-access-token": accessToken
                ? `Bearer ${res?.data?.refresh?.accessToken}`
                : "",
            },
          });
          localStorage.setItem("accessToken", res?.data?.refresh?.accessToken);
          localStorage.setItem(
            "refreshToken",
            res?.data?.refresh?.refreshToken
          );
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          toast.error(
            `Something went wrong when authenticating with Lens! Please log out, log back in, and try again.`
          );
        });
    }

    return forward(operation);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    possibleTypes: result.possibleTypes,
  typePolicies: {
    Post: { keyFields: publicationKeyFields },
    Comment: { keyFields: publicationKeyFields },
    Mirror: { keyFields: publicationKeyFields },
    Query: {
      fields: {
        timeline: cursorBasedPagination(['request', ['profileId']]),
        feed: cursorBasedPagination(['request', ['profileId', 'feedEventItemTypes']]),
        feedHighlights: cursorBasedPagination(['request', ['profileId']]),
        explorePublications: cursorBasedPagination(['request', ['sortCriteria', 'metadata']]),
        publications: cursorBasedPagination([
          'request',
          ['profileId', 'commentsOf', 'publicationTypes', 'metadata']
        ]),
        nfts: cursorBasedPagination(['request', ['ownerAddress', 'chainIds']]),
        notifications: cursorBasedPagination(['request', ['profileId', 'notificationTypes']]),
        followers: cursorBasedPagination(['request', ['profileId']]),
        following: cursorBasedPagination(['request', ['address']]),
        search: cursorBasedPagination(['request', ['query', 'type']]),
        profiles: cursorBasedPagination([
          'request',
          ['profileIds', 'ownedBy', 'handles', 'whoMirroredPublicationId']
        ]),
        whoCollectedPublication: cursorBasedPagination(['request', ['publicationId']]),
        whoReactedPublication: cursorBasedPagination(['request', ['publicationId']]),
        mutualFollowersProfiles: cursorBasedPagination([
          'request',
          ['viewingProfileId', 'yourProfileId', 'limit']
        ])
      }
    }
  }
  }),
});
