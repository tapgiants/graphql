const listMock = ({ query, dataList, path, hasNextPage = false, hasPreviousPage = false }) => (
  {
    request: {
      query: query
    },
    result: {
      data: {
        [path]: {
          list: dataList,
          pageInfo: {
            endCursor: dataList[dataList.length - 1].id,
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
            startCursor: dataList[0].id
          },
          totalCount: dataList.length
        }
      }
    }
  }
);

const listLoadMore = ({
  query,
  dataList,
  path,
  variables,
  hasNextPage = false,
  hasPreviousPage = true
}) => (
    {
      request: {
        query: query,
        variables: { input: variables }
      },
      result: {
        data: {
          [path]: {
            list: dataList,
            pageInfo: {
              endCursor: dataList[dataList.length - 1].id,
              hasNextPage: hasNextPage,
              hasPreviousPage: hasPreviousPage,
              startCursor: dataList[0].id
            },
            totalCount: dataList.length
          }
        }
      }
    }
  );

export {
  listMock,
  listLoadMore
};
