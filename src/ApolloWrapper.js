import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from './ApolloClient';

const ApolloWrapper = ({ children, uri, headers, customFetch }) => (
  <ApolloProvider client={ApolloClient(uri, headers, customFetch)}>
    {children}
  </ApolloProvider>
);

ApolloWrapper.defaultProps = {
  headers: {},
  customFetch: undefined,
};

export default ApolloWrapper;
