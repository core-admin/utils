/**
 * 根据属性按照字母顺序对对象数组进行排序（默认为升序）
 *
 * @description
 * 此方法对给定的对象数组进行排序，根据指定的属性值进行字母顺序排序。
 * 可以选择升序或降序排序，默认为升序。
 *
 * @template T 数组元素的类型
 * @param {T[]} arr 要排序的对象数组
 * @param {function(T): string} getter 用于获取排序属性值的函数
 * @param {'asc' | 'desc'} [order='asc'] 排序顺序，'asc' 为升序，'desc' 为降序
 * @returns {T[]} 返回排序后的新数组
 *
 * @example
 * const users = [
 *   { name: '张三', age: 30 },
 *   { name: '李四', age: 25 },
 *   { name: '王五', age: 35 }
 * ];
 * const sortedUsers = alphabeticalSort(users, user => user.name);
 * 结果: [{ name: '李四', age: 25 }, { name: '王五', age: 35 }, { name: '张三', age: 30 }]
 */
export function alphabeticalSort<T>(
  arr: T[],
  getter: (i: T) => string,
  order: 'asc' | 'desc' = 'asc',
) {
  return arr.sort(
    order === 'desc'
      ? (a, b) => getter(b).localeCompare(getter(a))
      : (a, b) => getter(a).localeCompare(getter(b)),
  );
}

/**
 * 对对象数组进行排序，按照指定属性进行排序（默认为升序）。
 * 经常场景就是 SQL 查询，可以按多列排序并指定每列的顺序。
 * orders 默认值为升序。0 也将被视为升序。
 *
 * @other https://www.30secondsofcode.org/js/s/sort-array-of-objects/#sort-an-array-of-objects-ordered-by-a-property-order
 *
 * @example
 * const users = [ { name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
 * orderBy(users, ['name', 'age'], [1, -1]); // [{ name: "barney", age: 36, }, { name: "fred", age: 48 }, { name: "fred", age: 40}]
 *
 * 先根据用户的 name 属性进行升序排序，如果 name 相同，则根据 age 属性进行降序排序；
 * barney, 36（因为 barney 在字母顺序上排在 fred 之前），fred, 48（因为在所有名为 fred 的条目中，按照 age 降序，48 大于 40），fred 40。
 */
export function orderBy<T>(arr: T[], props: (keyof T)[], orders?: (1 | -1)[]) {
  return arr.sort((a, b) => {
    return props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] <= 0 ? [b[prop], a[prop]] : [a[prop], b[prop]];
        if (typeof p1 === 'string' && typeof p2 === 'string') {
          acc = p1.localeCompare(p2);
        } else {
          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
        }
      }
      return acc;
    }, 0);
  });
}

/**
 * 快速排序是一种分而治之的排序算法。
 * 它的基本思想是选择一个“基准”元素，然后将数组分为两部分，一部分包括所有小于基准的元素，另一部分包括所有大于基准的元素。
 * 这个过程称为分区（partitioning）。然后，递归地在两个子数组上重复这个过程，直到整个数组排序完成。
 *
 * 对于处理大型数据集，快速排序通常是最快的排序算法之一（需要高效排序算法的场景）。
 * 该算法的平均时间复杂度为O(n log n)。
 */
export function quickSort<T>(arr: T[]): T[] {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce<[T[], T[]]>(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i !== pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []],
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
}
