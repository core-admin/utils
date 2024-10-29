import { describe, it, expect } from 'vitest';
import {
  extractImgSrc,
  templateDataReplace,
  getCharLength,
  escapeHtml,
  unescapeHtml,
} from '../html';

describe('HTML 处理函数测试', () => {
  describe('extractImgSrc', () => {
    it('应正确提取和处理图片标签', () => {
      const html = '<div><img src="test.jpg" alt="test"/><img src="test2.jpg"/></div>';
      const result = extractImgSrc(html, ({ src }) => {
        return src.replace('.jpg', '-processed.jpg');
      });

      expect(result).toBe(
        '<div><img src="test-processed.jpg" alt="test"/><img src="test2-processed.jpg"/></div>',
      );
    });

    it('应正确处理带有多个属性的图片标签', () => {
      const html = '<img src="test.jpg" class="test-class" data-test="value" alt="test"/>';
      let capturedAttrs: Record<string, string> = {};

      extractImgSrc(html, ({ attrs }) => {
        capturedAttrs = attrs;
      });

      expect(capturedAttrs).toEqual({
        src: 'test.jpg',
        class: 'test-class',
        'data-test': 'value',
        alt: 'test',
      });
    });

    it('当没有提供回调函数时应返回原始HTML', () => {
      const html = '<div><img src="test.jpg"/></div>';
      const result = extractImgSrc(html);
      expect(result).toBe(html);
    });
  });

  describe('templateDataReplace', () => {
    it('应正确替换模板变量', () => {
      const template = 'Hello {{name}}, your age is {{age}}';
      const data = { name: 'Tom', age: 18 };
      const result = templateDataReplace(template, data);
      expect(result).toBe('Hello Tom, your age is 18');
    });

    it('应处理模板变量周围的空格', () => {
      const template = 'Hello {{ name }}, your age is {{ age }}';
      const data = { name: 'Tom', age: 18 };
      const result = templateDataReplace(template, data);
      expect(result).toBe('Hello Tom, your age is 18');
    });

    it('当模板为空字符串时应抛出错误', () => {
      expect(() => templateDataReplace('', {})).toThrow();
    });

    it('当模板不是字符串时应抛出错误', () => {
      expect(() => templateDataReplace(null as any, {})).toThrow();
      expect(() => templateDataReplace(undefined as any, {})).toThrow();
    });
  });

  describe('getCharLength', () => {
    it('应正确计算字符串长度，包括表情符号', () => {
      const str = 'abc哈哈🫣🫵👨';
      const length = getCharLength(str);

      // 如果浏览器支持 Intl.Segmenter
      if (typeof Intl?.Segmenter === 'function') {
        expect(length).toBe(8);
      } else {
        expect(length).toBe(8);
      }
    });

    it('应正确处理空字符串', () => {
      const result = getCharLength('');
      if (typeof Intl?.Segmenter === 'function') {
        expect(result).toBe(0);
      } else {
        expect(result).toBe(0);
      }
    });

    it('应正确过滤不可见字符', () => {
      const str = 'a\u200B\u200Bb'; // 包含零宽字符
      const length = getCharLength(str);

      if (typeof Intl?.Segmenter === 'function') {
        expect(length).toBe(4);
      } else {
        expect(length).toBe(4);
      }
    });
  });

  describe('escapeHtml', () => {
    it('应正确转义HTML特殊字符', () => {
      const input = '<div class="test">\'Test\' & "Quote"</div>';
      const expected =
        '&lt;div class=&quot;test&quot;&gt;&#39;Test&#39; &amp; &quot;Quote&quot;&lt;/div&gt;';
      expect(escapeHtml(input)).toBe(expected);
    });

    it('应保持普通文本不变', () => {
      const input = 'Normal text without special characters';
      expect(escapeHtml(input)).toBe(input);
    });
  });

  describe('unescapeHtml', () => {
    it('应正确还原转义后的HTML特殊字符', () => {
      const input =
        '&lt;div class=&quot;test&quot;&gt;&#39;Test&#39; &amp; &quot;Quote&quot;&lt;/div&gt;';
      const expected = '<div class="test">\'Test\' & "Quote"</div>';
      expect(unescapeHtml(input)).toBe(expected);
    });

    it('应保持普通文本不变', () => {
      const input = 'Normal text without escaped characters';
      expect(unescapeHtml(input)).toBe(input);
    });

    it('应正确处理混合内容', () => {
      const input = 'Normal text with &lt;some&gt; &amp; &quot;escaped&quot; characters';
      const expected = 'Normal text with <some> & "escaped" characters';
      expect(unescapeHtml(input)).toBe(expected);
    });
  });
});
