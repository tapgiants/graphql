import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from './ApolloClient';

const ApolloWrapper = ({ children, uri, headers }) => (
  <ApolloProvider client={ApolloClient(uri, headers)}>
    {children}
  </ApolloProvider>
);

ApolloWrapper.defaultProps = {
  headers: {}
};

export default ApolloWrapper;
