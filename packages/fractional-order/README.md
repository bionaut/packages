## Description
This TypeScript package provides a set of utility functions for fractional indexing, ideal for ordered data structures where you need to insert items between others without reindexing the entire list. It generates sortable, lexicographical keys which can be used to maintain order in lists.

## Features
- **Generate Keys**: Create a specified number of sorted, lexicographical keys.
- **Place Before**: Generate a new key that is lexicographically before a given key.
- **Place After**: Generate a new key that is lexicographically after a given key.

## Installation
To install this package, run the following command in your project directory:

```bash
npm install fractional-order
```

## Usage

### Importing the Functions
```typescript
import { generateKeys, placeBefore, placeAfter } from 'fractional-order';
```

### Generating Keys
```typescript
const keys = generateKeys(5); // Generates 5 keys
```

### Placing a Key Before
```typescript
const newKeyBefore = placeBefore('b'); // Generates a key before 'b'
```

### Placing a Key After
```typescript
const newKeyAfter = placeAfter('b'); // Generates a key after 'b'
```
