import { isClient, isDef, isNumber, isString, isStringNumber } from '../type';
import { Numeric } from '../typing';
import { getClientSize } from './window';

const pureNumberRegex = /^(\d|\.)+$/;
const numberRegex = /(\d|\.)+/;

interface FormatLengthOptions {
  c?: number;
  offset?: number;
  attachPx?: boolean;
}

/**
 * 格式化长度值。如果长度值是数字，它将被乘以一个系数并添加一个偏移量。如果长度值是字符串，它将尝试解析为数字进行同样的操作。如果无法解析为数字，它将尝试找到字符串中的数字并对其进行操作。
 *
 * @param {T} length - 要格式化的长度值，可以是数字、字符串、null或undefined。
 * @param {object} options - 格式化选项。
 * @param {number} options.c - 乘以长度值的系数，默认为1。
 * @param {number} options.offset - 添加到长度值的偏移量，默认为0。
 * @param {boolean} options.attachPx - 是否在结果后附加'px'，默认为true。
 *
 * @returns {T} 格式化后的长度值。如果输入是数字或可以解析为数字的字符串，返回的将是字符串。否则，返回的将是输入的原始值。
 */
export function formatStyleLength<T extends number | string | null | undefined | any>(
  length: T,
  { c = 1, offset = 0, attachPx = true }: FormatLengthOptions = {},
): T extends null
  ? null
  : T extends undefined
    ? undefined
    : T extends string | number
      ? string
      : T {
  if (typeof length === 'number') {
    const result = (length + offset) * c;
    if (result === 0) return '0' as any;
    return `${result}${attachPx ? 'px' : ''}` as any;
  } else if (typeof length === 'string') {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c;
      if (attachPx) {
        if (result === 0) return '0' as any;
        return `${result}px` as any;
      } else {
        return `${result}` as any;
      }
    } else {
      const result = numberRegex.exec(length);
      if (!result) return length as any;
      return length.replace(numberRegex, String((Number(result[0]) + offset) * c)) as any;
    }
  }
  return length as any;
}

/**
 * 为给定的值添加单位。
 *
 * @param {string | number} [value] - 要添加单位的值。
 * @param {string} [defaultUnit='px'] - 默认添加的单位，默认为'px'。
 * @returns {string} 添加单位后的字符串，如果输入为空则返回空字符串。
 */
export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!isDef(value)) return;

  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
}

// cache
let rootFontSize: number;

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;

    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

/**
 * 将rem单位转换为像素值
 *
 * @param {string} value - 包含rem单位的字符串值
 * @returns {number} 转换后的像素值
 *
 * @description
 * 此方法用于将rem（根元素的字体大小）单位转换为像素值。
 * 它首先移除字符串中的'rem'，然后将剩余的数值乘以根元素的字体大小。
 * 这个计算基于当前文档的根字体大小，因此结果会随着根字体大小的变化而变化。
 */
function convertRem(value: string) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

const { width: windowWidth, height: windowHeight } = getClientSize();

/**
 * 将vw单位转换为像素值
 *
 * @param {string} value - 包含vw单位的字符串值
 * @returns {number} 转换后的像素值
 *
 * @description
 * 此方法用于将vw（视口宽度）单位转换为像素值。
 * 它首先移除字符串中的'vw'，然后将剩余的数值乘以窗口宽度的1%。
 * 这个计算基于当前的窗口宽度，因此结果会随着窗口大小的变化而变化。
 */
function convertVw(value: string) {
  value = value.replace(/vw/g, '');
  return (+value * windowWidth) / 100;
}

/**
 * 将vh单位转换为像素值
 *
 * @param {string} value - 包含vh单位的字符串值
 * @returns {number} 转换后的像素值
 *
 * @description
 * 此方法用于将vh（视口高度）单位转换为像素值。
 * 它首先移除字符串中的'vh'，然后将剩余的数值乘以窗口高度的1%。
 * 这个计算基于当前的窗口高度，因此结果会随着窗口大小的变化而变化。
 */
function convertVh(value: string) {
  value = value.replace(/vh/g, '');
  return (+value * windowHeight) / 100;
}

/**
 * 将各种单位转换为像素值
 * 
 * @param {Numeric} value - 需要转换的值,可以是数字或包含单位(rem/vw/vh)的字符串
 * @returns {number} 转换后的像素值
 * 
 * @description
 * 此方法用于将不同单位的值统一转换为像素值:
 * - 如果输入是数字,则直接返回
 * - 如果输入是字符串:
 *   - 包含rem单位,则转换为相对于根元素字体大小的像素值
 *   - 包含vw单位,则转换为相对于视口宽度的像素值  
 *   - 包含vh单位,则转换为相对于视口高度的像素值
 *   - 其他情况则解析为浮点数返回
 * 注意:rem/vw/vh的转换只在客户端环境下进行
 */
export function unitToPx(value: Numeric): number {
  if (typeof value === 'number') {
    return value;
  }

  if (isClient) {
    if (value.includes('rem')) {
      return convertRem(value);
    }
    if (value.includes('vw')) {
      return convertVw(value);
    }
    if (value.includes('vh')) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}
