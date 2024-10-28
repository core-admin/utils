import { isClient } from '../type';

let scrollBarWidth: number;

/**
 * 获取滚动条宽度
 * @param namespace - 命名空间，用于生成滚动条容器的类名
 * @returns 滚动条宽度(像素)
 */
export function getScrollBarWidth(namespace: string): number {
  if (!isClient) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.className = `${namespace}-scrollbar__wrap`;
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
}

/**
 * 检查页面底部是否可见（是否滚动到了底部）
 */
export function bottomVisible() {
  return (
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  );
}
