import { describe, it, expect, beforeEach } from 'vitest';
import {
  hasClass,
  addClass,
  removeClass,
  hackCss,
  getCssVariableValue,
  setCssVariableValue,
  classNameToArray,
  getStyle,
  setStyle,
  removeStyle,
  styleToString,
  styleObjectToString,
} from '../style';

describe('样式处理函数测试', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  describe('类名操作', () => {
    describe('hasClass', () => {
      it('应正确检测元素是否包含类名', () => {
        element.className = 'test-class';
        expect(hasClass(element, 'test-class')).toBe(true);
        expect(hasClass(element, 'non-existent')).toBe(false);
      });

      it('应正确处理空值', () => {
        expect(hasClass(null as any, 'test')).toBe(false);
        expect(hasClass(element, '')).toBe(false);
      });

      it('当类名包含空格时应抛出错误', () => {
        expect(() => hasClass(element, 'test class')).toThrow();
      });
    });

    describe('addClass', () => {
      it('应正确添加单个类名', () => {
        addClass(element, 'test-class');
        expect(element.classList.contains('test-class')).toBe(true);
      });

      it('应正确添加多个类名', () => {
        addClass(element, 'class1 class2');
        expect(element.classList.contains('class1')).toBe(true);
        expect(element.classList.contains('class2')).toBe(true);
      });

      it('不应重复添加已存在的类名', () => {
        element.className = 'existing';
        addClass(element, 'existing new');
        expect(element.className).toBe('existing new');
      });
    });

    describe('removeClass', () => {
      it('应正确移除单个类名', () => {
        element.className = 'test-class';
        removeClass(element, 'test-class');
        expect(element.className).toBe('');
      });

      it('应正确移除多个类名', () => {
        element.className = 'class1 class2 class3';
        removeClass(element, 'class1 class3');
        expect(element.className).toBe('class2');
      });

      it('应安全处理不存在的类名', () => {
        element.className = 'existing';
        removeClass(element, 'non-existent');
        expect(element.className).toBe('existing');
      });
    });
  });

  describe('CSS变量操作', () => {
    describe('getCssVariableValue', () => {
      it('应正确获取CSS变量值', () => {
        document.documentElement.style.setProperty('--test-var', 'test-value');
        expect(getCssVariableValue('--test-var')).toBe('test-value');
        expect(getCssVariableValue('test-var')).toBe('test-value');
      });

      it('当选择器无效时应抛出错误', () => {
        expect(() => getCssVariableValue('--test', '#non-existent')).toThrow();
      });
    });

    describe('setCssVariableValue', () => {
      it('应正确设置CSS变量值', () => {
        setCssVariableValue('--test-var', 'test-value');
        expect(
          getComputedStyle(document.documentElement).getPropertyValue('--test-var').trim(),
        ).toBe('test-value');
      });

      it('当选择器无效时应抛出错误', () => {
        expect(() => setCssVariableValue('--test', 'value', '#non-existent')).toThrow();
      });
    });
  });

  describe('样式操作', () => {
    describe('hackCss', () => {
      it('应生成带有浏览器前缀的CSS属性对象', () => {
        const result = hackCss('transform', 'rotate(90deg)');
        expect(result).toEqual({
          '-webkit-transform': 'rotate(90deg)',
          '-moz-transform': 'rotate(90deg)',
          '-ms-transform': 'rotate(90deg)',
          '-ot-transform': 'rotate(90deg)',
          transform: 'rotate(90deg)',
        });
      });
    });

    describe('getStyle', () => {
      it('应正确获取计算后的样式值', () => {
        element.style.color = 'red';
        expect(getStyle(element, 'color')).toBe('red');
      });

      it('应正确处理float属性', () => {
        element.style.cssFloat = 'left';
        expect(getStyle(element, 'float')).toBe('left');
      });
    });

    describe('setStyle', () => {
      it('应正确设置单个样式', () => {
        setStyle(element, 'color', 'red');
        expect(element.style.color).toBe('red');
      });

      it('应正确设置多个样式', () => {
        setStyle(element, {
          color: 'red',
          fontSize: '16px',
        });
        expect(element.style.color).toBe('red');
        expect(element.style.fontSize).toBe('16px');
      });
    });

    describe('removeStyle', () => {
      it('应正确移除样式', () => {
        element.style.color = 'red';
        removeStyle(element, 'color');
        expect(element.style.color).toBe('');
      });

      it('应正确移除多个样式', () => {
        setStyle(element, {
          color: 'red',
          fontSize: '16px',
        });
        removeStyle(element, { color: '', fontSize: '' });
        expect(element.style.color).toBe('');
        expect(element.style.fontSize).toBe('');
      });
    });
  });

  describe('样式字符串处理', () => {
    describe('styleToString', () => {
      it('应正确转换CSSStyleDeclaration为字符串', () => {
        element.style.color = 'red';
        element.style.fontSize = '16px';
        const styleString = styleToString(element.style);
        expect(styleString).toContain('color: red;');
        expect(styleString).toContain('font-size: 16px;');
      });
    });

    describe('styleObjectToString', () => {
      it('应正确转换样式对象为字符串', () => {
        const style = {
          color: 'red',
          fontSize: '16px',
        };
        const result = styleObjectToString(style);
        expect(result).toBe('color: red;fontSize: 16px;');
      });

      it('应忽略undefined和null值', () => {
        const style = {
          color: 'red',
          fontSize: undefined,
          margin: null,
        };
        const result = styleObjectToString(style);
        expect(result).toBe('color: red;');
      });
    });
  });

  describe('classNameToArray', () => {
    it('应正确转换类名字符串为数组', () => {
      expect(classNameToArray('class1 class2  class3')).toEqual(['class1', 'class2', 'class3']);
    });

    it('应过滤空白类名', () => {
      expect(classNameToArray('class1  class2')).toEqual(['class1', 'class2']);
    });
  });
});
