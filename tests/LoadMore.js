import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const INDUSTRIES = gql`
  query {
    industries {
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

const LoadMore = ({ loadMore }) => (
  <Query query={INDUSTRIES}>
    {({ loading, error, fetchMore, data: { industries } }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error}`;

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
            <button onClick={() => {
              loadMore(fetchMore, industries.pageInfo, 'industries', {}, 3)
            }}>Load more</button>
          )}
        </React.Fragment>
      )
    }}
  </Query>
);

export {
  INDUSTRIES,
  LoadMore
};
