import { generateKeys, placeBefore, placeAfter, placeBetween, sortKeys, sortItems } from './fractional-order';

describe('fractional-order library advanced use cases', () => {
  it('generateKeys should handle zero count', () => {
    const keys = generateKeys(0);
    expect(keys).toEqual([]);
  });

  it('generateKeys should handle large count', () => {
    const keys = generateKeys(1000);
    expect(keys.length).toEqual(1000);
    expect(keys[0]).toEqual(0.001);
    expect(keys[999]).toEqual(1.000);
  });

  it('placeBefore should place a new key correctly before the first key', () => {
    const key = placeBefore(0.001);
    expect(key).toEqual(0.0005);
  });

  it('placeAfter should place a new key correctly after the last key', () => {
    const key = placeAfter(0.999);
    expect(key).toEqual(0.9995);
  });

  it('placeBetween should handle placing between very close keys', () => {
    const key = placeBetween(0.001, 0.002);
    expect(key).toEqual(0.0015);
  });

  it('sortKeys should handle already sorted array', () => {
    const sortedKeys = sortKeys([0.1, 0.2, 0.3]);
    expect(sortedKeys).toEqual([0.1, 0.2, 0.3]);
  });

  it('sortKeys should handle reverse sorted array', () => {
    const sortedKeys = sortKeys([0.3, 0.2, 0.1]);
    expect(sortedKeys).toEqual([0.1, 0.2, 0.3]);
  });

  it('sortItems should handle items with duplicate keys', () => {
    const items = [{ key: 0.2 }, { key: 0.1 }, { key: 0.2 }];
    const sortedItems = sortItems(items, 'key');
    expect(sortedItems).toEqual([{ key: 0.1 }, { key: 0.2 }, { key: 0.2 }]);
  });

  it('sortItems should handle items with negative keys', () => {
    const items = [{ key: -0.1 }, { key: 0.1 }, { key: -0.2 }];
    const sortedItems = sortItems(items, 'key');
    expect(sortedItems).toEqual([{ key: -0.2 }, { key: -0.1 }, { key: 0.1 }]);
  });
});
