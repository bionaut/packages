import {
  generateKeys,
  getDecimalPlaces,
  placeBefore,
  placeAfter,
  placeBetween,
  sortKeys,
  sortItems,
} from './fractional-order'

describe('getDecimalPlaces', () => {
  it('should return the correct number of decimal places', () => {
    expect(getDecimalPlaces(123)).toEqual(0)
    expect(getDecimalPlaces(123.456)).toEqual(3)
    expect(getDecimalPlaces(0.001)).toEqual(3)
    expect(getDecimalPlaces(1000)).toEqual(0)
  })
})

describe('fractional-order library advanced use cases', () => {
  it('generateKeys should handle zero count', () => {
    const keys = generateKeys(0)
    expect(keys).toEqual([])
  })

  it('generateKeys should handle large count', () => {
    const keys = generateKeys(1000)
    expect(keys.length).toEqual(1000)
    expect(keys[0]).toEqual(10)
    expect(keys[999]).toEqual(10000)
  })

  it('placeBefore should place a new key correctly before the given key', () => {
    expect(placeBefore(0.001)).toBeLessThan(0.001)
    expect(placeBefore(0.1234567)).toBeLessThan(0.1234567)
    expect(placeBefore(1)).toBeLessThan(1)
  })

  it('placeAfter should place a new key correctly after the given key', () => {
    expect(placeAfter(0.001)).toBeGreaterThan(0.001)
    expect(placeAfter(0.1234567)).toBeGreaterThan(0.1234567)
    expect(placeAfter(0.9999999)).toBeGreaterThan(0.9999999)
  })

  it('placeBetween should calculate the midpoint', () => {
    expect(placeBetween(0.001, 0.002)).toEqual(0.0015)
    expect(placeBetween(0.1, 0.2)).toEqual(0.15)
    expect(placeBetween(0, 1)).toEqual(0.5)
  })

  it('placeBetween should handle very close numbers', () => {
    expect(placeBetween(0.1234567, 0.1234568)).toEqual(0.12345675)
  })

  it('placeBetween should handle equal numbers', () => {
    expect(placeBetween(0.1, 0.1)).toEqual(0.1)
  })

  it('sortKeys should handle already sorted array', () => {
    const sortedKeys = sortKeys([0.1, 0.2, 0.3])
    expect(sortedKeys).toEqual([0.1, 0.2, 0.3])
  })

  it('sortKeys should handle reverse sorted array', () => {
    const sortedKeys = sortKeys([0.3, 0.2, 0.1])
    expect(sortedKeys).toEqual([0.1, 0.2, 0.3])
  })

  it('sortItems should handle items with duplicate keys', () => {
    const items = [{ key: 0.2 }, { key: 0.1 }, { key: 0.2 }]
    const sortedItems = sortItems(items, 'key')
    expect(sortedItems).toEqual([{ key: 0.1 }, { key: 0.2 }, { key: 0.2 }])
  })

  it('sortItems should handle items with negative keys', () => {
    const items = [{ key: -0.1 }, { key: 0.1 }, { key: -0.2 }]
    const sortedItems = sortItems(items, 'key')
    expect(sortedItems).toEqual([{ key: -0.2 }, { key: -0.1 }, { key: 0.1 }])
  })

  it('should handle edge cases with high precision', () => {
    expect(placeBefore(0.00000001)).toBeLessThan(0.00000001)
    expect(placeAfter(0.99999999)).toBeGreaterThan(0.99999999)
    expect(placeBetween(0.99999998, 0.99999999)).toEqual(0.999999985)
  })

  it('should handle this flow', () => {
    const firstBatch = generateKeys(7)
    expect(firstBatch).toEqual([10, 20, 30, 40, 50, 60, 70])

    const eight = placeAfter(0.007)
    expect(eight).toEqual(0.008)
  })

  it('placeBefore should decrement the last significant digit', () => {
    expect(placeBefore(0.001)).toEqual(0.0009)
    expect(placeBefore(0.1234567)).toEqual(0.1234566)
    expect(placeBefore(1)).toEqual(0.9)
  })

  it('placeAfter should increment the last significant digit', () => {
    expect(placeAfter(0.001)).toEqual(0.002)
    expect(placeAfter(0.1234567)).toEqual(0.1234568)
    expect(placeAfter(0.9999999999999999)).toEqual(1)
  })

  it('placeBefore and placeAfter should handle various precisions', () => {
    expect(placeBefore(0.1)).toEqual(0.09)
    expect(placeAfter(0.1)).toEqual(0.2)
    expect(placeBefore(0.01)).toEqual(0.009)
    expect(placeAfter(0.01)).toEqual(0.02)
    expect(placeBefore(0.123456789)).toEqual(0.123456788)
    expect(placeAfter(0.123456789)).toEqual(0.12345679)
  })

  it('placeBefore and placeAfter should handle integers', () => {
    expect(placeBefore(1)).toEqual(0.9)
    expect(placeAfter(1)).toEqual(2)
    expect(placeBefore(10)).toEqual(9)
    expect(placeAfter(10)).toEqual(11)
  })

  it('placeBefore should not return zero for very small positive numbers', () => {
    const verySmall = 1e-15
    expect(placeBefore(verySmall)).toBeLessThan(verySmall)
    expect(placeBefore(verySmall)).toBeGreaterThan(0)
  })

  it('should work with whole numbers', () => {
    expect(placeBefore(1)).toEqual(0.9)
    expect(placeAfter(1)).toEqual(2)
    expect(placeBetween(1, 2)).toEqual(1.5)
  })

  it('should work with big numbers', () => {
    expect(placeBefore(1000)).toEqual(999)
    expect(placeAfter(1000)).toEqual(1001)
    expect(placeBetween(1000, 1001)).toEqual(1000.5)
  })

  it('should work with big numbers using placeBefore many times in a row', () => {
    let num = 1000
    for (let i = 0; i < 100; i++) {
      num = placeBefore(num)
    }
    expect(num).toEqual(900)
  })

  it('should work with whole numbers, but with precision', () => {
    expect(placeBefore(1, 1)).toEqual(0.9)
    expect(placeAfter(1, 1)).toEqual(1.1)
    expect(placeAfter(1, 5)).toEqual(1.00001)
  })
})
