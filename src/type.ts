/** 获取对象的toString方法 */
const toString = Object.prototype.toString;

/**
 * 判断值是否为指定类型
 * @param value - 要判断的值
 * @param type - 类型字符串
 */
export function is(value: unknown, type: string) {
  return toString.call(value).toLowerCase() === `[object ${type}]`.toLowerCase();
}

/** Array.isArray 的别名 */
export const isArray: typeof Array.isArray = Array.isArray;

/**
 * 判断值是否为对象
 * @param value - 要判断的值
 */
export function isObject(value: unknown): value is Record<any, any> {
  return value !== null && is(value, 'object');
}

/**
 * 判断值是否为字符串
 * @param value - 要判断的值
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 判断值是否为数字
 * @param value - 要判断的值
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * 判断字符串是否可转为数字
 * @param value - 要判断的值
 */
export function isStringNumber(value: unknown): boolean {
  if (!isString(value)) {
    return false;
  }
  return !Number.isNaN(Number(value));
}

/**
 * 判断值是否为布尔值
 * @param value - 要判断的值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * 判断值是否为函数
 * @param value - 要判断的值
 */
export function isFunction(value: unknown): value is Function {
  return is(value, 'function');
}

/**
 * 判断值是否为null
 * @param value - 要判断的值
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * 判断值是否为undefined
 * @param value - 要判断的值
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * 判断值是否为Symbol
 * @param value - 要判断的值
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * 判断值是否为BigInt
 * @param value - 要判断的值
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

/**
 * 判断值是否为Date对象
 * @param value - 要判断的值
 */
export function isDate(value: unknown): value is Date {
  return is(value, 'date');
}

/**
 * 判断值是否为正则表达式
 * @param value - 要判断的值
 */
export function isRegExp(value: unknown): value is RegExp {
  return is(value, 'regexp');
}

/**
 * 判断值是否为Promise
 * @param value - 要判断的值
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    (value instanceof Promise || isFunction(value)) &&
    isFunction((value as any).then) &&
    isFunction((value as any).catch)
  );
}

/**
 * 判断值是否为DOM元素
 * @param value - 要判断的值
 */
export function isElement(value: unknown): value is Element {
  if (typeof Element === 'undefined') return false;
  return value instanceof Element;
}

/**
 * 判断值是否为空
 * @param value - 要判断的值
 */
export function isEmpty(value: unknown): boolean {
  return (
    (!value && value !== 0) ||
    (isArray(value) && value.length === 0) ||
    (isObject(value) && !Object.keys(value).length)
  );
}

/** 判断值是否已定义且非null */
export const isDef = <T>(val: T): val is NonNullable<T> => val !== undefined && val !== null;

/** 是否为浏览器环境 */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

/** 是否为服务器环境 */
export const isServer = !isClient;

/** 是否为Firefox浏览器 */
export const isFirefox = (): boolean => isClient && /firefox/i.test(window.navigator.userAgent);

/** 是否为iOS设备 */
export const isIOS = (): boolean =>
  isClient ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;

/**
 * 判断两个值是否相等
 * @param newValue - 新值
 * @param oldValue - 旧值
 */
export const isSameValue = (newValue: unknown, oldValue: unknown) =>
  JSON.stringify(newValue) === JSON.stringify(oldValue);

/** 判断是否为移动设备 */
export function isMobile() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false;
  }
  const agent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      agent,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      agent?.substring(0, 4),
    )
  );
}
