import type { Entries } from 'type-fest';
import { Arrayable } from '../typing';
import { get, set } from 'lodash-unified';

/**
 * 返回对象的键数组
 * @template T - 对象类型
 * @param {T} arr - 输入对象
 * @returns {Array<keyof T>} 对象的键数组
 */
export const keysOf = <T extends object>(arr: T) => Object.keys(arr) as Array<keyof T>;

/**
 * 返回对象的键值对数组
 * @template T - 对象类型
 * @param {T} arr - 输入对象
 * @returns {Entries<T>} 对象的键值对数组
 */
export const entriesOf = <T extends object>(arr: T) => Object.entries(arr) as Entries<T>;

/**
 * 获取对象指定路径的属性值
 * @template T - 返回值类型
 * @param {Record<string, any>} obj - 输入对象
 * @param {Arrayable<string>} path - 属性路径
 * @param {any} [defaultValue] - 默认值
 * @returns {{ value: T }} 包含getter和setter的对象
 */
export function getProp<T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any,
): { value: T } {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },
    set value(val: any) {
      set(obj, path, val);
    },
  };
}
