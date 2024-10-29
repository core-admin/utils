import {
  is,
  isArray,
  isObject,
  isString,
  isNumber,
  isStringNumber,
  isBoolean,
  isFunction,
  isNull,
  isUndefined,
  isSymbol,
  isBigInt,
  isDate,
  isRegExp,
  isPromise,
  isElement,
  isEmpty,
  isDef,
  isClient,
  isServer,
  isFirefox,
  isIOS,
  isSameValue,
  isMobile,
} from './type';

describe('类型判断函数测试', () => {
  describe('is()', () => {
    it('应正确判断值的类型', () => {
      expect(is([], 'array')).toBe(true);
      expect(is({}, 'object')).toBe(true);
      expect(is('', 'string')).toBe(true);
    });
  });

  describe('isArray()', () => {
    it('应正确判断数组', () => {
      expect(isArray([])).toBe(true);
      expect(isArray({})).toBe(false);
      expect(isArray(null)).toBe(false);
    });
  });

  describe('isObject()', () => {
    it('应正确判断对象', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject(null)).toBe(false);
    });
  });

  describe('isString()', () => {
    it('应正确判断字符串', () => {
      expect(isString('')).toBe(true);
      expect(isString('test')).toBe(true);
      expect(isString(123)).toBe(false);
    });
  });

  describe('isNumber()', () => {
    it('应正确判断数字', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(NaN)).toBe(true);
      expect(isNumber('123')).toBe(false);
    });
  });

  describe('isStringNumber()', () => {
    it('应正确判断可转为数字的字符串', () => {
      expect(isStringNumber('123')).toBe(true);
      expect(isStringNumber('-123.45')).toBe(true);
      expect(isStringNumber('abc')).toBe(false);
    });
  });

  describe('isBoolean()', () => {
    it('应正确判断布尔值', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(1)).toBe(false);
    });
  });

  describe('isFunction()', () => {
    it('应正确判断函数', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction({})).toBe(false);
    });
  });

  describe('isNull()', () => {
    it('应正确判断null', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
    });
  });

  describe('isUndefined()', () => {
    it('应正确判断undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
    });
  });

  describe('isSymbol()', () => {
    it('应正确判断Symbol', () => {
      expect(isSymbol(Symbol())).toBe(true);
      expect(isSymbol(Symbol('test'))).toBe(true);
      expect(isSymbol('symbol')).toBe(false);
    });
  });

  describe('isBigInt()', () => {
    it('应正确判断BigInt', () => {
      expect(isBigInt(BigInt(123))).toBe(true);
      expect(isBigInt(123n)).toBe(true);
      expect(isBigInt(123)).toBe(false);
    });
  });

  describe('isDate()', () => {
    it('应正确判断Date对象', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(Date.now())).toBe(false);
      expect(isDate('2023-01-01')).toBe(false);
    });
  });

  describe('isRegExp()', () => {
    it('应正确判断正则表达式', () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp(new RegExp('test'))).toBe(true);
      expect(isRegExp('/test/')).toBe(false);
    });
  });

  describe('isPromise()', () => {
    it('应正确判断Promise', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
      expect(isPromise({})).toBe(false);
    });
  });

  describe('isEmpty()', () => {
    it('应正确判断空值', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty([1, 2])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe('isDef()', () => {
    it('应正确判断已定义且非null的值', () => {
      expect(isDef(0)).toBe(true);
      expect(isDef('')).toBe(true);
      expect(isDef(null)).toBe(false);
      expect(isDef(undefined)).toBe(false);
    });
  });

  describe('isSameValue()', () => {
    it('应正确判断两个值是否相等', () => {
      expect(isSameValue({ a: 1 }, { a: 1 })).toBe(true);
      expect(isSameValue([1, 2], [1, 2])).toBe(true);
      expect(isSameValue({ a: 1 }, { b: 2 })).toBe(false);
    });
  });

  describe('isElement()', () => {
    it('应正确判断DOM元素', () => {
      expect(isElement(document.createElement('div'))).toBe(true);
      expect(isElement({})).toBe(false);
    });
  });
});

describe('isClient', () => {
  it('应正确判断是否为浏览器环境', () => {
    // 由于测试环境下window和document已定义,所以isClient应为true
    expect(isClient).toBe(true);
  });
});

describe('isServer', () => {
  it('应正确判断是否为服务器环境', () => {
    // 由于isServer与isClient相反
    expect(isServer).toBe(!isClient);
  });
});

describe('isFirefox', () => {
  it('应正确判断是否为Firefox浏览器', () => {
    // 由于测试环境不是Firefox,应该返回false
    expect(isFirefox()).toBe(false);
  });
});

describe('isIOS', () => {
  it('应正确判断是否为iOS设备', () => {
    // 由于测试环境不是iOS设备,应该返回false
    expect(isIOS()).toBe(false);
  });
});

describe('isMobile', () => {
  it('应正确判断是否为移动设备', () => {
    // 由于测试环境不是移动设备,应该返回false
    expect(isMobile()).toBe(false);
  });
});
