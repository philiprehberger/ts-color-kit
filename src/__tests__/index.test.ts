import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('color-kit', () => {
  it('should export Color', () => {
    assert.ok(mod.Color);
  });

  it('should export color', () => {
    assert.ok(mod.color);
  });
});
