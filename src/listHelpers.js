const updateList = (cache, newItem, query, path) => {
  const data = cache.readQuery({ query: query });

  cache.writeQuery({
    query: query,
    data: {
      [path]: {
        __typename: data[path].__typename,
        list: [...[newItem], ...data[path].list],
        totalCount: data[path].totalCount,
        pageInfo: data[path].pageInfo
      }
    }
  });
}

const deleteFromList = (cache, query, path, deleteCondition) => {
  const data = cache.readQuery({ query: query });

  cache.writeQuery({
    query: query,
    data: {
      [path]: {
        __typename: data[path].__typename,
        list: data[path].list.filter((item) => !deleteCondition(item)),
        totalCount: data[path].totalCount - 1,
        pageInfo: data[path].pageInfo
      }
    }
  });
}

const loadMore = (fetchMore, pageInfo, path, moreVars, first = 10) => {
  fetchMore({
    variables: { input: { ...moreVars, ...{ first: first, after: pageInfo.endCursor } } },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const newResult = fetchMoreResult[path].list;
      const newPageInfo = fetchMoreResult[path].pageInfo;
      const totalCount = fetchMoreResult[path].totalCount;

      return newResult.length
        ? {
          [path]: {
            __typename: previousResult[path].__typename,
            list: [...previousResult[path].list, ...newResult],
            totalCount,
            pageInfo: newPageInfo
          }
        }
        : previousResult
    }
  });
}

export {
  updateList,
  deleteFromList,
  loadMore
};
