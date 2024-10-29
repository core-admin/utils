export * from './filter';
export * from './order';
import { addNumber, divideNumber, multiplyNumber } from '../number';

/**
 * 获取数组中的唯一值（数组去重，但仅适用于基础数据类型）
 */
export function uniquePrimitiveElements<T>(arr: T[]) {
  return [...new Set(arr)];
}

/**
 * 检查数组中是否有重复项
 */
export function hasDuplicates<T>(arr: T[]) {
  return arr.length !== new Set(arr).size;
}

/**
 * 检查数组中的所有项是否都是唯一的
 */
export function allDistinct<T>(arr: T[]) {
  return !hasDuplicates(arr);
}

/**
 * 删除出现多次的数组项。
 * 出现多次的元素必须出现在至少两个不同的索引中。
 * @example removeNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
 */
export function removeNonUnique<T>(arr: T[]) {
  return uniquePrimitiveElements(arr).filter(item => arr.indexOf(item) === arr.lastIndexOf(item));
}

/**
 * 删除所有只出现一次的值（removeNonUnique 相反操作）。
 * 删除所有只出现一次的值。在这种情况下，两个索引必须相同。
 * @example removeUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]
 */
export function removeUnique<T>(arr: T[]) {
  return uniquePrimitiveElements(arr).filter(item => arr.indexOf(item) !== arr.lastIndexOf(item));
}

/**
 * 删除非唯一项，只保留数组中出现过一次的项。
 *
 * @description
 * 此方法用于从数组中删除非唯一项，只保留那些在数组中仅出现一次的元素。
 * 它使用一个自定义的比较函数来判断元素是否唯一。
 *
 * @template T 数组元素的类型
 * @param {T[]} arr 需要处理的数组
 * @param {function(a: T, b: T, indexA: number, indexB: number): boolean} fn 比较函数
 * @returns {T[]} 返回只包含唯一项的新数组
 *
 * @example
 * const arr = [1, 2, 2, 3, 4, 4, 5];
 * const result = removeNonUniqueBy(arr, (a, b) => a === b);
 * console.log(result); // [1, 3, 5]
 *
 * @example
 * const objArr = [
 *   { id: 1, name: '张三' },
 *   { id: 2, name: '李四' },
 *   { id: 1, name: '王五' },
 *   { id: 3, name: '赵六' }
 * ];
 * const result = removeNonUniqueBy(objArr, (a, b) => a.id === b.id);
 * console.log(result); // [{ id: 2, name: '李四' }, { id: 3, name: '赵六' }]
 */
export function removeNonUniqueBy<T>(
  arr: T[],
  fn: (a: T, b: T, indexA: number, indexB: number) => boolean,
): T[] {
  return arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
}

type ComparatorFn<T> = (a: T, b: T) => boolean;

/**
 * 使用比较函数来查找是否存在重复项（去重）。
 * 更复杂的数据（例如对象）无法使用相等比较来进行比较，因此我们需要使用函数来检查重复项。
 *
 * @description
 * 此方法用于对复杂数据类型的数组进行去重操作。它接受一个数组和一个比较函数作为参数，
 * 通过比较函数来判断两个元素是否相同，从而实现去重。
 *
 * @template T 数组元素的类型
 * @param {T[]} arr 需要去重的数组
 * @param {ComparatorFn<T>} fn 用于比较两个元素是否相同的函数
 * @returns {T[]} 返回去重后的新数组
 *
 * @example
 * const arr = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const uniqueArr = uniqueElementsBy(arr, (a, b) => a.id === b.id);
 * 结果: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
 */
export function uniqueElementsBy<T>(arr: T[], fn: ComparatorFn<T>) {
  return arr.reduce<T[]>((uniqueList, arrItem) => {
    if (!uniqueList.some(v => fn(arrItem, v))) {
      uniqueList.push(arrItem);
    }
    return uniqueList;
  }, []);
}

/**
 * 对数组进行去重操作，适用于数组长度较大的情况。
 *
 * @description
 * 此方法使用 Map 数据结构来提高大型数组的去重效率。它通过一个键生成函数来判断元素的唯一性，
 * 保留每个唯一键的第一个出现的元素。
 *
 * @template T 数组元素的类型
 * @param {T[]} arr 需要去重的数组
 * @param {function(T): any} fn 用于生成唯一键的函数
 * @returns {T[]} 返回去重后的新数组
 *
 * @example
 * const arr = [
 *   { id: 1, name: '张三' },
 *   { id: 2, name: '李四' },
 *   { id: 1, name: '张三（重复）' },
 *   { id: 3, name: '王五' }
 * ];
 * const uniqueArr = makeUniqueElementsBy(arr, item => item.id);
 * 结果: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }, { id: 3, name: '王五' }]
 */
export function makeUniqueElementsBy<T>(arr: T[], fn: (item: T) => any) {
  const seen = new Map<string | number, T>();
  return arr.filter(arrItem => {
    const key = fn(arrItem);
    if (!seen.has(key)) {
      seen.set(key, arrItem);
      return true;
    }
    return false;
  });
}

/**
 * 根据比较函数和比较值数组过滤数组元素。
 *
 * @description
 * 此方法遍历原数组，对每个元素应用比较函数。如果比较函数对任何比较值返回 true，
 * 则该元素将被从结果数组中排除。这种方法允许基于多个条件进行复杂的数组过滤。
 *
 * @template T 原数组元素的类型
 * @template U 比较值的类型
 * @param {T[]} arr 要过滤的原数组
 * @param {U[]} compareValues 用于比较的值数组
 * @param {function(T, U): boolean} fn 比较函数，接受一个数组元素和一个比较值，返回布尔值
 * @returns {T[]} 返回过滤后的新数组
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const compareValues = [2, 4];
 * const result = makeUniqueElementsBy2(numbers, compareValues, (num, compare) => num % compare === 0);
 * 结果: [1, 3, 5] // 删除了能被 2 或 4 整除的数
 */
export function makeUniqueElementsBy2<T, U>(
  arr: T[],
  compareValues: U[],
  fn: (item: T, compareValue: U) => boolean,
) {
  return arr.filter(arrItem => {
    // 如果 compareValues 数组中任意一个值使 fn 返回 true，则删除该项
    const shouldRemove = compareValues.some(compareValue => fn(arrItem, compareValue));
    return !shouldRemove;
  });
}

/**
 * 查询数组的N个最大值
 *
 * @template T - 数组元素的类型
 * @param {T[]} arr - 输入数组
 * @param {number} [n=1] - 要返回的最大值的数量，默认为1
 * @returns {T[]} 包含N个最大值的数组
 *
 * @example
 * maxN([1, 3, 2, 5, 4], 2); // 返回 [5, 4]
 */
export function maxN<T>(arr: T[], n = 1) {
  return [...arr].sort((a, b) => Number(b) - Number(a)).slice(0, n);
}

/**
 * 查询数组的N个最小值
 *
 * @template T - 数组元素的类型
 * @param {T[]} arr - 输入数组
 * @param {number} [n=1] - 要返回的最小值的数量，默认为1
 * @returns {T[]} 包含N个最小值的数组
 *
 * @example
 * minN([1, 3, 2, 5, 4], 2); // 返回 [1, 2]
 */
export function minN<T>(arr: T[], n = 1) {
  return [...arr].sort((a, b) => Number(a) - Number(b)).slice(0, n);
}

/**
 * 根据函数返回的值查找数组的最大值和最小值
 *
 * @example
 * maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 8
 * maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8
 *
 * minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 2
 * minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 2
 */
export function maxBy<T>(arr: T[], select: ((i: T) => any) | keyof T) {
  return Math.max(...arr.map(typeof select === 'function' ? select : val => val[select]));
}

export function minBy<T>(arr: T[], select: ((i: T) => any) | keyof T) {
  return Math.min(...arr.map(typeof select === 'function' ? select : val => val[select]));
}

/**
 * 计算总和
 */
export function sumArray(arr: number[]) {
  return arr.reduce((acc, val) => addNumber(acc, val), 0);
}

/**
 * 计算平均值
 */
export function averageArray(arr: number[]) {
  return divideNumber(sumArray(arr), arr.length);
}

/**
 * 计算中位数
 */
export function medianArray(arr: number[]) {
  const mid = Math.floor(arr.length / 2);
  const sorted = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? sorted[mid] : addNumber(sorted[mid - 1], sorted[mid]) / 2;
}

/**
 * 计算乘积
 */
export function productArray(arr: number[]) {
  return arr.reduce((acc, val) => multiplyNumber(acc, val), 1);
}

/**
 * 从数组中随机获取一个元素
 */
export function sampleArrayItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 洗牌函数 ”Fisher-Yates 洗牌算法“（随机排列数组）
 */
export function shuffle<T>(arr: T[], inplace: boolean = true): T[] {
  const result = inplace ? arr : [...arr];
  let m = result.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [result[m], result[i]] = [result[i], result[m]];
  }
  return result;
}
