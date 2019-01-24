import gql from 'graphql-tag';

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

export {
  DELETE_INDUSTRY,
  CREATE_INDUSTRY
}
