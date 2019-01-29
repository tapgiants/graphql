import { createLink } from "apollo-absinthe-upload-link";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

export default (uri, headers = {}) => {
  if (!uri) throw new Error('Uri prop not passed to the ApolloWrapper component');

  let httpLinkOptions = { uri: uri, fetch };

  if (Object.keys(headers).length > 0) {
    httpLinkOptions.headers = headers;
  }

  const httpLink = createLink(httpLinkOptions);

  let apolloParams = { cache: new InMemoryCache(), link: httpLink };

  return new ApolloClient(apolloParams);
};
