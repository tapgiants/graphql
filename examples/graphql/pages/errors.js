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
            onClick={(e) => {
              e.preventDefault();

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
