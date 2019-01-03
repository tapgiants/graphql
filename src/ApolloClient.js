import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

export default (uri) => {
  const httpLink = createHttpLink({ uri: uri, fetch });

  let apolloParams = { cache: new InMemoryCache(), link: httpLink };
  return new ApolloClient(apolloParams);
};
