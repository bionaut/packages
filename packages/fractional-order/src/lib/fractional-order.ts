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

function midKey(min: string, max: string): string {
  while (min.length < max.length) {
    min += 'a'
  }
  while (max.length < min.length) {
    max += 'z'
  }

  let result = ''
  for (let i = 0; i < min.length; i++) {
    const midChar = midCharCalc(min[i], max[i])
    result += midChar
    if (midChar !== 'z') {
      result += 'a'.repeat(min.length - i - 1)
      break
    }
  }

  return result
}

function midCharCalc(minChar: string, maxChar: string): string {
  const midCharCode = Math.floor(
    (minChar.charCodeAt(0) + maxChar.charCodeAt(0)) / 2,
  )
  return String.fromCharCode(midCharCode)
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
