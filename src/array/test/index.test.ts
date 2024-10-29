import {
  uniquePrimitiveElements,
  hasDuplicates,
  allDistinct,
  removeNonUnique,
  removeUnique,
  removeNonUniqueBy,
  uniqueElementsBy,
  makeUniqueElementsBy,
  makeUniqueElementsBy2,
  maxN,
  minN,
  maxBy,
  minBy,
  sumArray,
  averageArray,
  medianArray,
  productArray,
  sampleArrayItem,
  shuffle,
} from '../index';

// 数组去重相关测试
describe('数组去重相关函数', () => {
  describe('uniquePrimitiveElements', () => {
    test('基本数据类型去重', () => {
      expect(uniquePrimitiveElements([1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
      expect(uniquePrimitiveElements(['a', 'a', 'b', 'b'])).toEqual(['a', 'b']);
    });

    test('空数组返回空数组', () => {
      expect(uniquePrimitiveElements([])).toEqual([]);
    });
  });

  describe('hasDuplicates & allDistinct', () => {
    test('检查重复项', () => {
      expect(hasDuplicates([1, 2, 3])).toBe(false);
      expect(hasDuplicates([1, 2, 2])).toBe(true);
    });

    test('检查是否全部唯一', () => {
      expect(allDistinct([1, 2, 3])).toBe(true);
      expect(allDistinct([1, 2, 2])).toBe(false);
    });
  });

  describe('removeNonUnique & removeUnique', () => {
    test('删除非唯一项', () => {
      expect(removeNonUnique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 3, 5]);
    });

    test('只保留重复项', () => {
      expect(removeUnique([1, 2, 2, 3, 4, 4, 5])).toEqual([2, 4]);
    });
  });

  describe('removeNonUniqueBy', () => {
    test('使用自定义比较函数删除非唯一项', () => {
      const arr = [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 1, name: '王五' },
        { id: 3, name: '赵六' },
      ];
      const result = removeNonUniqueBy(arr, (a, b) => a.id === b.id);
      expect(result).toEqual([
        { id: 2, name: '李四' },
        { id: 3, name: '赵六' },
      ]);
    });
  });

  describe('uniqueElementsBy & makeUniqueElementsBy', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice2' },
    ];

    test('使用比较函数去重', () => {
      const result = uniqueElementsBy(arr, (a, b) => a.id === b.id);
      expect(result).toHaveLength(2);
    });

    test('使用键生成函数去重', () => {
      const result = makeUniqueElementsBy(arr, item => item.id);
      expect(result).toHaveLength(2);
    });
  });
});

// 数组计算相关测试
describe('数组计算相关函数', () => {
  describe('maxN & minN', () => {
    const numbers = [1, 3, 2, 5, 4];

    test('获取最大N个值', () => {
      expect(maxN(numbers, 2)).toEqual([5, 4]);
      expect(maxN(numbers)).toEqual([5]);
    });

    test('获取最小N个值', () => {
      expect(minN(numbers, 2)).toEqual([1, 2]);
      expect(minN(numbers)).toEqual([1]);
    });
  });

  describe('maxBy & minBy', () => {
    const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];

    test('使用函数查找最大值', () => {
      expect(maxBy(objects, x => x.n)).toBe(8);
      expect(maxBy(objects, 'n')).toBe(8);
    });

    test('使用函数查找最小值', () => {
      expect(minBy(objects, x => x.n)).toBe(2);
      expect(minBy(objects, 'n')).toBe(2);
    });
  });

  describe('数组统计函数', () => {
    const numbers = [1, 2, 3, 4, 5];

    test('计算总和', () => {
      expect(sumArray(numbers)).toBe(15);
    });

    test('计算平均值', () => {
      expect(averageArray(numbers)).toBe(3);
    });

    test('计算中位数', () => {
      expect(medianArray(numbers)).toBe(3);
      expect(medianArray([1, 2, 3, 4])).toBe(2.5);
    });

    test('计算乘积', () => {
      expect(productArray(numbers)).toBe(120);
    });
  });
});

// 数组随机操作相关测试
describe('数组随机操作相关函数', () => {
  describe('sampleArrayItem', () => {
    const arr = [1, 2, 3, 4, 5];

    test('随机获取的元素应该在原数组中', () => {
      const result = sampleArrayItem(arr);
      expect(arr).toContain(result);
    });
  });

  describe('shuffle', () => {
    const arr = [1, 2, 3, 4, 5];

    test('原地洗牌不应创建新数组', () => {
      const original = [...arr];
      const result = shuffle(arr);
      expect(result).toBe(arr);
      expect(result).toHaveLength(original.length);
      expect(result.sort()).toEqual(original.sort());
    });

    test('非原地洗牌应创建新数组', () => {
      const original = [...arr];
      const result = shuffle(arr, false);
      expect(result).not.toBe(arr);
      expect(result).toHaveLength(original.length);
      expect(result.sort()).toEqual(original.sort());
    });
  });
});

// makeUniqueElementsBy2 测试
describe('makeUniqueElementsBy2', () => {
  test('基于多个条件过滤数组', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const compareValues = [2, 3];
    const result = makeUniqueElementsBy2(
      numbers,
      compareValues,
      (num, compare) => num % compare === 0,
    );
    expect(result).toEqual([1, 5]);
  });

  test('空数组返回空数组', () => {
    expect(makeUniqueElementsBy2([], [1, 2], () => true)).toEqual([]);
  });

  test('空比较值数组返回原数组', () => {
    const arr = [1, 2, 3];
    expect(makeUniqueElementsBy2(arr, [], () => true)).toEqual(arr);
  });
});
