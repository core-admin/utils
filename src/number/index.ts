import { Numeric } from '../typing';

/**
 * 在数字前填充零以达到指定长度
 *
 * @param {Numeric} num - 要填充的数字
 * @param {number} [targetLength=2] - 目标字符串长度
 * @returns {string} 填充零后的字符串
 *
 * @example
 * padZero(5, 3) // 返回 "005"
 * padZero(42) // 返回 "42"
 */
export function padZero(num: Numeric, targetLength = 2): string {
  let str = num + '';
  while (str.length < targetLength) {
    str = '0' + str;
  }
  return str;
}

/**
 * 将数字限制在指定的范围内
 *
 * @param {number} num - 要限制的数字
 * @param {number} min - 允许的最小值
 * @param {number} max - 允许的最大值
 * @returns {number} 限制在指定范围内的数字
 *
 * @example
 * clamp(10, 0, 5) // 返回 5
 * clamp(-5, 0, 100) // 返回 0
 * clamp(50, 0, 100) // 返回 50
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * 移除字符串中多余的指定字符
 *
 * @param {string} value - 要处理的字符串
 * @param {string} char - 要处理的特定字符
 * @param {RegExp} regExp - 用于匹配多余字符的正则表达式
 * @returns {string} 处理后的字符串
 */
function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char);

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

/**
 * 格式化数字字符串
 *
 * 此方法用于处理数字字符串，可以控制是否允许小数点和负号。
 * 它会移除所有非法字符，并确保小数点和负号的正确使用。
 *
 * @param {string} value - 要格式化的数字字符串
 * @param {boolean} [allowDot=true] - 是否允许小数点
 * @param {boolean} [allowMinus=true] - 是否允许负号
 * @returns {string} 格式化后的数字字符串
 *
 * @example
 * formatNumber('123.456') // 返回 '123.456'
 * formatNumber('-123.456', false) // 返回 '-123'
 * formatNumber('123.456', true, false) // 返回 '123.456'
 */
export function formatNumber(value: string, allowDot = true, allowMinus = true) {
  // 先处理负号
  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/g, '');
  }

  // 再处理小数点
  if (allowDot) {
    // 修改这部分逻辑，只保留第一个小数点
    const parts = value.split('.');
    value = parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
  } else {
    value = value.split('.')[0];
  }

  // 最后移除所有其他非法字符
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, '');
}

// 获取数字的指数部分
function getExponent(num: number): number {
  const str = num.toExponential();
  const match = str.match(/e([+-]\d+)$/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * 精确加法函数
 *
 * 此方法用于执行两个数字的精确加法，避免浮点数计算中的精度问题。
 * 它通过将数字放大、四舍五入后再缩小的方式来保证计算的准确性。
 *
 * @param {number} num1 - 第一个加数
 * @param {number} num2 - 第二个加数
 * @returns {number} 两个数字的精确和
 *
 * @example
 * addNumber(0.1, 0.2) // 返回 0.3，而不是 0.30000000000000004
 * addNumber(1.23e-10, 4.56e-10) // 返回 5.79e-10
 */
export function addNumber(num1: number, num2: number) {
  // 获取两个数字中最小数的指数
  const exp1 = getExponent(num1);
  const exp2 = getExponent(num2);
  const minExp = Math.min(exp1, exp2);

  if (minExp < -9) {
    // 对于非常小的数字（科学计数法），直接相加
    return num1 + num2;
  } else {
    // 对于普通小数，使用固定精度
    const cardinal = 10 ** 10;
    return Math.round((num1 + num2) * cardinal) / cardinal;
  }
}

/**
 * 精确乘法函数
 *
 * @param {number} num1 - 第一个乘数
 * @param {number} num2 - 第二个乘数
 * @returns {number} 两个数字的精确积
 *
 * @example
 * multiplyNumber(0.1, 0.2) // 返回 0.02，而不是 0.020000000000000004
 */
export function multiplyNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round(num1 * num2 * cardinal) / cardinal;
}

/**
 * 精确减法函数
 *
 * @param {number} num1 - 被减数
 * @param {number} num2 - 减数
 * @returns {number} 两个数字的精确差
 *
 * @example
 * subtractNumber(0.3, 0.2) // 返回 0.1，而不是 0.09999999999999998
 */
export function subtractNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 - num2) * cardinal) / cardinal;
}

/**
 * 精确除法函数
 *
 * @param {number} num1 - 被除数
 * @param {number} num2 - 除数
 * @returns {number} 两个数字的精确商
 *
 * @example
 * divideNumber(0.3, 0.1) // 返回 3，而不是 2.9999999999999996
 */
export function divideNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 / num2) * cardinal) / cardinal;
}
