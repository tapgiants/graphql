import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import wait from 'waait';

import { INDUSTRIES, CREATE_INDUSTRY, List } from './list';
import { updateList } from '../src';

const mockedList = [
  { id: "3", name: "Arts & Crafts" },
  { id: "2", name: "Computer science" },
  { id: "1", name: "IT" }
];

const newItem = { id: "4", name: "Cinema" };

const updatedMockedList = [...[newItem], ...mockedList];

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
            endCursor: "1",
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: "3"
          },
          totalCount: 3
        }
      }
    }
  },
  {
    request: {
      query: CREATE_INDUSTRY,
      variables: { input: { name: "Cinema" } }
    },
    result: {
      data: {
        createIndustry: {
          industry: newItem,
          errors: null
        }
      }
    }
  }
];

test('adds item to a list', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <List updateList={updateList} />
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

  component.root.findByType('tbody').findAllByType('tr').forEach((tr, index) => {
    const [id, name] = tr.children;

    expect(updatedMockedList[index].id).toBe(id.children[0]);
    expect(updatedMockedList[index].name).toBe(name.children[0]);
  });
});
