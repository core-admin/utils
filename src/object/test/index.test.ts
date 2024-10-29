import { keysOf, entriesOf, getProp } from '../index';

describe('object utils', () => {
  describe('keysOf', () => {
    it('应该返回对象的键数组', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(keysOf(obj)).toEqual(['a', 'b', 'c']);
    });

    it('应该返回空数组当对象为空时', () => {
      expect(keysOf({})).toEqual([]);
    });
  });

  describe('entriesOf', () => {
    it('应该返回对象的键值对数组', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(entriesOf(obj)).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('应该返回空数组当对象为空时', () => {
      expect(entriesOf({})).toEqual([]);
    });
  });

  describe('getProp', () => {
    it('应该获取对象指定路径的属性值', () => {
      const obj = {
        a: {
          b: {
            c: 1,
          },
        },
      };

      const prop = getProp(obj, 'a.b.c');
      expect(prop.value).toBe(1);
    });

    it('应该返回默认值当路径不存在时', () => {
      const obj = { a: 1 };
      const prop = getProp(obj, 'b', 2);
      expect(prop.value).toBe(2);
    });

    it('应该能够设置属性值', () => {
      const obj = { a: 1 };
      const prop = getProp(obj, 'a');
      prop.value = 2;
      expect(obj.a).toBe(2);
    });

    it('应该支持数组路径', () => {
      const obj = {
        a: {
          b: [{ c: 1 }],
        },
      };
      const prop = getProp(obj, ['a', 'b', '0', 'c']);
      expect(prop.value).toBe(1);
    });
  });
});
