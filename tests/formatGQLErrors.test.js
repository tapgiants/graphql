import { formatGQLErrors } from '../src';

test('transforms errors array to key/value object', () => {
  expect(formatGQLErrors([
    { key: "name", message: "can't be blank" }
  ])).toEqual({ "name": "can't be blank" });
});


test('transforms empty errors array to an object', () => {
  expect(formatGQLErrors([])).toEqual({});
});
