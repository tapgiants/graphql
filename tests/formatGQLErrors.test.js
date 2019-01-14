import { formatGQLErrors } from '../src';

test('Test formatGQLErrors', () => {
  expect(formatGQLErrors([
    { key: "name", message: "can't be blank" }
  ])).toEqual({ "name": "can't be blank" });
})
