import {
  placeBefore,
  placeAfter,
  generateKeys,
  baseChars,
  sortItems,
  placeBetween,
} from './fractional-order'

describe('Fractional Indexing Tests', () => {
  describe('generateKeys', () => {
    test('should generate the correct number of keys', () => {
      const keys = generateKeys(5)
      expect(keys).toHaveLength(5)
    })

    test('generated keys should be in sorted order', () => {
      const keys = generateKeys(5)
      const sortedKeys = [...keys].sort()
      expect(keys).toEqual(sortedKeys)
    })
  })

  describe('placeBefore', () => {
    test('should generate a key before a given key', () => {
      const key = 'b'
      const newKey = placeBefore(key)
      expect(newKey < key).toBe(true)
    })

    test('should throw error for placing before the first key based on baseChars', () => {
      expect(() => placeBefore(baseChars.charAt(0))).toThrow(
        `Cannot place a key before the first key "${baseChars.charAt(0)}".`,
      )
    })
  })

  describe('placeAfter', () => {
    test('should generate a key after a given key', () => {
      const key = 'b'
      const newKey = placeAfter(key)
      expect(newKey > key).toBe(true)
    })

    test('generated key after "z" should be longer', () => {
      const newKey = placeAfter('z')
      expect(newKey.length).toBeGreaterThan(1)
      expect(newKey > 'z').toBe(true)
      expect(newKey).toBe('zm')
    })
  })

  describe('Key Placement Consistency', () => {
    test('placing a key after and before should give sorted keys', () => {
      const middleKey = 'm'
      const beforeKey = placeBefore(middleKey)
      const afterKey = placeAfter(middleKey)

      expect(beforeKey < middleKey).toBe(true)
      expect(afterKey > middleKey).toBe(true)
      expect(beforeKey < afterKey).toBe(true)
    })
  })

  describe('Sort custom items', () => {
    test('should sort items by orderIndex', () => {
      const items = [
        {
          id: '2',
          orderIndex: 'b',
        },
        {
          id: '1',
          orderIndex: 'a',
        },
        {
          id: '3',
          orderIndex: 'c',
        },
      ]

      const sortedItems = sortItems(items, 'orderIndex')
      expect(sortedItems.map((item) => item.id)).toEqual(['1', '2', '3'])
    })
  })

  describe('Place a key between other keys', () => {
    test('should place a key between two keys', () => {
      const keys = generateKeys(2)
      const midKey = placeBetween(keys[0], keys[1])

      expect(midKey > keys[0]).toBe(true)
      expect(midKey < keys[1]).toBe(true)
    })
  })
})
