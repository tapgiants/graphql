import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import wait from 'waait';

import { INDUSTRIES, LoadMore } from './LoadMore';
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
  {
    request: {
      query: INDUSTRIES
    },
    result: {
      data: {
        industries: {
          list: mockedList,
          pageInfo: {
            endCursor: "4",
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "6"
          },
          totalCount: 6
        }
      }
    }
  },
  {
    request: {
      query: INDUSTRIES,
      variables: { input: { first: 3, after: "4" } }
    },
    result: {
      data: {
        industries: {
          list: loadedItems,
          pageInfo: {
            endCursor: "1",
            hasNextPage: false,
            hasPreviousPage: true,
            startCursor: "3"
          },
          totalCount: 6
        }
      }
    }
  }
];

test('loads items in a list', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LoadMore loadMore={loadMore} />
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
