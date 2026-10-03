import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateFiles } from '../dist/index.js';
const file = (name, size = 10, type = 'image/png') => ({ name, size, type });
test('valid batches preserve original file references', () => {
  const input = file('cover.png');
  assert.equal(validateFiles([input], { maxFiles: 5, maxFileBytes: 10 }, 4).accepted[0], input);
});
test('one invalid file rejects the complete batch before resource allocation', () => {
  const result = validateFiles([file('good.png'), file('large.png', 11)], { maxFileBytes: 10 });
  assert.equal(result.accepted.length, 0); assert.equal(result.errors[0].code, 'size');
});
test('quota includes existing assets and emits a structured count error', () => {
  const result = validateFiles([file('a'), file('b')], { maxFiles: 5 }, 4);
  assert.equal(result.errors[0].code, 'count'); assert.equal(result.accepted.length, 0);
});
test('MIME patterns and case-insensitive extensions are supported', () => {
  assert.equal(validateFiles([file('a.PNG', 1, '')], { accept: ['.png'] }).accepted.length, 1);
  assert.equal(validateFiles([file('a')], { accept: ['image/*'] }).accepted.length, 1);
  assert.equal(validateFiles([file('a')], { accept: ['application/pdf'] }).errors[0].code, 'type');
});
test('invalid limits throw and invalid metadata rejects; empty selection is harmless', () => {
  assert.throws(() => validateFiles([], { maxFiles: -1 }));
  assert.throws(() => validateFiles([], {}, -1));
  assert.equal(validateFiles([file('a', NaN)]).errors[0].code, 'metadata');
  assert.deepEqual(validateFiles([], { maxFiles: 0 }, 3), { accepted: [], errors: [] });
});
