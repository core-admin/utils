import { isClient } from '../type';

/**
 * 获取客户端窗口的尺寸
 *
 * 此方法用于获取当前浏览器窗口的宽度和高度。
 * 如果在非客户端环境中调用（例如服务器端），将返回 {width: 0, height: 0}。
 *
 * @returns {{width: number, height: number}} 包含窗口宽度和高度的对象
 */
export function getClientSize() {
  if (!isClient) return { width: 0, height: 0 };

  const width = document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
  return {
    width,
    height,
  };
}

/**
 * 获取当前页面的滚动位置
 *
 * 此方法用于获取当前页面的水平和垂直滚动位置。
 * 它会返回一个包含 scrollLeft 和 scrollTop 属性的对象，
 * 这两个属性分别表示水平和垂直方向上的滚动距离。
 *
 * @returns {{scrollLeft: number, scrollTop: number}} 包含滚动位置的对象
 */
export function getScroll() {
  return {
    scrollLeft: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
    scrollTop: Math.max(document.documentElement.scrollTop, document.body.scrollTop),
  };
}

/**
 * 获取元素相对于文档的偏移量
 *
 * 此方法用于计算指定元素相对于整个文档的左侧和顶部偏移量。
 * 它考虑了元素的位置、页面滚动和文档元素的边框。
 *
 * @param {HTMLElement} node - 要计算偏移量的目标元素
 * @returns {{left: number, top: number}} 包含元素左侧和顶部偏移量的对象
 */
export function getOffset(node: HTMLElement) {
  const box = node.getBoundingClientRect();
  const docElem = document.documentElement;

  return {
    left:
      box.left +
      (window.scrollX || docElem.scrollLeft) -
      (docElem.clientLeft || document.body.clientLeft || 0),
    top:
      box.top +
      (window.scrollY || docElem.scrollTop) -
      (docElem.clientTop || document.body.clientTop || 0),
  };
}

/**
 * 获取文档的尺寸
 *
 * 此方法用于获取整个文档的宽度和高度。
 * 它会计算文档的最大滚动宽度和高度，包括可能被隐藏的溢出内容。
 *
 * @returns {{width: number, height: number}} 包含文档宽度和高度的对象
 */
export function getDocSize() {
  const width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

  return {
    width,
    height,
  };
}

/**
 * 获取元素的外部高度
 *
 * 此方法用于计算指定元素的外部高度。如果元素是文档的 body，
 * 则返回视口的高度；否则返回元素的偏移高度。
 *
 * @param {HTMLElement} el - 要计算高度的目标元素
 * @returns {number} 元素的外部高度
 */
export function getOuterHeight(el: HTMLElement) {
  if (el === document.body) {
    return window.innerHeight || document.documentElement.clientHeight;
  }
  return el.offsetHeight;
}
