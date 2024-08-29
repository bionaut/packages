// Generate an array of fractional keys with a constant step of 0.01
export function generateKeys(count: number): number[] {
  const step = 0.001;
  return Array.from({ length: count }, (_, i) => +(step * (i + 1)));
}

// Place a new key before the given key
export function placeBefore(key: number): number {
  return +(key / 2);
}

// Place a new key after the given key
export function placeAfter(key: number): number {
  return +((key + 1) / 2);
}

// Place a new key between two given keys
export function placeBetween<T extends number>(first: T, second: T): T {
  return +(((first + second) / 2)) as T;
}

// Sort an array of keys
export function sortKeys(keys: number[]): number[] {
  return keys.sort((a, b) => a - b);
}

// Sort items based on a key field
export function sortItems<S extends object, T extends keyof S>(items: S[], keyField: T): S[] {
  return items.sort((a, b) => (a[keyField] as unknown as number) - (b[keyField] as unknown as number));
}
