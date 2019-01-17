import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';
import wait from 'waait';
import { Mutation } from 'react-apollo';

import List from './support/components/List';
import { INDUSTRIES } from './support/gqlQueries';
import { CREATE_INDUSTRY } from './support/gqlMutations';
import { listMock } from './support/mocks/list';
import { createMock } from './support/mocks/create';

import { updateList } from '../src';

const mockedList = [
  { id: "3", name: "Arts & Crafts" },
  { id: "2", name: "Computer science" },
  { id: "1", name: "IT" }
];

const newItem = { id: "4", name: "Cinema" };

const updatedMockedList = [...[newItem], ...mockedList];

const mocks = [
  listMock({
    query: INDUSTRIES,
    dataList: mockedList,
    path: 'industries'
  }),
  createMock({
    query: CREATE_INDUSTRY,
    variables: { name: newItem.name },
    item: newItem,
    path: 'createIndustry'
  })
];

const AddIndustryButton = ({ updateList, industryName }) => (
  <Mutation
    mutation={CREATE_INDUSTRY}
    update={(cache, { data: { createIndustry: { industry } } }) => {
      updateList(
        cache,
        industry,
        INDUSTRIES,
        'industries'
      );
    }}>
    {(createIndustryMutation) => (
      <button
        onClick={() => {
          createIndustryMutation({
            variables: {
              input: {
                name: industryName
              }
            }
          })
        }}
      >Create industry
      </button>)}
  </Mutation>
);

test('adds item to a list', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <List
        query={INDUSTRIES}
        TestComponent={() =>
          <AddIndustryButton updateList={updateList} industryName={newItem.name} />
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

  component.root.findByType('tbody').findAllByType('tr').forEach((tr, index) => {
    const [id, name] = tr.children;

    expect(updatedMockedList[index].id).toBe(id.children[0]);
    expect(updatedMockedList[index].name).toBe(name.children[0]);
  });
});
