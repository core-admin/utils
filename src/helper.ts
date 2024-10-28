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

/**
 * 延迟执行一段时间
 * @param time - 延迟的时间(毫秒)，默认为0
 * @returns 返回一个Promise对象,在指定时间后resolve
 */
export function sleep(time = 0) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
