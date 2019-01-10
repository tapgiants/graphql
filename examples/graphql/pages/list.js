import React from 'react';
import { ApolloWrapper } from '@tapgiants/graphql';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const INDUSTRIES = gql`
  query {
    industries @connection(key: "industries") {
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
              {industries.list.map((industry, index) => (
                <tr key={index}>
                  <td>{industry.id}</td>
                  <td>{industry.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }}
    </Query>
  </ApolloWrapper>
);
