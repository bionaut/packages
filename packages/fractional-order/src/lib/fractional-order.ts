const PRECISION = 16

// Generate an array of fractional keys with a constant step
export function generateKeys(count: number, step = 10): number[] {
  return Array.from({ length: count }, (_, i) => step * (i + 1))
}

// Place a new key before the given key
export function placeBefore(key: number, precision?: number): number {
  const decimalPlaces = precision ?? getDecimalPlaces(key)
  let smallestUnit = Math.pow(10, -decimalPlaces)

  // If subtracting smallestUnit would result in 0, divide it by 10
  while (key - smallestUnit <= 0 && smallestUnit > Number.EPSILON) {
    smallestUnit /= 10
  }

  return Number((key - smallestUnit).toFixed(PRECISION))
}

// Place a new key after the given key
export function placeAfter(key: number, precision?: number): number {
  const decimalPlaces = precision ?? getDecimalPlaces(key)
  const smallestUnit = Math.pow(10, -decimalPlaces)
  return Number((key + smallestUnit).toFixed(PRECISION))
}

// Place a new key between two given keys
export function placeBetween<T extends number>(first: T, second: T): T {
  return Number(((first + second) / 2).toFixed(PRECISION)) as T
}

// Sort an array of keys
export function sortKeys(keys: number[]): number[] {
  return keys.sort((a, b) => a - b)
}

// Sort items based on a key field
export function sortItems<S extends object, T extends keyof S>(
  items: S[],
  keyField: T,
): S[] {
  return items.sort(
    (a, b) =>
      (a[keyField] as unknown as number) - (b[keyField] as unknown as number),
  )
}

// Helper function to get the number of decimal places
export function getDecimalPlaces(num: number): number {
  const parts = num.toString().split('.')
  return parts.length > 1 ? parts[1].length : 0
}
