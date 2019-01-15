import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import renderer from 'react-test-renderer';
import { ApolloWrapper } from '../src';

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
