import { isClient, isObject } from '../type';
import { toCamelCase, toKebabCase } from '../string/convert-name';
import { CSSProperties } from '../typing';
import { keysOf } from '../object';

const trim = (string: string) => (string || '').replace(/^\s+|\s+$/g, '');

/**
 * 检查元素是否包含指定的类名
 * @param {Element} el - 要检查的元素
 * @param {string} cls - 要检查的类名
 * @returns {boolean} 如果元素包含指定类名则返回true，否则返回false
 * @throws {Error} 如果类名包含空格则抛出错误
 */
export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.includes(' ')) throw new Error('className should not contain space.');
  if (el.classList?.contains) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.includes(` ${cls} `);
}

/**
 * 为元素添加类名
 * @param {Element} el - 要添加类名的元素
 * @param {string} cls - 要添加的类名，多个类名用空格分隔
 */
export function addClass(el: Element, cls: string) {
  if (!el) return;
  const classes = (cls || '').split(' ').filter(Boolean);

  if (el.classList?.add) {
    classes.forEach(className => el.classList.add(className));
    return;
  }

  let curClass = el.className;
  for (const className of classes) {
    if (!hasClass(el, className)) {
      curClass += ` ${className}`;
    }
  }
  el.className = curClass.trim();
}

/**
 * 从元素中移除类名
 * @param {Element} el - 要移除类名的元素
 * @param {string} cls - 要移除的类名，多个类名用空格分隔
 */
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ').filter(Boolean);

  if (el.classList?.remove) {
    classes.forEach(className => el.classList.remove(className));
    return;
  }

  let curClass = ` ${el.className} `;
  for (const className of classes) {
    if (hasClass(el, className)) {
      curClass = curClass.replace(` ${className} `, ' ');
    }
  }
  el.className = trim(curClass);
}

/**
 * 生成带有浏览器前缀的CSS属性对象
 * @param {string} attr - CSS属性名
 * @param {string} value - CSS属性值
 * @returns {object} 包含带前缀和不带前缀的CSS属性的对象
 */
export function hackCss(attr: string, value: string) {
  const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT'];

  const styleObj: any = {};
  prefix.forEach(item => {
    styleObj[`-${toKebabCase(`${item}-${attr}`)}`] = value;
  });
  return {
    ...styleObj,
    [attr]: toKebabCase(value),
  };
}

/**
 * 获取CSS变量的值
 * @param {string} key - CSS变量名，可以带有或不带有前缀'--'
 * @param {string | HTMLElement} [el] - 要获取CSS变量的元素或CSS选择器，默认为':root'
 * @returns {string} CSS变量的值
 * @throws {Error} 如果找不到指定的元素或选择器
 */
export function getCssVariableValue(key: string, el: string | HTMLElement = ':root') {
  const element = el instanceof HTMLElement ? el : document.querySelector(el);
  if (!element) {
    throw new Error('Could not find element with the provided selector or element');
  }
  const value = getComputedStyle(element)
    .getPropertyValue(key.startsWith('--') ? key : `--${key}`)
    .trim();
  return value;
}

/**
 * 设置CSS变量的值
 * @template T
 * @param {T} key - CSS变量名，可以带有或不带有前缀'--'
 * @param {string} value - 要设置的CSS变量值
 * @param {string | HTMLElement} [el] - 要设置CSS变量的元素或CSS选择器，默认为':root'
 * @throws {Error} 如果找不到指定的元素或选择器
 */
export function setCssVariableValue<T extends string>(
  key: T,
  value: string,
  el: string | HTMLElement = ':root',
) {
  const element = el instanceof HTMLElement ? el : (document.querySelector(el) as HTMLElement);
  if (!element) {
    throw new Error('Could not find element with the provided selector or element');
  }
  element.style.setProperty(key.startsWith('--') ? key : `--${key}`, value.trim());
}

/**
 * 将类名字符串转换为类名数组
 * @param {string} className - 要转换的类名字符串，多个类名用空格分隔
 * @returns {string[]} 转换后的类名数组，过滤掉空白类名
 */
export function classNameToArray(className: string) {
  return className.split(' ').filter(t => !!t.trim());
}

/**
 * 获取指定HTML元素的特定样式属性值
 * @param {HTMLElement} element - 要获取样式的HTML元素
 * @param {keyof CSSProperties} styleName - 要获取的CSS属性名
 * @returns {string} 指定样式属性的值，如果无法获取则返回空字符串
 */
export function getStyle(element: HTMLElement, styleName: keyof CSSProperties): string {
  if (!isClient || !element || !styleName) return '';

  const camelCaseStyleName = toCamelCase(styleName);
  const key = camelCaseStyleName === 'float' ? 'cssFloat' : camelCaseStyleName;

  try {
    // 首先尝试获取内联样式
    const inlineStyle = element.style[key as any];
    if (inlineStyle) return inlineStyle;

    // 如果内联样式不存在，则获取计算后的样式
    const computed: any = document.defaultView?.getComputedStyle(element, '');
    return computed ? computed[key] : '';
  } catch (error) {
    console.error('获取样式时发生错误:', error);
    return '';
  }
}

/**
 * 设置HTML元素的样式
 * @param {HTMLElement} element - 要设置样式的HTML元素
 * @param {CSSProperties | keyof CSSProperties} styleName - 要设置的样式名称或样式对象
 * @param {string | Number} [value] - 当styleName为字符串时，表示要设置的样式值
 * @returns {void}
 */
export function setStyle(
  element: HTMLElement,
  styleName: CSSProperties | keyof CSSProperties,
  value?: string | Number,
) {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    keysOf(styleName).forEach(prop => {
      setStyle(element, prop, styleName[prop]);
    });
  } else {
    const key = toCamelCase(styleName) as any;
    element.style[key] = value as any;
  }
}

/**
 * 移除HTML元素的指定样式
 * @param {HTMLElement} element - 要移除样式的HTML元素
 * @param {keyof CSSProperties | CSSProperties} style - 要移除的样式名称或样式对象
 * @returns {void}
 */
export function removeStyle(element: HTMLElement, style: keyof CSSProperties) {
  if (!element || !style) return;

  if (isObject(style)) {
    keysOf(style).forEach(prop => removeStyle(element, prop));
  } else {
    setStyle(element, style, '');
  }
}

/**
 * 将CSSStyleDeclaration对象转换为样式字符串
 *
 * 此方法用于处理Firefox和Chrome之间的行为差异，
 * 将给定的CSSStyleDeclaration对象转换为一个格式化的CSS样式字符串。
 *
 * @param {CSSStyleDeclaration} style - 要转换的CSSStyleDeclaration对象
 * @returns {string} 格式化的CSS样式字符串
 *
 * @example
 * const element = document.getElementById('myElement');
 * const computedStyle = window.getComputedStyle(element);
 * const styleString = styleToString(computedStyle);
 * >>> color: rgb(0, 0, 0); font-size: 16px; margin: 10px; padding: 5px; ...
 *
 * 2：
 * const div = document.createElement('div');
 * div.style.color = 'red';
 * const inlineStyleString = styleToString(div.style);
 * >>> color: red;
 */
export function styleToString(style: CSSStyleDeclaration) {
  // 由于Firefox和Chrome在处理样式对象时存在一些差异，
  // 我们需要自行处理这些差异。
  const styleNames = Array.prototype.slice.apply(style);
  return styleNames.map(name => `${name}: ${style.getPropertyValue(name)};`).join('');
}

/**
 * 将样式对象转换为CSS样式字符串
 *
 * 此方法用于将JavaScript样式对象转换为格式化的CSS样式字符串。
 * 它会忽略值为undefined或null的属性。
 *
 * @param {Record<string, string>} style - 要转换的样式对象
 * @returns {string} 格式化的CSS样式字符串
 *
 * @example
 * const styleObject = { color: 'red', fontSize: '16px', margin: '10px' };
 * const styleString = styleObjectToString(styleObject);
 * >>> color: red; font-size: 16px; margin: 10px;
 */
export function styleObjectToString(style: Record<string, string>) {
  return Object.keys(style).reduce((acc, name) => {
    const styleValue = style[name];
    if (typeof styleValue === 'undefined' || styleValue === null) {
      return acc;
    }

    acc += `${name}: ${style[name]};`;
    return acc;
  }, '');
}
