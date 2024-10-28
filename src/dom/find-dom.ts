/**
 * 获取弹出框的容器元素
 * @description 返回指定节点的父元素作为容器，如果没有指定节点或父元素，则返回 document.body
 * @param {HTMLElement} [node] - 指定的节点元素
 * @returns {HTMLElement} 返回容器元素
 */
export const getPopupContainer = (node?: HTMLElement): HTMLElement => {
  return (node?.parentNode as HTMLElement) ?? document.body;
};

/**
 * 根据选择器查询父元素，并返回查询到的所有父元素
 * @description 从当前元素开始向上查找父元素，直到找到匹配选择器的元素为止，返回查找过程中的所有父元素
 * @param {Element} el - 起始元素
 * @param {string} selector - CSS选择器
 * @returns {Element[]} 返回查找到的所有父元素数组，如果没有找到匹配的父元素则返回空数组
 *
 * @example
 * 查找 div 元素的所有父元素，直到找到 class 为 container 的元素
 * getParentsUntil(divElement, '.container')
 */
export function getParentsUntil(el: Element, selector: string): Element[] {
  const parents: Element[] = [];
  let _el: Element | null = el.parentNode as Element;
  while (_el && typeof _el.matches === 'function') {
    parents.unshift(_el);
    if (_el.matches(selector)) return parents;
    else _el = _el.parentNode as Element;
  }
  return [];
}

/**
 * 获取元素的所有祖先元素
 * @description 从当前元素开始向上遍历DOM树，获取所有的祖先元素
 * @param {Element} el - 起始元素
 * @returns {Element[]} 返回所有祖先元素的数组，从最近的父元素到最远的祖先元素(document)
 *
 * @example
 * 获取 div 元素的所有祖先元素
 * getAncestors(divElement)
 */
export function getAncestors(el: Element): Element[] {
  const ancestors: Element[] = [];
  let _el: Element | null = el.parentNode as Element;
  while (_el) {
    ancestors.unshift(_el);
    _el = _el.parentNode as Element;
  }
  return ancestors;
}

/**
 * 根据位置获取兄弟元素
 * @description 获取指定元素相对位置的兄弟元素，可以向前或向后查找
 * @param {HTMLElement} el - 起始元素
 * @param {number} distance - 相对位置，正数表示向后查找，负数表示向前查找
 * @param {string} elClass - CSS选择器，用于筛选兄弟元素
 * @returns {HTMLElement | null} 返回找到的兄弟元素，如果没有找到则返回 null
 *
 * @example
 * 获取当前元素后面第一个兄弟元素
 * getSiblingByPosition(element, 1, '.sibling-class')
 *
 * 获取当前元素前面第二个兄弟元素
 * getSiblingByPosition(element, -2, '.sibling-class')
 */
export function getSiblingByPosition(el: HTMLElement, distance: number, elClass: string) {
  const { parentNode } = el;
  if (!parentNode) return null;
  const siblings = parentNode.querySelectorAll(elClass);
  const index = Array.prototype.indexOf.call(siblings, el);
  return siblings[index + distance] || null;
}
