# Svelte Tree Walker

Creates a generatator that yields nodes as it traverses the AST.

## Example

Simply take the output of the Svelte parser.

```ts
import { parse } from 'svelte/compiler';
import { walk } from 'svelte-tree-walker'l


const { html } = parse(/* A Svelte source file */);

for (const node of walk(tree)) {
  // Do something to the node.
}
```

### Options

To filter by a certain type of Node, you can pass in a `type` as a second argument.

```ts
walk(tree, 'Text');
```

This will _only_ yield elements with the type of `"Text"`.

## Developing

To install dependencies:

```bash
npm install
```

To test:

```bash
npm test
```

To build:

```bash
npm run build
```
