const deleteMock = ({ query, variables, item, path }) => (
  {
    request: {
      query: query,
      variables: { input: variables }
    },
    result: {
      data: {
        [path]: {
          industry: item,
          errors: null
        }
      }
    }
  }
);

export {
  deleteMock
};
