import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatStyleLength, addUnit, unitToPx } from '../format';
import * as windowUtils from '../window';

describe('格式化函数测试', () => {
  describe('formatStyleLength', () => {
    it('应正确处理数字输入', () => {
      expect(formatStyleLength(100)).toBe('100px');
      expect(formatStyleLength(0)).toBe('0');
      expect(formatStyleLength(50, { attachPx: false })).toBe('50');
    });

    it('应正确应用系数和偏移量', () => {
      expect(formatStyleLength(100, { c: 2, offset: 10 })).toBe('220px');
      expect(formatStyleLength(50, { c: 0.5, offset: -10 })).toBe('20px');
    });

    it('应正确处理字符串数字输入', () => {
      expect(formatStyleLength('100')).toBe('100px');
      expect(formatStyleLength('50.5')).toBe('50.5px');
      expect(formatStyleLength('0')).toBe('0');
    });

    it('应正确处理带单位的字符串输入', () => {
      expect(formatStyleLength('100px')).toBe('100px');
      expect(formatStyleLength('50%', { c: 2 })).toBe('100%');
      expect(formatStyleLength('20em', { offset: 5 })).toBe('25em');
    });

    it('应正确处理空值', () => {
      expect(formatStyleLength(null)).toBe(null);
      expect(formatStyleLength(undefined)).toBe(undefined);
    });
  });

  describe('addUnit', () => {
    it('应正确添加默认单位(px)', () => {
      expect(addUnit(100)).toBe('100px');
      expect(addUnit('100')).toBe('100px');
    });

    it('应支持自定义单位', () => {
      expect(addUnit(100, 'rem')).toBe('100rem');
      expect(addUnit('100', '%')).toBe('100%');
    });

    it('应保持已有单位的字符串不变', () => {
      expect(addUnit('100px')).toBe('100px');
      expect(addUnit('50%')).toBe('50%');
      expect(addUnit('20rem')).toBe('20rem');
    });

    it('应正确处理空值', () => {
      expect(addUnit(undefined)).toBeUndefined();
      // @ts-expect-error
      expect(addUnit(null)).toBeUndefined();
    });
  });

  describe('unitToPx', () => {
    let originalWindow: Window;

    beforeEach(() => {
      // 保存原始的 window 对象
      originalWindow = window;

      // 模拟 window 对象的相关属性
      const mockWindow = {
        ...window,
        innerWidth: 1024,
        innerHeight: 768,
        getComputedStyle: vi.fn().mockReturnValue({
          fontSize: '16px',
        }),
      };

      // 模拟 getClientSize 函数
      vi.spyOn(windowUtils, 'getClientSize').mockReturnValue({
        width: 1024,
        height: 768,
      });

      // 模拟 document.documentElement
      Object.defineProperty(document, 'documentElement', {
        writable: true,
        value: {
          ...document.documentElement,
          style: {
            fontSize: '16px',
          },
          clientWidth: 1024,
          clientHeight: 768,
        },
      });

      // 替换全局 window 对象
      vi.stubGlobal('window', mockWindow);
    });

    it('应正确转换数字输入', () => {
      expect(unitToPx(100)).toBe(100);
      expect(unitToPx(0)).toBe(0);
    });

    it('应正确转换rem单位', () => {
      expect(unitToPx('1rem')).toBe(16); // 基于根元素字体大小16px
      expect(unitToPx('1.5rem')).toBe(24);
    });

    it('应正确转换vw单位', () => {
      expect(unitToPx('50vw')).toBe(512); // 50% of 1024px
      expect(unitToPx('100vw')).toBe(1024);
    });

    it('应正确转换vh单位', () => {
      expect(unitToPx('50vh')).toBe(384); // 50% of 768px
      expect(unitToPx('100vh')).toBe(768);
    });

    it('应正确转换纯数字字符串', () => {
      expect(unitToPx('100')).toBe(100);
      expect(unitToPx('50.5')).toBe(50.5);
    });

    afterEach(() => {
      // 恢复原始的 window 对象
      vi.stubGlobal('window', originalWindow);
      vi.restoreAllMocks();
    });
  });
});
