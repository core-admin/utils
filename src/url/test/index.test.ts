import { setObjToUrlParams, parseUrl } from '../index';

describe('URL工具函数测试', () => {
  describe('setObjToUrlParams', () => {
    test('应该正确将对象参数添加到URL中', () => {
      const baseUrl = 'www.baidu.com';
      const obj = { a: '3', b: '4' };
      expect(setObjToUrlParams(baseUrl, obj)).toBe('www.baidu.com?a=3&b=4');

      // 测试URL已有问号结尾的情况
      expect(setObjToUrlParams(baseUrl + '?', obj)).toBe('www.baidu.com?a=3&b=4');

      // 测试特殊字符编码
      const objWithSpecialChars = { key: '你好,world!' };
      expect(setObjToUrlParams(baseUrl, objWithSpecialChars)).toBe(
        'www.baidu.com?key=' + encodeURIComponent('你好,world!'),
      );
    });
  });

  describe('parseUrl', () => {
    test('应该正确解析URL各个部分', () => {
      const url = 'https://www.example.com/path?name=test&age=18#hash';
      const result = parseUrl(url);

      expect(result.protocol).toBe('https');
      expect(result.host).toBe('www.example.com');
      expect(result.path).toBe('/path');
      expect(result.query).toEqual({ name: 'test', age: '18' });
      expect(result.hash).toBe('hash');
    });

    test('应该正确处理不完整的URL', () => {
      const simpleUrl = 'https://example.com';
      const result = parseUrl(simpleUrl);

      expect(result.protocol).toBe('https');
      expect(result.host).toBe('example.com');
      expect(result.path).toBeUndefined();
      expect(result.query).toBeUndefined();
      expect(result.hash).toBeUndefined();
    });

    test('应该正确解码URL参数', () => {
      const urlWithEncodedParams = 'https://example.com?name=%E4%BD%A0%E5%A5%BD';
      const result = parseUrl(urlWithEncodedParams);

      expect(result.query).toEqual({ name: '你好' });
    });
  });
});
