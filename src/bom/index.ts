/**
 * 获取选中的文本
 */
export function getSelectedText() {
  return window.getSelection()?.toString() ?? '';
}

/**
 * 是否是暗黑模式
 */
export function prefersDarkColorScheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

/**
 * 是否是浅色模式
 */
export function prefersLightColorScheme() {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ?? true;
}

/**
 * 打开一个居中的窗口
 */
export function openCenteredWindow(
  url: string,
  windowName: string,
  width: number,
  height: number,
): void {
  const x: number = Math.round(window.screen.width / 2 - width / 2);
  const y: number = Math.round(window.screen.height / 2 - height / 2);
  const features: string[] = [
    `width=${width}`,
    `height=${height}`,
    `top=${y}`,
    `left=${x}`,
    `scrollbars=yes`,
    `dialog=yes`,
    `modal=yes`,
    `resizable=no`,
  ];
  const win = window.open(url, windowName, features.join(','));

  if (win) {
    win.focus();
  }
}
