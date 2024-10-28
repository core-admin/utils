import {
  containsWhitespace,
  removeWhitespace,
  compactWhitespace,
  removeNonASCII,
  stripHTMLTags,
  byteSize,
} from '../index';

describe('字符串工具函数测试', () => {
  describe('containsWhitespace', () => {
    test('应该正确检测字符串中的空格', () => {
      expect(containsWhitespace('hello world')).toBe(true);
      expect(containsWhitespace('hello')).toBe(false);
      expect(containsWhitespace('hello\tworld')).toBe(true);
      expect(containsWhitespace('hello\nworld')).toBe(true);
    });
  });

  describe('removeWhitespace', () => {
    test('应该正确移除所有空格', () => {
      expect(removeWhitespace('hello world')).toBe('helloworld');
      expect(removeWhitespace('hello   world')).toBe('helloworld');
      expect(removeWhitespace('hello\tworld')).toBe('helloworld');
      expect(removeWhitespace('hello\nworld')).toBe('helloworld');
    });
  });

  describe('compactWhitespace', () => {
    test('应该将多个空格压缩为一个', () => {
      expect(compactWhitespace('hello   world')).toBe('hello world');
      expect(compactWhitespace('hello    world   test')).toBe('hello world test');
      expect(compactWhitespace('hello\t\tworld')).toBe('hello world');
    });
  });

  describe('removeNonASCII', () => {
    test('应该移除所有非ASCII字符', () => {
      expect(removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ')).toBe('lorem-ipsum');
      expect(removeNonASCII('hello世界')).toBe('hello');
      expect(removeNonASCII('test123!@#$')).toBe('test123!@#$');
    });
  });

  describe('stripHTMLTags', () => {
    test('应该移除所有HTML标签', () => {
      expect(stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>')).toBe('lorem ipsum');
      expect(stripHTMLTags('<div>hello<br/>world</div>')).toBe('helloworld');
      expect(stripHTMLTags('plain text')).toBe('plain text');
    });
  });

  describe('byteSize', () => {
    test('应该正确计算字符串的字节大小', () => {
      expect(byteSize('hello')).toBe(5);
      expect(byteSize('你好')).toBe(6); // UTF-8编码中文字符占3字节
      expect(byteSize('')).toBe(0);
    });
  });
});
