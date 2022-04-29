import { useMemo } from 'react';
import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache, split } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import ws from 'isomorphic-ws';
import getCookie from '../lib/utils/getCookie';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: any;

const httpLink = new HttpLink({
  uri: process.env.BACKEND_URL_HTTP, // Server URL (must be absolute)
  credentials: 'include', // Additional fetch() options like `credentials` or `headers`
});

const wsLink = new GraphQLWsLink(
  createClient({
    webSocketImpl: ws,
    url: process.env.BACKEND_URL_WS!,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const authMiddleware = new ApolloLink((operation, forward) => {
  let jwt: string | null = null;
  if (typeof window !== 'undefined' && getCookie('uid') !== '') {
    jwt = `Bearer ${getCookie('uid')}`;

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: jwt,
      },
    }));
  }

  return forward(operation);
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, splitLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
