import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import wait from 'waait';
import { Mutation } from 'react-apollo';

import List from './support/components/List';
import { INDUSTRIES } from './support/gqlQueries';
import { DELETE_INDUSTRY } from './support/gqlMutations';
import { listMock } from './support/mocks/list';
import { deleteMock } from './support/mocks/delete';

import { deleteFromList } from '../src';

const mockedList = [
  { id: "3", name: "Arts & Crafts" },
  { id: "2", name: "Computer science" },
  { id: "1", name: "IT" }
];

const deletedItem = mockedList[0];

const mocks = [
  listMock({
    query: INDUSTRIES,
    dataList: mockedList,
    path: 'industries'
  }),
  deleteMock({
    query: DELETE_INDUSTRY,
    variables: { id: deletedItem.id },
    item: deletedItem,
    path: 'deleteIndustry'
  })
];

const DeleteItemButton = ({ deleteFromList, industryId }) => (
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
      <button
        onClick={() => {
          deleteIndustryMutation({
            variables: {
              input: {
                id: industryId
              }
            }
          })
        }}
      >Delete industry
      </button>)}
  </Mutation>
);

test('deletes item from a list', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <List
        query={INDUSTRIES}
        TestComponent={() =>
          <DeleteItemButton
            deleteFromList={deleteFromList}
            industryId={deletedItem.id}
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

  const updatedList =
    component.root.findByType('tbody').findAllByType('tr').map((tr, index) => {
      const [id, name] = tr.children;
      return { id: id.children[0], name: name.children[0] };
    });

  expect(updatedList).toEqual(
    expect.not.arrayContaining([deletedItem])
  );
});
