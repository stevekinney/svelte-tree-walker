import { it, expect, vi } from 'vitest';
import { walk, createNode } from './';

it('should start at the root node', () => {
  const node = createNode('root');
  const nodes = walk(node);

  expect.assertions(1);

  for (const n of nodes) {
    expect(n).toBe(node);
  }
});

it('should yield all nodes', () => {
  const node = createNode('root', {
    children: [createNode('first'), createNode('second')],
  });

  const nodes = walk(node);

  const fn = vi.fn();

  for (const n of nodes) {
    fn(n.type);
  }

  expect(fn).toHaveBeenCalledTimes(3);
  expect(fn).toHaveBeenCalledWith('root');
  expect(fn).toHaveBeenCalledWith('first');
  expect(fn).toHaveBeenCalledWith('second');
});

it('should be able to filter by type', () => {
  const fn = vi.fn();
  const node = createNode('root', {
    children: [createNode('first'), createNode('second')],
  });

  expect.assertions(4);

  const nodes = walk(node, 'first');

  for (const n of nodes) {
    fn(n.type);
    expect(n.type).toBe('first');
  }

  expect(fn).toHaveBeenCalledWith('first');
  expect(fn).not.toHaveBeenCalledWith('root');
  expect(fn).not.toHaveBeenCalledWith('second');
});
