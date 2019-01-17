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

const DeleteIndustryButton = ({ deleteFromList, industryId }) => (
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
      <button
        onClick={() => {
          deleteIndustryMutation({
            variables: {
              input: {
                id: industryId
              }
            }
          })
        }}
      >Delete industry
      </button>)}
  </Mutation>
);

const DeleteList = ({ deleteFromList, industryId }) => (
  <Query query={INDUSTRIES}>
    {({ loading, error, data: { industries } }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error}`;

      return (
        <React.Fragment>
          <DeleteIndustryButton deleteFromList={deleteFromList} industryId={industryId} />

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
  DELETE_INDUSTRY,
  DeleteList
};
