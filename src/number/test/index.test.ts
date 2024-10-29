import {
  padZero,
  clamp,
  formatNumber,
  addNumber,
  multiplyNumber,
  subtractNumber,
  divideNumber,
} from '..';

describe('数字相关函数测试', () => {
  describe('padZero', () => {
    test('应该在数字前填充0以达到指定长度', () => {
      expect(padZero(5, 3)).toBe('005');
      expect(padZero(42)).toBe('42');
      expect(padZero(123, 5)).toBe('00123');
    });
  });

  describe('clamp', () => {
    test('应该将数字限制在指定范围内', () => {
      expect(clamp(10, 0, 5)).toBe(5);
      expect(clamp(-5, 0, 100)).toBe(0);
      expect(clamp(50, 0, 100)).toBe(50);
    });
  });

  describe('formatNumber', () => {
    test('应该正确格式化数字字符串', () => {
      expect(formatNumber('123.456')).toBe('123.456');
      expect(formatNumber('-123.456', false)).toBe('-123');
      expect(formatNumber('123.456', true, false)).toBe('123.456');
      expect(formatNumber('abc123.456')).toBe('123.456');
      expect(formatNumber('-123.456.789')).toBe('-123.456');
    });
  });

  describe('数字精确计算', () => {
    test('addNumber 应该执行精确加法', () => {
      expect(addNumber(0.1, 0.2)).toBe(0.3);
      expect(addNumber(1.23e-10, 4.56e-10)).toBe(5.79e-10);
    });

    test('multiplyNumber 应该执行精确乘法', () => {
      expect(multiplyNumber(0.1, 0.2)).toBe(0.02);
      expect(multiplyNumber(3.1415, 2)).toBe(6.283);
    });

    test('subtractNumber 应该执行精确减法', () => {
      expect(subtractNumber(0.3, 0.2)).toBe(0.1);
      expect(subtractNumber(1.5, 0.8)).toBe(0.7);
    });

    test('divideNumber 应该执行精确除法', () => {
      expect(divideNumber(0.3, 0.1)).toBe(3);
      expect(divideNumber(5.5, 2)).toBe(2.75);
    });
  });
});
