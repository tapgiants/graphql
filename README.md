# What is @tapgiants/graphql

@tapgiants/graphql package is an wrapper around [Apollo](https://www.apollographql.com/docs/react).
The main goal of the package is to provide easy setup, cache and error formatting helpers.

## Installation

Install peer dependencies:
```bash
yarn add graphql react-apollo apollo-boost recompose
```

Install @tapgiants/graphql

```bash
yarn add @tapgiants/graphql
```

## ApolloWrapper API

### Props

#### `uri: String`

The uri prop is a string endpoint to a GraphQL server.

#### `headers: Object`

The headers props is added to the request headers.

### ApolloWrapper example

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
  <ApolloWrapper
    uri="http://localhost:4001/api"
    headers={{ Authorization: `Bearer token` }}>
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

## Errors API

### formatGQLErrors(errors: Array):Object
>An errors array returned from the server should follow the GraphQL convetions described in the [*GraphQL conventions*](#graphql-conventions) section

Transforms an errors array to a key value object.

#### Arguments

**errors**: Array - Array with errors.

```js
[{ key: "name", message: "can't be blank"}]
```

**Returns** key value object where the key is the name of the field and
the value is the error message.

```js
{ name: "can't be blank" }
```

### formatGQLErrors example

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

## List API
All of the following functions require the usage of the *@connection* directive described
in the Apollo [docs](https://www.apollographql.com/docs/react/features/pagination.html#connection-directive).

>In order to manage a list(update, delete, paginate) check out the GraphQL list conventions described in the [*GraphQL conventions*](#graphql-conventions) section

### updateList(cache: DataProxy, newItem: Object, query: Object, path: String):void

Adds a new item at the beginning of the list.

#### Arguments

**cache**: DataProxy - The cache argument is provided by Apollo. Apollo [reference](https://www.apollographql.com/docs/react/essentials/mutations.html#update).

**newItem**: Object - The item that will be added.

**query**: Object - A GrahqQL query created with the [`graphql-tag`](https://github.com/apollographql/graphql-tag) package used previously to fetch the list. The query is used to find the result set in the cache. In order to use just the query without the query variables use the [`@connection`](https://www.apollographql.com/docs/react/features/pagination.html#connection-directive) directive. For more info check out the [`Common arguments examples`](#query-argument) section.

**path**: String - The key under which the list result is nested. For more info check out the [`Common arguments examples`](#path-argument) section.

### updateList example
```jsx
import React from 'react';
import { ApolloWrapper, updateList } from '@tapgiants/graphql';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const INDUSTRIES = gql`
  query {
    industries @connection(key: "industries") {
      list {
        id
        name
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

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

const AddIndustryButton = ({ industryName }) => (
  <Mutation
    mutation={CREATE_INDUSTRY}
    update={(cache, { data: { createIndustry: { industry } } }) => {
      updateList(
        cache,
        industry,
        INDUSTRIES,
        'industries'
      )
    }}>
    {(createIndustryMutation) => (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();

          createIndustryMutation({
            variables: {
              input: {
                name: industryName
              }
            }
          })
        }}
      >Create industry
      </a>)}
  </Mutation>
);

export default () => (
  <ApolloWrapper uri="http://localhost:4001/api">
    <Query query={INDUSTRIES}>
      {({ loading, data: { industries } }) => {
        if (loading) return 'Loading...';

        return (
          <React.Fragment>
            <AddIndustryButton industryName="Cinema" />

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>

              <tbody>
                {industries.list.map((industry, index) => (
                  <tr key={index}>
                    <td>{industry.id}</td>
                    <td>{industry.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )
      }}
    </Query>
  </ApolloWrapper>
);
```

### deleteFromList(cache: DataProxy, query: Object, path: String, deleteCondition: Function):void

Deletes an item from the list.

#### Arguments

**cache**: DataProxy - The cache argument is provided by Apollo. Apollo [reference](https://www.apollographql.com/docs/react/essentials/mutations.html#update).

**query**: Object - A GrahqQL query created with the [`graphql-tag`](https://github.com/apollographql/graphql-tag) package used previously to fetch the list. The query is used to find the result set in the cache. In order to use just the query without the query variables use the [`@connection`](https://www.apollographql.com/docs/react/features/pagination.html#connection-directive) directive. For more info check out the [`Common arguments examples`](#query-argument) section.

**path**: String - The key under which the list result is nested. For more info check out the [`Common arguments examples`](#path-argument) section.

**deleteCondition**: Function: Boolean - A callback function used to find the element that we want to remove from the cache. Receives item as an argument from the cached list in order to test the callback result. If the callback return true the item will be deleted.

Example:
```js
(industry) => industry.id == id
```

### deleteFromList example

```jsx
import React from 'react';
import { ApolloWrapper, deleteFromList, formatGQLErrors } from '@tapgiants/graphql';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const INDUSTRIES = gql`
  query {
    industries @connection(key: "industries") {
      list {
        id
        name
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const DELETE_INDUSTRY = gql`
  mutation($input: IdInput!) {
    deleteIndustry(input: $input) {
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

const DeleteIndustryButton = ({ industryId }) => (
  <Mutation
    mutation={DELETE_INDUSTRY}
    update={(cache, { data: { deleteIndustry: { industry, errors } } }) => {
      if (errors) {
        console.log(formatGQLErrors(errors));
      } else {
        deleteFromList(
          cache,
          INDUSTRIES,
          'industries',
          (item) => item.id == industry.id
        );
      }
    }}>
    {(deleteIndustryMutation) => (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();

          deleteIndustryMutation({
            variables: {
              input: {
                id: industryId
              }
            }
          })
        }}
      >Delete industry
      </a>)}
  </Mutation>
);

export default () => (
  <ApolloWrapper uri="http://localhost:4001/api">
    <Query query={INDUSTRIES}>
      {({ loading, data: { industries } }) => {
        if (loading) return 'Loading...';

        return (
          <React.Fragment>
            {Array.isArray(industries.list) && <DeleteIndustryButton industryId={industries.list[0].id} />}

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>

              <tbody>
                {industries.list.map((industry, index) => (
                  <tr key={index}>
                    <td>{industry.id}</td>
                    <td>{industry.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )
      }}
    </Query>
  </ApolloWrapper>
);
```

### loadMore(fetchMore: Function, pageInfo: Object, path: String, moreVars: Object, first: Integer):void

Loads items at the end of the list. Uses cursor-based pagination.

#### Arguments

**fetchMore**: Function - Provided by [Apollo](https://www.apollographql.com/docs/react/advanced/caching.html#fetchMore).

**pageInfo**: Object - The shape of the pageInfo is described in the [`GraphQL conventions`](#graphql-conventions) section.

**path**: String - The key under which the list result is nested. For more info check out the[`Common arguments examples`](#path-argument) section.

**moreVars**: Object - Additional query variables.

**first**: Integer, Default: 10 - The number of items that will be returned from the GraphQL server.

### loadMore example
```jsx
import React from 'react';
import { ApolloWrapper, loadMore } from '@tapgiants/graphql';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const INDUSTRIES = gql`
  query($input: ListInput) {
    industries(input: $input) @connection(key: "industries") {
      list {
        id
        name
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export default () => (
  <ApolloWrapper uri="http://localhost:4001/api">
    <Query query={INDUSTRIES} variables={{ input: { first: 10, after: '', before: '' } }}>
      {({ loading, fetchMore, data: { industries } }) => {
        if (loading) return 'Loading...';

        return (
          <React.Fragment>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>

              <tbody>
                {industries.list.map((industry, index) => (
                  <tr key={index}>
                    <td>{industry.id}</td>
                    <td>{industry.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {industries.pageInfo.hasNextPage && (
              <a href="#" onClick={(e) => {
                e.preventDefault();
                loadMore(fetchMore, industries.pageInfo, 'industries', {}, 10)
              }}>Load more</a>
            )}
          </React.Fragment>
        )
      }}
    </Query>
  </ApolloWrapper>
);
```

### Common arguments examples:

## query argument

Example:
```js
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
```

## path argument

Example:

Apollo will use the query name as a namespace of the result.
The query in the example bellow is named `industries` so the namespace in the result will be `industries` too.

```js
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
```

The result will be with the following shape:
```js
{
  data: {
    industries: {
      list: [...]
    }
  }
}
```

In this case the `path` argument should be `industries`.

## GraphQL conventions

Add link to an external repo that describes all the conventions.

## Development

Link the package from your target project and run `yarn start`. This will start the webpacker watcher.

Once you are satisfied with your changes, use `yarn publish` to push the new version to npmjs.org.
