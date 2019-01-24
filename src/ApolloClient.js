import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

export default (uri, headers = {}) => {
  // TODO: throw exception if uri is not set. Add test

  let httpLinkOptions = { uri: uri, fetch }

  if (Object.keys(headers).length > 0) {
    httpLinkOptions.headers = headers;
  }

  const httpLink = createHttpLink(httpLinkOptions);

  let apolloParams = { cache: new InMemoryCache(), link: httpLink };
  return new ApolloClient(apolloParams);
};
