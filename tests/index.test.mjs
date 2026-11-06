import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('parses short hexadecimal', () => {
  assert.deepEqual(api.parseCssColor('#0f8'), { r: 0, g: 1, b: 136 / 255 });
});
test('parses uppercase long hexadecimal', () => {
  assert.deepEqual(api.parseCssColor('#FF8000'), { r: 1, g: 128 / 255, b: 0 });
});
test('parses comma RGB bytes', () => {
  assert.deepEqual(api.parseCssColor('rgb(12, 34, 56)'), { r: 12 / 255, g: 34 / 255, b: 56 / 255 });
});
test('trims syntax whitespace inside RGB', () => {
  assert.equal(api.parseCssColor('rgb( 1 , 2 , 3 )').b, 3 / 255);
});
test('rejects unsupported names and alpha', () => {
  assert.throws(() => api.parseCssColor('red'), TypeError);
  assert.throws(() => api.parseCssColor('#abcd'), TypeError);
});
test('rejects out of range byte', () => {
  assert.throws(() => api.parseCssColor('rgb(256,0,0)'), RangeError);
});
