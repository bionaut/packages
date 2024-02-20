export const baseChars = 'abcdefghijklmnopqrstuvwxyz'

export function generateKeys(count: number): string[] {
  const keys: string[] = []
  let startKey = baseChars.charAt(0)
  const endKey = baseChars.charAt(baseChars.length - 1).repeat(2)

  for (let i = 0; i < count; i++) {
    const newKey = midKey(startKey, endKey)
    keys.push(newKey)
    startKey = newKey
  }

  return keys
}

export function placeBefore(key: string): string {
  if (key === baseChars.charAt(0)) {
    throw new Error(
      `Cannot place a key before the first key "${baseChars.charAt(0)}".`,
    )
  }
  return midKey(baseChars.charAt(0).repeat(key.length - 1), key)
}

export function placeAfter(key: string): string {
  return midKey(
    key,
    baseChars.charAt(baseChars.length - 1).repeat(key.length + 1),
  )
}

export function placeBetween<T extends string>(first: T, second: T): T {
  return midKey(first, second) as T
}

function midKey(min: string, max: string): string {
  if (min === max) {
    throw new Error(
      'Min and max keys cannot be the same for midpoint calculation.',
    )
  }

  // Handle the case where min is a prefix of max more effectively
  if (max.startsWith(min)) {
    // If max is directly after min in lexicographical order, we need to find a better mid point
    if (max === min + 'a') {
      return min + baseChars.charAt(1) // Use the second character in baseChars if available
    }
    return min + 'a' // A simple but effective adjustment for most cases
  }

  // Adjust min and max to have the same length, as before
  while (min.length < max.length) {
    min += 'a'
  }
  while (max.length < min.length) {
    max += 'z'
  }

  let result = ''
  for (let i = 0; i < min.length; i++) {
    const minChar = min.charCodeAt(i)
    const maxChar = max.charCodeAt(i)
    if (minChar === maxChar) {
      result += min[i]
      continue
    }

    // Find the midpoint character code
    let midCharCode = Math.floor((minChar + maxChar) / 2)
    if (midCharCode <= minChar) {
      midCharCode = minChar + 1 // Ensure the midCharCode is actually between minChar and maxChar
    }

    // If the mid character code does not exceed maxChar, use it and terminate the loop
    if (midCharCode < maxChar) {
      result +=
        String.fromCharCode(midCharCode) + 'a'.repeat(min.length - i - 1)
      break
    } else {
      // Otherwise, just use minChar and continue the loop
      result += String.fromCharCode(minChar)
    }
  }

  return result
}

export function sortKeys(keys: string[]): string[] {
  return keys.sort()
}

export function isFirst(key: string): boolean {
  return key === baseChars.charAt(0)
}

export function sortItems<S extends object, T extends keyof S>(
  items: S[],
  keyField: T,
): S[] {
  return items.sort((a, b) => {
    const keyA = a[keyField]
    const keyB = b[keyField]
    if (keyA < keyB) {
      return -1
    }
    if (keyA > keyB) {
      return 1
    }
    return 0
  })
}
