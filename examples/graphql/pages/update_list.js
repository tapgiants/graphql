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
