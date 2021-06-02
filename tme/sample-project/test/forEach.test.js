// @ts-nocheck

const assert = require('assert');
const { forEach } = require('../index');

let numbers;

beforeEach(() => {
  numbers = [1, 2, 3];
});

it('Should sum an array', () => {
  let total = 0;
  forEach(numbers, (value) => {
    total += value;
  });

  assert.strictEqual(total, 6);

  // testing that beforeEach works
  numbers.push(4);
});

it('beforeEach is ran each time', () => {
  assert.strictEqual(numbers.length, 3);
});