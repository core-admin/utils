/**
 * 交换数组中两个元素的位置
 * @param chars - 需要进行操作的数组
 * @param i - 第一个元素的索引
 * @param j - 第二个元素的索引
 */
export function swap<T>(chars: T[], i: number, j: number): void {
  const tmp = chars[i];
  chars[i] = chars[j];
  chars[j] = tmp;
}

export function sleep(time = 0) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
