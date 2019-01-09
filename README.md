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

The uri prop is a string endpoint to a GraphQL server

### How to format errors returned from the GraphQL server

```js
import React from 'react';
import { ApolloWrapper, formatGQLErrors } from '@tapgiants/graphql';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_INDUSTRY = gql`
  mutation($input: IndustryInput!) {
    createIndustry(input: $input) {
      industry {
        id
        name
      }

      errors {
        key
        message
      }
    }
  }
`;

export default () => (
  <ApolloWrapper uri="http://localhost:4001/api">
    <Mutation mutation={CREATE_INDUSTRY}>
      {(createIndustryMutation) => {

        return (
          <a
            href="#"
            onClick={() => {
              createIndustryMutation({
                variables: {
                  input: {
                    name: ''
                  }
                }
              }).then(({ data: { createIndustry: { industry, errors } } }) => {
                console.log('Errors object returned from the server', errors);
                // Errors object returned from the server
                // [{ key: "name", message: "can't be blank"}]


                const formattedErrors = formatGQLErrors(errors);
                console.log('Formatted errors', formattedErrors);
                // Formatted errors
                // { name: "can't be blank" }
              });
            }}
          >Create industry
          </a>);
      }}
    </Mutation>
  </ApolloWrapper>
);
```

### formatGQLErrors(Array):Object function
>Errors array should follow the GraphQL convetions described in the *GraphQL conventions* section

Accepts array which represnets the GraphQL errors with the following format.
```js
[{ key: "name", message: "can't be blank"}]
```

Returns key value object where the key is the name of the field and
the value is the error.

```js
{ name: "can't be blank" }
```

## GraphQL conventions

Add link to an external repo that describes all the conventions.

## Development

Link the package from your target project and run `yarn start`. This will start the webpacker watcher.

Once you are satisfied with your changes, use `yarn publish` to push the new version to npmjs.org.
