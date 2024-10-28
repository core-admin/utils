/**
 * 查找两个数组的交集
 * 交集是指两个数组中共同存在的元素组成的新数组
 * 例如: [1,2,3] 和 [2,3,4] 的交集是 [2,3]
 *
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @returns {T[]} 两个数组的交集
 *
 * @example
 * const arr1 = [1, 2, 3, 4, 5];
 * const arr2 = [4, 5, 6, 7, 8];
 * intersection(arr1, arr2) // [4, 5]
 */
export function intersectionArrayBase<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return arr1.filter(item => arr2.includes(item));
}

/**
 * 用于比较两个对象是否相等的回调函数类型
 */
type CompareFunction<T> = (item1: T, item2: T) => boolean;

/**
 * 查找两个对象数组的交集
 * 交集是指两个数组中共同存在的元素组成的新数组
 *
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @param {keyof T | CompareFunction<T>} keyOrCompare - 用于比较的对象属性键名或比较函数
 * @returns {T[]} 两个数组的交集
 *
 * @example
 * // 使用key比较
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * intersectionArrayObject(arr1, arr2, 'id') // [{id: 2}]
 *
 * // 使用自定义比较函数
 * intersectionArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 2}]
 */
export function intersectionArrayObject<T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  keyOrCompare: keyof T | CompareFunction<T>,
): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

  const compareFunction =
    typeof keyOrCompare === 'function'
      ? keyOrCompare
      : (item1: T, item2: T) => item1[keyOrCompare] === item2[keyOrCompare];

  return arr1.filter(item1 => arr2.some(item2 => compareFunction(item1, item2)));
}

/**
 * 查找两个数组的并集
 * 并集是指两个数组中所有不重复的元素组成的新数组
 * 例如: [1,2,3] 和 [2,3,4] 的并集是 [1,2,3,4]
 *
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @returns {T[]} 两个数组的并集
 *
 * @example
 * const arr1 = [1, 2, 3, 4, 5];
 * const arr2 = [4, 5, 6, 7, 8];
 * unionArrayBase(arr1, arr2) // [1, 2, 3, 4, 5, 6, 7, 8]
 */
export function unionArrayBase<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return [...new Set([...arr1, ...arr2])];
}

/**
 * 查找两个对象数组的并集
 * 并集是指两个数组中所有不重复的元素组成的新数组
 *
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @param {keyof T | CompareFunction<T>} keyOrCompare - 用于比较的对象属性键名或比较函数
 * @returns {T[]} 两个数组的并集
 *
 * @example
 * // 使用key比较
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * unionArrayObject(arr1, arr2, 'id') // [{id: 1}, {id: 2}, {id: 3}]
 *
 * // 使用自定义比较函数
 * unionArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 1}, {id: 2}, {id: 3}]
 */
export function unionArrayObject<T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  keyOrCompare: keyof T | CompareFunction<T>,
): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

  const compareFunction =
    typeof keyOrCompare === 'function'
      ? keyOrCompare
      : (item1: T, item2: T) => item1[keyOrCompare] === item2[keyOrCompare];

  const merged = [...arr1, ...arr2];
  return merged.filter((item, index) => merged.findIndex(i => compareFunction(i, item)) === index);
}

/**
 * 查找两个数组的补集
 * 补集是指在第一个数组中存在但在第二个数组中不存在的元素组成的新数组
 * 例如: [1,2,3] 和 [2,3,4] 的补集是 [1]
 *
 * @param {T[]} arr1 - 第一个数组(主集)
 * @param {T[]} arr2 - 第二个数组(从主集中需要排除的元素集合)
 * @returns {T[]} 两个数组的补集
 *
 * @example
 * const arr1 = [1, 2, 3, 4, 5];
 * const arr2 = [4, 5, 6, 7, 8];
 * differenceArrayBase(arr1, arr2) // [1, 2, 3]
 */
export function differenceArrayBase<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return arr1.filter(item => !arr2.includes(item));
}

/**
 * 查找两个对象数组的对称差集
 * 对称差集是指两个数组中不共同存在的元素组成的新数组
 *
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @param {keyof T | CompareFunction<T>} keyOrCompare - 用于比较的对象属性键名或比较函数
 * @returns {T[]} 两个数组的对称差集
 *
 * @example
 * // 使用key比较
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * differenceArrayObject(arr1, arr2, 'id') // [{id: 1}, {id: 3}]
 *
 * // 使用自定义比较函数
 * differenceArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 1}, {id: 3}]
 */
export function differenceArrayObject<T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  keyOrCompare: keyof T | CompareFunction<T>,
): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

  const compareFunction =
    typeof keyOrCompare === 'function'
      ? keyOrCompare
      : (item1: T, item2: T) => item1[keyOrCompare] === item2[keyOrCompare];

  return [
    ...asymmetricDifferenceArrayObject(arr1, arr2, keyOrCompare),
    ...asymmetricDifferenceArrayObject(arr2, arr1, keyOrCompare),
  ];
}

/**
 * 查找两个数组的对称差集
 * 对称差集是指两个数组中不共同拥有的元素组成的新数组
 * 换句话说，对称差集 = (A-B)∪(B-A)，即两个数组的并集减去交集
 * 例如: [1,2,3] 和 [2,3,4] 的对称差集是 [1,4]
 *
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @returns {T[]} 两个数组的对称差集
 *
 * @example
 * const arr1 = [1, 2, 3, 4, 5];
 * const arr2 = [4, 5, 6, 7, 8];
 * symmetricDifferenceArrayBase(arr1, arr2) // [1, 2, 3, 6, 7, 8]
 */
export function symmetricDifferenceArrayBase<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return [...differenceArrayBase(arr1, arr2), ...differenceArrayBase(arr2, arr1)];
}

/**
 * 查找两个对象数组的对称差集
 * 对称差集是指两个数组中不共同拥有的元素组成的新数组
 *
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @param {string} key - 用于比较的对象属性键名
 * @returns {T[]} 两个数组的对称差集
 *
 * @example
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * symmetricDifferenceArrayObject(arr1, arr2, 'id') // [{id: 1}, {id: 3}]
 */
export function symmetricDifferenceArrayObject<T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  keyOrCompare: keyof T | CompareFunction<T>,
): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

  const compareFunction =
    typeof keyOrCompare === 'function'
      ? keyOrCompare
      : (item1: T, item2: T) => item1[keyOrCompare] === item2[keyOrCompare];

  const result = arr1
    .filter(item1 => !arr2.some(item2 => compareFunction(item1, item2)))
    .concat(arr2.filter(item2 => !arr1.some(item1 => compareFunction(item1, item2))));

  return result;
}

/**
 * 查找两个数组的非对称差集
 * 非对称差集是指在第一个数组中存在但在第二个数组中不存在的元素组成的新数组
 * 与补集的概念相同，但为了命名的一致性而提供
 * 例如: [1,2,3] 和 [2,3,4] 的非对称差集是 [1]
 *
 * @param {T[]} arr1 - 第一个数组(主集)
 * @param {T[]} arr2 - 第二个数组(从主集中需要排除的元素集合)
 * @returns {T[]} 两个数组的非对称差集
 *
 * @example
 * const arr1 = [1, 2, 3, 4, 5];
 * const arr2 = [4, 5, 6, 7, 8];
 * asymmetricDifferenceArrayBase(arr1, arr2) // [1, 2, 3]
 */
export function asymmetricDifferenceArrayBase<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return arr1.filter(item => !arr2.includes(item));
}

/**
 * 查找两个对象数组的非对称差集
 * 非对称差集是指在第一个数组中存在但在第二个数组中不存在的元素组成的新数组
 *
 * @param {T[]} arr1 - 第一个数组(主集)
 * @param {T[]} arr2 - 第二个数组(从主集中需要排除的元素集合)
 * @param {keyof T | CompareFunction<T>} keyOrCompare - 用于比较的对象属性键名或比较函数
 * @returns {T[]} 两个数组的非对称差集
 *
 * @example
 * // 使用key比较
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * asymmetricDifferenceArrayObject(arr1, arr2, 'id') // [{id: 1}]
 *
 * // 使用自定义比较函数
 * asymmetricDifferenceArrayObject(arr1, arr2, (a, b) => a.id === b.id) // [{id: 1}]
 */
export function asymmetricDifferenceArrayObject<T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  keyOrCompare: keyof T | CompareFunction<T>,
): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

  const compareFunction =
    typeof keyOrCompare === 'function'
      ? keyOrCompare
      : (item1: T, item2: T) => item1[keyOrCompare] === item2[keyOrCompare];

  return arr1.filter(item1 => !arr2.some(item2 => compareFunction(item1, item2)));
}

const arr1 = [{ id: 1 }, { id: 2 }];
const arr2 = [{ id: 2 }, { id: 3 }];

console.log(symmetricDifferenceArrayObject(arr1, arr2, 'id'));
