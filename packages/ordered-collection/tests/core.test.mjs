import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCollection, reduceCollection } from '../dist/index.js';
test('insert a duplicate payload with a new ID after its source and select it', () => {
  const source = { id: 'a', name: 'Cover', code: '<h1>Hello</h1>' };
  const state = createCollection([source, { id: 'b' }]);
  const next = reduceCollection(state, { type: 'insert', afterId: 'a', item: { ...source, id: 'copy' } });
  assert.deepEqual(next.items.map(x => x.id), ['a', 'copy', 'b']);
  assert.equal(next.selectedId, 'copy'); assert.equal(next.items[1].code, source.code);
  assert.equal(state.items.length, 2);
});
test('removal selects next, then previous, and respects minimum', () => {
  const initial = createCollection([{ id: 'a' }, { id: 'b' }, { id: 'c' }], 'b');
  const next = reduceCollection(initial, { type: 'remove', id: 'b' }, { minItems: 1 });
  assert.equal(next.selectedId, 'c');
  const last = reduceCollection(next, { type: 'remove', id: 'c' }, { minItems: 1 });
  assert.equal(last.selectedId, 'a');
  assert.equal(reduceCollection(last, { type: 'remove', id: 'a' }, { minItems: 1 }), last);
});
test('move preserves selected identity and data', () => {
  const state = createCollection([{ id: 'a' }, { id: 'b' }, { id: 'c' }], 'b');
  const next = reduceCollection(state, { type: 'move', id: 'b', toIndex: 0 });
  assert.deepEqual(next.items.map(x => x.id), ['b', 'a', 'c']); assert.equal(next.selectedId, 'b');
});
test('capacity, missing targets and malformed identities cannot corrupt state', () => {
  const state = createCollection([{ id: 'a' }]);
  assert.equal(reduceCollection(state, { type: 'insert', item: { id: 'b' } }, { maxItems: 1 }), state);
  assert.equal(reduceCollection(state, { type: 'select', id: 'missing' }), state);
  assert.equal(reduceCollection(state, { type: 'insert', afterId: 'missing', item: { id: 'b' } }), state);
  assert.throws(() => createCollection([{ id: 'a' }, { id: 'a' }]));
  assert.throws(() => reduceCollection(state, { type: 'insert', item: { id: 'a' } }));
  assert.throws(() => createCollection([], null, { minItems: -1 }));
});
