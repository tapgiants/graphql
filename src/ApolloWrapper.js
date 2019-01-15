import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from './ApolloClient';

const ApolloWrapper = ({ children, uri }) => (
  <ApolloProvider client={ApolloClient(uri)}>
    {children}
  </ApolloProvider>
);

export default ApolloWrapper;
