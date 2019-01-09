## Installation

Install peer dependencies:
```bash
yarn add graphql react-apollo apollo-boost recompose
```

Install @tapgiants/graphql

```bash
yarn add @tapgiants/graphql
```

## Usage

### How to perform simple query with the ApolloWrapper component

```jsx
import React from 'react';
import { ApolloWrapper } from '@tapgiants/graphql';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const INDUSTRIES = gql`
  query {
    industries {
      list {
        id
        name
      }
    }
  }
`;

export default () => (
  <ApolloWrapper uri="http://localhost:4001/api">
    <Query query={INDUSTRIES}>
      {({ loading, data: { industries } }) => {
        if (loading) return 'Loading...';

        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {industries.list.map((industriy, index) => (
                <tr key={index}>
                  <td>{industriy.id}</td>
                  <td>{industriy.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }}
    </Query>
  </ApolloWrapper>
);
```

## ApolloWrapper API

### Props

#### `uri: String`


## Development

Link the package from your target project and run `yarn start`. This will start the webpacker watcher.

Once you are satisfied with your changes, use `yarn publish` to push the new version to npmjs.org.
