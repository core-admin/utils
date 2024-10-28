import {
  asymmetricDifferenceArrayBase,
  asymmetricDifferenceArrayObject,
  differenceArrayBase,
  differenceArrayObject,
  intersectionArrayBase,
  intersectionArrayObject,
  symmetricDifferenceArrayBase,
  symmetricDifferenceArrayObject,
  unionArrayBase,
  unionArrayObject,
} from '../filter';

describe('数组过滤相关函数测试', () => {
  describe('intersectionArrayBase', () => {
    it('应该返回两个数组的交集', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [4, 5, 6, 7, 8];
      expect(intersectionArrayBase(arr1, arr2)).toEqual([4, 5]);
    });

    it('当输入不是数组时应返回空数组', () => {
      const arr1 = [1, 2, 3];
      const arr2 = null as any;
      expect(intersectionArrayBase(arr1, arr2)).toEqual([]);
    });
  });

  describe('intersectionArrayObject', () => {
    it('使用key比较时应返回对象数组的交集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(intersectionArrayObject(arr1, arr2, 'id')).toEqual([{ id: 2 }]);
    });

    it('使用比较函数时应返回对象数组的交集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(intersectionArrayObject(arr1, arr2, (a, b) => a.id === b.id)).toEqual([{ id: 2 }]);
    });
  });

  describe('unionArrayBase', () => {
    it('应该返回两个数组的并集', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [4, 5, 6, 7, 8];
      expect(unionArrayBase(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('当输入不是数组时应返回空数组', () => {
      const arr1 = [1, 2, 3];
      const arr2 = null as any;
      expect(unionArrayBase(arr1, arr2)).toEqual([]);
    });
  });

  describe('unionArrayObject', () => {
    it('使用key比较时应返回对象数组的并集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(unionArrayObject(arr1, arr2, 'id')).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });

    it('使用比较函数时应返回对象数组的并集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(unionArrayObject(arr1, arr2, (a, b) => a.id === b.id)).toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
    });
  });

  describe('differenceArrayBase', () => {
    it('应该返回两个数组的补集', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [4, 5, 6, 7, 8];
      expect(differenceArrayBase(arr1, arr2)).toEqual([1, 2, 3]);
    });

    it('当输入不是数组时应返回空数组', () => {
      const arr1 = [1, 2, 3];
      const arr2 = null as any;
      expect(differenceArrayBase(arr1, arr2)).toEqual([]);
    });
  });

  describe('differenceArrayObject', () => {
    it('使用key比较时应返回对象数组的对称差集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(differenceArrayObject(arr1, arr2, 'id')).toEqual([{ id: 1 }, { id: 3 }]);
    });

    it('使用比较函数时应返回对象数组的对称差集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(differenceArrayObject(arr1, arr2, (a, b) => a.id === b.id)).toEqual([
        { id: 1 },
        { id: 3 },
      ]);
    });
  });

  describe('symmetricDifferenceArrayBase', () => {
    it('应该返回两个数组的对称差集', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [4, 5, 6, 7, 8];
      expect(symmetricDifferenceArrayBase(arr1, arr2)).toEqual([1, 2, 3, 6, 7, 8]);
    });

    it('当输入不是数组时应返回空数组', () => {
      const arr1 = [1, 2, 3];
      const arr2 = null as any;
      expect(symmetricDifferenceArrayBase(arr1, arr2)).toEqual([]);
    });
  });

  describe('symmetricDifferenceArrayObject', () => {
    it('应该返回两个对象数组的对称差集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(symmetricDifferenceArrayObject(arr1, arr2, 'id')).toEqual([{ id: 1 }, { id: 3 }]);
    });

    it('当输入不是数组时应返回空数组', () => {
      const arr1 = [{ id: 1 }];
      const arr2 = null as any;
      expect(symmetricDifferenceArrayObject(arr1, arr2, 'id')).toEqual([]);
    });
  });

  describe('asymmetricDifferenceArrayBase', () => {
    it('应该返回两个数组的非对称差集', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [4, 5, 6, 7, 8];
      expect(asymmetricDifferenceArrayBase(arr1, arr2)).toEqual([1, 2, 3]);
    });

    it('当输入不是数组时应返回空数组', () => {
      const arr1 = [1, 2, 3];
      const arr2 = null as any;
      expect(asymmetricDifferenceArrayBase(arr1, arr2)).toEqual([]);
    });
  });

  describe('asymmetricDifferenceArrayObject', () => {
    it('使用key比较时应返回对象数组的非对称差集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(asymmetricDifferenceArrayObject(arr1, arr2, 'id')).toEqual([{ id: 1 }]);
    });

    it('使用比较函数时应返回对象数组的非对称差集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      expect(asymmetricDifferenceArrayObject(arr1, arr2, (a, b) => a.id === b.id)).toEqual([
        { id: 1 },
      ]);
    });

    it('当输入不是数组时应返回空数组', () => {
      const arr1 = [{ id: 1 }];
      const arr2 = null as any;
      expect(asymmetricDifferenceArrayObject(arr1, arr2, 'id')).toEqual([]);
    });
  });
});
