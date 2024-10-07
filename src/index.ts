export type Node<T extends string | undefined = undefined> = {
  type: T extends string ? T : string;
  start: number;
  end: number;
  children?: Node[];
};

const isNodeType = <T extends string | undefined>(
  node: Node<T>,
  type: T,
): node is Node<T> => {
  if (!type) return true;
  return node.type === type;
};

export function* walk<T extends string | undefined>(
  node: Node | unknown,
  type: T | undefined = undefined,
): Generator<Node<T>> {
  if (!isNode(node)) throw new Error('Invalid node');

  if (isNodeType(node, type)) {
    yield node as Node<T>;
  }

  if (node.children) {
    for (const child of node.children) {
      yield* walk(child, type);
    }
  }
}

export function isNode(node: unknown): node is Node {
  if (!node) return false;
  if (typeof node !== 'object') return false;
  if (typeof (node as Node).type !== 'string') return false;
  if (typeof (node as Node).start !== 'number') return false;
  if (typeof (node as Node).end !== 'number') return false;
  return true;
}

export const createNode = (
  type: string,
  { start = 0, end = 0, ...node }: Omit<Partial<Node>, 'type'> = {},
): Node => ({
  type,
  start,
  end,
  ...node,
});
