import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import wait from 'waait';

import { INDUSTRIES, DELETE_INDUSTRY, DeleteList } from './Deletelist';
import { deleteFromList } from '../src';

const mockedList = [
  { id: "3", name: "Arts & Crafts" },
  { id: "2", name: "Computer science" },
  { id: "1", name: "IT" }
];

const deletedItem = mockedList[0];

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
      query: DELETE_INDUSTRY,
      variables: { input: { id: deletedItem.id } }
    },
    result: {
      data: {
        deleteIndustry: {
          industry: deletedItem,
          errors: null
        }
      }
    }
  }
];

test('deletes item from a list', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeleteList industryId={deletedItem.id} deleteFromList={deleteFromList} />
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

  const updatedList =
    component.root.findByType('tbody').findAllByType('tr').map((tr, index) => {
      const [id, name] = tr.children;
      return { id: id.children[0], name: name.children[0] };
    });

  expect(updatedList).toEqual(
    expect.not.arrayContaining([deletedItem])
  );
});
