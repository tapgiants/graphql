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
