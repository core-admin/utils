import { swap, sleep } from './helper';

describe('swap', () => {
  it('应正确交换数组中的两个元素', () => {
    const arr = [1, 2, 3];
    swap(arr, 0, 2);
    expect(arr).toEqual([3, 2, 1]);

    const strArr = ['a', 'b', 'c'];
    swap(strArr, 0, 1);
    expect(strArr).toEqual(['b', 'a', 'c']);
  });

  it('对相同位置进行交换不应改变数组', () => {
    const arr = [1, 2, 3];
    swap(arr, 1, 1);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('sleep', () => {
  it('应在指定时间后resolve', async () => {
    const start = Date.now();
    await sleep(100);
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(100);
  });

  it('不传参数时应立即resolve', async () => {
    const start = Date.now();
    await sleep();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(50);
  });
});
