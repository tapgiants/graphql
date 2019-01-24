import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import renderer from 'react-test-renderer';
import { ApolloWrapper } from '../src';

// Temporary hack that prevents the errors from printing using console.error
// https://github.com/facebook/react/issues/11098#issuecomment-370614347
beforeEach(() => {
  jest.spyOn(console, 'error')
  global.console.error.mockImplementation(() => { });
});

afterEach(() => {
  global.console.error.mockRestore();
});
// Hack end

test('creates ApolloWrapper with uri', () => {
  const component = renderer.create(
    <ApolloWrapper uri="http://localhost:4001/api">
      <ApolloConsumer>
        {_client => <React.Fragment />}
      </ApolloConsumer>
    </ApolloWrapper>
  ).toTree();

  expect(component.rendered.props.client).toBeInstanceOf(ApolloClient)
});

import * as ApolloClientM from '../src/ApolloClient';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

test('creates ApolloWrapper with uri and headers', () => {
  const uri = 'http://localhost:4001/api';
  const headers = { Authorization: `Bearer token` };

  // keep the original copy in order to restore it
  const mockedFunction = ApolloClientM.default;

  ApolloClientM.default = jest.fn(() => new ApolloClient({
    link: createHttpLink({ uri: uri, fetch }),
    cache: new InMemoryCache()
  }));

  renderer.create(
    <ApolloWrapper
      uri={uri}
      headers={headers}>
      <ApolloConsumer>
        {_client => <React.Fragment />}
      </ApolloConsumer>
    </ApolloWrapper>
  ).toTree();

  expect(ApolloClientM.default).toBeCalledWith(uri, headers);

  // Restore mocke
  ApolloClientM.default = mockedFunction;
});

test('ApolloWrapper throws an error when uri prop is not defined', () => {
  const ApolloWrapperTest = () => renderer.create(
    <ApolloWrapper>
      <ApolloConsumer>
        {_client => <React.Fragment />}
      </ApolloConsumer>
    </ApolloWrapper>
  );

  expect(ApolloWrapperTest).toThrow('Uri prop not passed to the ApolloWrapper component');
});
