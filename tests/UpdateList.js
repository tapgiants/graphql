import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const AddIndustryButton = ({ updateList, industryName }) => (
  <Mutation
    mutation={CREATE_INDUSTRY}
    update={(cache, { data: { createIndustry: { industry } } }) => {
      updateList(
        cache,
        industry,
        INDUSTRIES,
        'industries'
      );
    }}>
    {(createIndustryMutation) => (
      <button
        onClick={() => {
          createIndustryMutation({
            variables: {
              input: {
                name: industryName
              }
            }
          })
        }}
      >Create industry
      </button>)}
  </Mutation>
);

const UpdateList = ({ updateList }) => (
  <Query query={INDUSTRIES}>
    {({ loading, error, data: { industries } }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error}`;

      return (
        <React.Fragment>
          <AddIndustryButton updateList={updateList} industryName="Cinema" />

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
);

export {
  INDUSTRIES,
  CREATE_INDUSTRY,
  UpdateList
};
