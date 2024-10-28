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
 * 获取元素相对于文档或指定父容器的偏移量
 *
 * @param {HTMLElement} node - 要计算偏移量的目标元素
 * @param {HTMLElement} [stopNode] - 停止计算的父节点（可选）
 * @returns {{left: number, top: number}} 包含元素左侧和顶部偏移量的对象
 */
export function getOffset(node: HTMLElement, stopNode?: HTMLElement) {
  let left = 0;
  let top = 0;
  let current = node;

  // 遍历父元素直到文档根节点或指定的停止节点
  while (current && current !== stopNode && current !== document.body) {
    left += current.offsetLeft - current.scrollLeft;
    top += current.offsetTop - current.scrollTop;

    // 考虑父元素的边框
    const parent = current.offsetParent as HTMLElement;
    if (parent) {
      left += parent.clientLeft;
      top += parent.clientTop;
    }

    current = parent;
  }

  // 如果没有指定 stopNode，则需要加上页面的滚动距离
  if (!stopNode) {
    left += window.scrollX || document.documentElement.scrollLeft;
    top += window.scrollY || document.documentElement.scrollTop;
  }

  return { left, top };
}
/**
 * 计算两个 HTML 元素之间的相对偏移距离
 *
 * 此方法用于计算两个 HTML 元素之间的水平和垂直距离。
 * 它会分别计算两个元素相对于文档的偏移量，然后计算它们之间的差值。
 *
 * @param {HTMLElement} el1 - 第一个 HTML 元素，作为参考点
 * @param {HTMLElement} el2 - 第二个 HTML 元素，要计算相对于第一个元素的偏移距离
 * @returns {{left: number, top: number}} 包含水平和垂直偏移距离的对象
 *
 * @example
 * const distance = getOffsetDistance(element1, element2);
 * console.log(distance);
 * >>> { left: 100, top: 50 } // element2 在 element1 右侧100px，下方50px
 */
export function getOffsetDistance(el1: HTMLElement, el2: HTMLElement) {
  const offset1 = getOffset(el1);
  const offset2 = getOffset(el2);
  return {
    left: offset2.left - offset1.left,
    top: offset2.top - offset1.top,
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
 * 获取视口（viewport）的尺寸
 *
 * 此方法用于获取浏览器视口的宽度和高度。它会考虑以下情况:
 * 1. 如果 body 和 documentElement 都有有效的 clientHeight/clientWidth，
 *    取两者中的较小值作为视口尺寸
 * 2. 如果其中一个值无效，则取两者中的较大值
 *
 * 这样处理是为了兼容不同浏览器的实现差异。
 *
 * @returns {{width: number, height: number}} 包含视口宽度和高度的对象
 *
 * @example
 * const viewport = getViewportSize();
 * console.log(viewport);
 * >>> { width: 1024, height: 768 }
 */
export function getViewportSize() {
  let clientHeight = 0;
  let clientWidth = 0;

  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }

  if (document.body.clientWidth && document.documentElement.clientWidth) {
    clientWidth = Math.min(document.body.clientWidth, document.documentElement.clientWidth);
  } else {
    clientWidth = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
  }

  return {
    width: clientWidth,
    height: clientHeight,
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

/**
 * 获取鼠标或触摸事件的坐标（绝对位置，不受滚动条影响）
 */
/**
 * 获取鼠标或触摸事件的坐标位置
 * @description 此方法用于统一获取鼠标事件和触摸事件的客户端坐标。它会根据事件类型自动判断并返回正确的坐标值。
 * 返回的坐标是相对于浏览器视口的绝对位置，不受页面滚动影响。
 *
 * @param {MouseEvent | TouchEvent} event - 鼠标事件或触摸事件对象
 * @returns {{clientX: number, clientY: number}} 返回包含clientX和clientY的坐标对象
 *
 * @example
 * 在事件处理函数中使用
 * element.addEventListener('click', (event) => {
 *   const { clientX, clientY } = getClientXY(event);
 *   console.log('点击位置:', clientX, clientY);
 * });
 *
 * 触摸事件中使用
 * element.addEventListener('touchstart', (event) => {
 *   const { clientX, clientY } = getClientXY(event);
 *   console.log('触摸位置:', clientX, clientY);
 * });
 */
export function getClientXY(event: MouseEvent | TouchEvent) {
  let clientX: number;
  let clientY: number;
  if (event.type === 'touchend') {
    clientY = (event as TouchEvent).changedTouches[0].clientY;
    clientX = (event as TouchEvent).changedTouches[0].clientX;
  } else if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY;
    clientX = (event as TouchEvent).touches[0].clientX;
  } else {
    clientY = (event as MouseEvent).clientY;
    clientX = (event as MouseEvent).clientX;
  }
  return {
    clientX,
    clientY,
  };
}
