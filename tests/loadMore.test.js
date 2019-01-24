import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import wait from 'waait';

import List from './support/components/List';
import { INDUSTRIES } from './support/gqlQueries';
import { listMock, listLoadMore } from './support/mocks/list';
import { loadMore } from '../src';

const mockedList = [
  { id: "6", name: "Food" },
  { id: "5", name: "Pharmacy" },
  { id: "4", name: "Transport" }
];

const loadedItems = [
  { id: "3", name: "Arts & Crafts" },
  { id: "2", name: "Computer science" },
  { id: "1", name: "IT" }
];

const mocks = [
  listMock({
    query: INDUSTRIES,
    dataList: mockedList,
    path: 'industries',
    hasNextPage: true
  }),
  listLoadMore({
    query: INDUSTRIES,
    dataList: loadedItems,
    path: 'industries',
    variables: { first: 3, after: "4" }
  })
];

const LoadMoreBtn = ({ industries, loadMore, fetchMore }) => (
  <React.Fragment>
    {industries.pageInfo.hasNextPage && (
      <button onClick={() => {
        loadMore(fetchMore, industries.pageInfo, 'industries', {}, 3)
      }}>Load more</button>
    )}
  </React.Fragment>
);

test('loads items in a list', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <List
        query={INDUSTRIES}
        TestComponent={({ data, fetchMore }) =>
          <LoadMoreBtn
            industries={data}
            fetchMore={fetchMore}
            loadMore={loadMore}
          />
        }
      />
    </MockedProvider>
  );

  await wait(0);

  component.root.findByType('tbody').findAllByType('tr').forEach((tr, index) => {
    const [id, name] = tr.children;

    expect(mockedList[index].id).toBe(id.children[0]);
    expect(mockedList[index].name).toBe(name.children[0]);
  });

  const button = component.root.findByType('button');

  button.props.onClick();
  await wait(0);

  const allItems = [...mockedList, ...loadedItems];
  component.root.findByType('tbody').findAllByType('tr').forEach((tr, index) => {
    const [id, name] = tr.children;

    expect(allItems[index].id).toBe(id.children[0]);
    expect(allItems[index].name).toBe(name.children[0]);
  });
});
