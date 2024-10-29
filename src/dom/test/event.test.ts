import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addEventListener, onceEvent, onEvent, offEvent, triggerEvent } from '../event';

describe('事件处理函数测试', () => {
  let element: HTMLElement;

  beforeEach(() => {
    // 在每个测试前创建新的 DOM 元素
    element = document.createElement('div');
  });

  describe('addEventListener', () => {
    it('应该正确添加事件监听器', () => {
      const callback = vi.fn();
      const listener = addEventListener(element, 'click', callback);

      element.click();
      expect(callback).toHaveBeenCalledTimes(1);

      // 测试移除监听器
      listener.remove();
      element.click();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('对于触摸事件应该自动设置 passive 选项', () => {
      const addEventListenerSpy = vi.spyOn(element, 'addEventListener');
      addEventListener(element, 'touchstart', vi.fn());

      expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), {
        passive: false,
      });
    });
  });

  describe('onceEvent', () => {
    it('事件处理函数应该只执行一次', () => {
      const callback = vi.fn();
      onceEvent(element, 'click', callback);

      element.click();
      element.click();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该安全处理无效参数', () => {
      expect(() => {
        onceEvent(null as any, 'click', vi.fn());
        onceEvent(element, '', vi.fn());
        onceEvent(element, 'click', null as any);
      }).not.toThrow();
    });
  });

  describe('onEvent 和 offEvent', () => {
    it('应该正确添加和移除事件监听器', () => {
      const callback = vi.fn();

      onEvent(element, 'click', callback);
      element.click();
      expect(callback).toHaveBeenCalledTimes(1);

      offEvent(element, 'click', callback);
      element.click();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该安全处理无效参数', () => {
      const callback = vi.fn();
      expect(() => {
        onEvent(null as any, 'click', callback);
        offEvent(null as any, 'click', callback);
      }).not.toThrow();
    });
  });

  describe('triggerEvent', () => {
    it('应该正确触发鼠标事件', () => {
      const callback = vi.fn();
      element.addEventListener('click', callback);

      triggerEvent(element, 'click', true, true);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该正确触发键盘事件', () => {
      const callback = vi.fn();
      element.addEventListener('keydown', callback);

      triggerEvent(element, 'keydown', true, true);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('应该正确触发自定义事件', () => {
      const callback = vi.fn();
      element.addEventListener('custom-event', callback);

      triggerEvent(element, 'custom-event', true, true);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
