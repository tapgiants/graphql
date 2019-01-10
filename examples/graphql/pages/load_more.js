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
