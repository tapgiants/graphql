import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from './ApolloClient';

const ApolloWrapper = ({ children, uri }) => (
  <div>
    <ApolloProvider client={ApolloClient(uri)}>
      {children}
    </ApolloProvider>
  </div>
);

export default ApolloWrapper;
