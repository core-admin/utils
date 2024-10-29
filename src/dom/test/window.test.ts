import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  getClientSize,
  getScroll,
  getOffset,
  getDocSize,
  getViewportSize,
  getOuterHeight,
  getClientXY,
} from '../window';

// 在所有测试之前重置所有的mock
beforeEach(() => {
  vi.restoreAllMocks();
});

// 在所有测试之后清理
afterEach(() => {
  vi.restoreAllMocks();
  // 清理所有添加到body的元素
  document.body.innerHTML = '';
});

describe('getClientSize', () => {
  it('应返回正确的客户端尺寸', () => {
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1024);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(768);

    const size = getClientSize();
    expect(size).toEqual({ width: 1024, height: 768 });
  });
});

describe('getScroll', () => {
  it('应返回正确的滚动位置', () => {
    vi.spyOn(document.documentElement, 'scrollLeft', 'get').mockReturnValue(100);
    vi.spyOn(document.documentElement, 'scrollTop', 'get').mockReturnValue(200);
    vi.spyOn(document.body, 'scrollLeft', 'get').mockReturnValue(50);
    vi.spyOn(document.body, 'scrollTop', 'get').mockReturnValue(150);

    const scroll = getScroll();
    expect(scroll).toEqual({ scrollLeft: 100, scrollTop: 200 });
  });
});

describe('getOffset', () => {
  // it('应计算元素相对于文档的偏移量', () => {
  //   const child = document.createElement('div');
  //   const parent = document.createElement('div');

  //   parent.style.position = 'relative';
  //   parent.style.left = '100px';
  //   parent.style.top = '100px';

  //   child.style.position = 'relative';
  //   child.style.left = '50px';
  //   child.style.top = '50px';

  //   parent.appendChild(child);
  //   document.body.appendChild(parent);

  //   const offset = getOffset(child);
  //   expect(offset).toEqual(
  //     expect.objectContaining({
  //       left: expect.any(Number),
  //       top: expect.any(Number),
  //     }),
  //   );
  // });

  it('应支持指定停止节点', () => {
    const child = document.createElement('div');
    const parent = document.createElement('div');

    parent.style.position = 'relative';
    child.style.position = 'relative';
    child.style.left = '50px';
    child.style.top = '50px';

    parent.appendChild(child);
    document.body.appendChild(parent);

    const offset = getOffset(child, parent);
    expect(offset).toEqual(
      expect.objectContaining({
        left: expect.any(Number),
        top: expect.any(Number),
      }),
    );
  });
});

describe('getDocSize', () => {
  it('应返回文档的尺寸', () => {
    vi.spyOn(document.documentElement, 'scrollWidth', 'get').mockReturnValue(2000);
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(3000);
    vi.spyOn(document.body, 'scrollWidth', 'get').mockReturnValue(1500);
    vi.spyOn(document.body, 'scrollHeight', 'get').mockReturnValue(2500);

    const size = getDocSize();
    expect(size).toEqual({ width: 2000, height: 3000 });
  });
});

describe('getViewportSize', () => {
  it('应返回视口的尺寸', () => {
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1024);
    vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(768);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1024);
    vi.spyOn(document.body, 'clientHeight', 'get').mockReturnValue(768);

    const size = getViewportSize();
    expect(size).toEqual({ width: 1024, height: 768 });
  });
});

describe('getOuterHeight', () => {
  it('应返回body元素的外部高度', () => {
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(768);
    const height = getOuterHeight(document.body);
    expect(height).toBe(768);
  });

  it('应返回普通元素的offsetHeight', () => {
    const element = document.createElement('div');
    vi.spyOn(element, 'offsetHeight', 'get').mockReturnValue(100);
    const height = getOuterHeight(element);
    expect(height).toBe(100);
  });
});

describe('getClientXY', () => {
  it('应处理鼠标事件', () => {
    const mouseEvent = new MouseEvent('click', {
      clientX: 100,
      clientY: 200,
    });

    const coords = getClientXY(mouseEvent);
    expect(coords).toEqual({ clientX: 100, clientY: 200 });
  });

  it('应处理触摸事件', () => {
    // 创建模拟的触摸事件
    const touchEvent = {
      type: 'touchstart',
      touches: [
        {
          clientX: 100,
          clientY: 200,
        },
      ],
    } as unknown as TouchEvent;

    const coords = getClientXY(touchEvent);
    expect(coords).toEqual({ clientX: 100, clientY: 200 });
  });

  it('应处理触摸结束事件', () => {
    // 创建模拟的触摸结束事件
    const touchEndEvent = {
      type: 'touchend',
      changedTouches: [
        {
          clientX: 100,
          clientY: 200,
        },
      ],
    } as unknown as TouchEvent;

    const coords = getClientXY(touchEndEvent);
    expect(coords).toEqual({ clientX: 100, clientY: 200 });
  });
});
