/**
 * 确定目标元素是否可聚焦
 * @param element 要聚焦的元素
 * @returns 如果元素可聚焦，则为 true。
 */
export function isFocusable(element: HTMLElement): boolean {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true;
  }
  // HTMLButtonElement has disabled
  if ((element as HTMLButtonElement).disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A': {
      // casting current element to Specific HTMLElement in order to be more type precise
      return (
        !!(element as HTMLAnchorElement).href && (element as HTMLAnchorElement).rel !== 'ignore'
      );
    }
    case 'INPUT': {
      return !(
        (element as HTMLInputElement).type === 'hidden' ||
        (element as HTMLInputElement).type === 'file'
      );
    }
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA': {
      return true;
    }
    default: {
      return false;
    }
  }
}

/**
 * 将焦点设置为当前节点
 * @param element 要聚焦的元素
 * @returns 如果元素被聚焦，则为 true。
 */
export function attemptFocus(element: HTMLElement): boolean {
  if (!isFocusable(element)) {
    return false;
  }
  element.focus?.();
  return document.activeElement === element;
}
