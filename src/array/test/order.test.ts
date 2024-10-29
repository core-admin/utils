import { alphabeticalSort, orderBy, quickSort } from '../order';

describe('alphabeticalSort', () => {
  const users = [
    { name: '张三', age: 30 },
    { name: '李四', age: 25 },
    { name: '王五', age: 35 },
  ];

  test('默认按升序排序', () => {
    const sorted = alphabeticalSort(users, user => user.name);
    expect(sorted).toEqual([
      { name: '李四', age: 25 },
      { name: '王五', age: 35 },
      { name: '张三', age: 30 },
    ]);
  });

  test('按降序排序', () => {
    const sorted = alphabeticalSort(users, user => user.name, 'desc');
    expect(sorted).toEqual([
      { name: '张三', age: 30 },
      { name: '王五', age: 35 },
      { name: '李四', age: 25 },
    ]);
  });

  test('按数字排序', () => {
    const sorted = alphabeticalSort(users, user => user.age.toString());
    expect(sorted).toEqual([
      { name: '李四', age: 25 },
      { name: '张三', age: 30 },
      { name: '王五', age: 35 },
    ]);
  });

  test('空数组应返回空数组', () => {
    const emptyArray: { name: string }[] = [];
    expect(alphabeticalSort(emptyArray, item => item.name)).toEqual([]);
  });
});

describe('orderBy', () => {
  const users = [
    { name: 'fred', age: 48 },
    { name: 'barney', age: 36 },
    { name: 'fred', age: 40 },
  ];

  test('按多个属性排序', () => {
    const sorted = orderBy(users, ['name', 'age'], [1, -1]);
    expect(sorted).toEqual([
      { name: 'barney', age: 36 },
      { name: 'fred', age: 48 },
      { name: 'fred', age: 40 },
    ]);
  });

  test('默认升序排序', () => {
    const sorted = orderBy(users, ['name', 'age']);
    expect(sorted).toEqual([
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 },
      { name: 'fred', age: 48 },
    ]);
  });

  test('混合数字和字符串排序', () => {
    const items = [
      { name: 'B', value: 2 },
      { name: 'A', value: 1 },
      { name: 'B', value: 1 },
    ];
    const sorted = orderBy(items, ['name', 'value']);
    expect(sorted).toEqual([
      { name: 'A', value: 1 },
      { name: 'B', value: 1 },
      { name: 'B', value: 2 },
    ]);
  });
});

describe('quickSort', () => {
  test('对数字数组进行排序', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sorted = quickSort(arr);
    expect(sorted).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  test('对字符串数组进行排序', () => {
    const arr = ['banana', 'apple', 'orange', 'grape'];
    const sorted = quickSort(arr);
    expect(sorted).toEqual(['apple', 'banana', 'grape', 'orange']);
  });

  test('空数组应返回空数组', () => {
    expect(quickSort([])).toEqual([]);
  });

  test('单个元素的数组应返回相同的数组', () => {
    expect(quickSort([1])).toEqual([1]);
  });

  test('不应修改原数组', () => {
    const original = [3, 1, 4, 1, 5];
    const originalCopy = [...original];
    quickSort(original);
    expect(original).toEqual(originalCopy);
  });
});
