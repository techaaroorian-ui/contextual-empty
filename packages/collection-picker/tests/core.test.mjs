import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPicker, reducePicker, reconcilePicker } from '../dist/index.js';
const items = [{ id: 'a', label: 'Amber' }, { id: 'x', label: 'Blocked', disabled: true }, { id: 'b', label: 'Blue' }, { id: 'c', label: 'Bronze' }];
test('navigation skips disabled options and selection is explicit', () => {
  let state = createPicker(items);
  state = reducePicker(state, { type: 'navigate', direction: 'next' }, items);
  assert.equal(state.activeId, 'b'); assert.equal(state.selectedId, null);
  state = reducePicker(state, { type: 'select' }, items); assert.equal(state.selectedId, 'b');
  assert.equal(reducePicker(state, { type: 'select', id: 'x' }, items).selectedId, 'b');
});
test('filtering preserves committed selection and reconciles active options', () => {
  let state = createPicker(items, 'a');
  state = reducePicker(state, { type: 'query', query: 'bl' }, items);
  assert.equal(state.activeId, 'b'); assert.equal(state.selectedId, 'a');
  state = reducePicker(state, { type: 'query', query: 'no match' }, items);
  assert.equal(state.activeId, null);
  assert.equal(reducePicker(state, { type: 'select' }, items).selectedId, 'a');
});
test('typeahead cycles repeated initial letters and supports prefixes', () => {
  let state = createPicker(items);
  state = reducePicker(state, { type: 'typeahead', text: 'b', time: 1000 }, items);
  assert.equal(state.activeId, 'b');
  state = reducePicker(state, { type: 'typeahead', text: 'b', time: 1100 }, items);
  assert.equal(state.activeId, 'c');
  state = reducePicker(state, { type: 'typeahead', text: 'b', time: 2000 }, items);
  state = reducePicker(state, { type: 'typeahead', text: 'r', time: 2100 }, items);
  assert.equal(state.activeId, 'c');
});
test('item removal and disabled changes clear invalid selection', () => {
  const state = createPicker(items, 'b');
  assert.equal(reconcilePicker(state, items.filter(item => item.id !== 'b')).selectedId, null);
  assert.equal(reconcilePicker(state, items.map(item => ({ ...item, disabled: true }))).activeId, null);
  assert.throws(() => createPicker([{ id: 'a', label: 'A' }, { id: 'a', label: 'Other' }]));
});
