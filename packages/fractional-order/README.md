# Fractional Order Library

> **⚠️ EXPERIMENTAL WARNING**: This library is currently in an experimental state and is not recommended for use by others.

This library represents an experimental approach to ordering items. Initially, a lexicographical approach was attempted, but it proved to be faulty in certain scenarios. The current implementation uses numeric values, which to some extent fits the use case but is still far from ideal.

It's worth noting that there are more robust solutions available. Libraries that use alphanumeric sortable strings seem to be the best approach for this kind of problem. This implementation should be considered a learning exercise rather than a production-ready solution.

## Overview

The Fractional Order Library is a utility designed to generate, manipulate, and sort fractional keys within a specified range. The library operates with a default step of `10`, which can be customized. It provides methods to place keys before, after, or between existing keys, and to sort arrays of keys or objects based on these keys.

## Installation

To use this library, simply import the necessary functions into your project:

```typescript
import {
  generateKeys,
  placeBefore,
  placeAfter,
  placeBetween,
  sortKeys,
  sortItems,
} from './fractionalOrderLib'
```

## Functions

### 1. `generateKeys(count: number, step: number = 10): number[]`

Generates an array of fractional keys with a specified step (default is 10).

- **Parameters**:

  - `count` (number): The number of keys to generate.
  - `step` (number, optional): The step between keys. Default is 10.

- **Returns**:

  - An array of `number` representing fractional keys.

- **Example**:

  ```typescript
  const keys = generateKeys(5)
  // Output: [10, 20, 30, 40, 50]

  const customStepKeys = generateKeys(5, 5)
  // Output: [5, 10, 15, 20, 25]
  ```

### 2. `placeBefore(key: number): number`

Places a new key before the given key by halving its value.

- **Parameters**:

  - `key` (number): The reference key.

- **Returns**:

  - A `number` representing the new key.

- **Example**:
  ```typescript
  const beforeKey = placeBefore(0.5)
  // Output: 0.25
  ```

### 3. `placeAfter(key: number): number`

Places a new key after the given key by averaging it with `1`.

- **Parameters**:

  - `key` (number): The reference key.

- **Returns**:

  - A `number` representing the new key.

- **Example**:
  ```typescript
  const afterKey = placeAfter(0.5)
  // Output: 0.75
  ```

### 4. `placeBetween<T extends number>(first: T, second: T): T`

Places a new key between two given keys by averaging their values.

- **Parameters**:

  - `first` (T): The first key.
  - `second` (T): The second key.

- **Returns**:

  - A `number` representing the new key between `first` and `second`.

- **Example**:
  ```typescript
  const betweenKey = placeBetween(0.25, 0.5)
  // Output: 0.375
  ```

### 5. `sortKeys(keys: number[]): number[]`

Sorts an array of keys in ascending order.

- **Parameters**:

  - `keys` (number[]): An array of keys to be sorted.

- **Returns**:

  - A sorted array of `number`.

- **Example**:
  ```typescript
  const sortedKeys = sortKeys([0.75, 0.25, 0.5])
  // Output: [0.25, 0.5, 0.75]
  ```

### 6. `sortItems<S extends object, T extends keyof S>(items: S[], keyField: T): S[]`

Sorts an array of objects based on a key field.

- **Parameters**:

  - `items` (S[]): An array of objects to be sorted.
  - `keyField` (T): The field of the object containing the keys.

- **Returns**:

  - A sorted array of objects.

- **Example**:
  ```typescript
  const items = [
    { id: '3', value: 0.75 },
    { id: '1', value: 0.25 },
    { id: '2', value: 0.5 },
  ]
  const sortedItems = sortItems(items, 'value')
  // Output: [
  //   { id: '1', value: 0.25 },
  //   { id: '2', value: 0.5 },
  //   { id: '3', value: 0.75 }
  // ]
  ```

## Usage Examples

### Generating Keys

```typescript
const keys = generateKeys(10)
// Output: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

const customStepKeys = generateKeys(10, 5)
// Output: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
```

### Placing a Key Before Another

```typescript
const beforeKey = placeBefore(0.5)
// Output: 0.25
```

### Placing a Key After Another

```typescript
const afterKey = placeAfter(0.5)
// Output: 0.75
```

### Placing a Key Between Two Keys

```typescript
const betweenKey = placeBetween(0.25, 0.75)
// Output: 0.5
```

### Sorting Keys

```typescript
const sortedKeys = sortKeys([0.75, 0.25, 0.5])
// Output: [0.25, 0.5, 0.75]
```

### Sorting Items by a Key Field

```typescript
const items = [
  { id: '3', value: 0.75 },
  { id: '1', value: 0.25 },
  { id: '2', value: 0.5 },
]
const sortedItems = sortItems(items, 'value')
// Output: [
//   { id: '1', value: 0.25 },
//   { id: '2', value: 0.5 },
//   { id: '3', value: 0.75 }
// ]
```

## License

This library is provided as-is, without warranty of any kind. Feel free to modify and use it in your projects.
