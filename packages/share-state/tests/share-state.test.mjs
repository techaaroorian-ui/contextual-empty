import test from 'node:test';
import assert from 'node:assert/strict';
import {
  encodeShareState,
  decodeShareState,
  createShareUrl,
  decodeFromHash,
  COMPRESSED_PREFIX,
  UNCOMPRESSED_PREFIX,
} from '../dist/index.js';

test('roundtrip: compressed state encodes and decodes accurately', async () => {
  const original = {
    title: 'Modern Architecture',
    code: '<div class="bg-indigo-600 p-8 text-white rounded-xl">Hello ✧ Atelier</div>',
    tags: ['social', 'card'],
    count: 42,
    active: true,
  };

  const encoded = await encodeShareState(original);
  assert.ok(encoded.startsWith(COMPRESSED_PREFIX));

  const decoded = await decodeShareState(encoded);
  assert.deepEqual(decoded, original);
});

test('roundtrip: uncompressed state encodes and decodes accurately', async () => {
  const original = {
    simple: 'payload',
    number: 123,
  };

  const encoded = await encodeShareState(original, { compress: false });
  assert.ok(encoded.startsWith(UNCOMPRESSED_PREFIX));

  const decoded = await decodeShareState(encoded);
  assert.deepEqual(decoded, original);
});

test('createShareUrl and decodeFromHash work seamlessly', async () => {
  const payload = { preset: 'linkedin', theme: 'obsidian' };
  const url = await createShareUrl(payload, 'https://example.com/app');

  assert.ok(url.startsWith('https://example.com/app#share='));

  const hash = url.slice(url.indexOf('#'));
  const extracted = await decodeFromHash(hash);
  assert.deepEqual(extracted, payload);
});

test('error handling: corrupted state throws ShareStateError', async () => {
  await assert.rejects(
    async () => {
      await decodeShareState('v1z.not-valid-base64!!!');
    },
    { name: 'ShareStateError' }
  );
});
