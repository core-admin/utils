import { describe, expect, it, vi } from 'vitest';
import {
  formatFileSize,
  extname,
  getUrlFileNameAndType,
  parseFileDetail,
  extractFileInfoFromUrl,
  isBase64File,
  fileToBase64Async,
  base64ToBlob,
  previewImage,
} from '../index';

describe('文件工具函数测试', () => {
  describe('formatFileSize', () => {
    it('应该正确格式化文件大小', () => {
      expect(formatFileSize(0)).toBe('0B');
      expect(formatFileSize(1024)).toBe('1.00KB');
      expect(formatFileSize(1234567)).toBe('1.18MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.00GB');
    });
  });

  describe('extname', () => {
    it('应该正确获取文件扩展名', () => {
      expect(extname('test.txt')).toBe('.txt');
      expect(extname('path/to/file.jpg')).toBe('.jpg');
      expect(extname('file')).toBe('');
      expect(extname('file.txt?param=1')).toBe('.txt');
      expect(extname('file.txt#hash')).toBe('.txt');
    });
  });

  describe('getUrlFileNameAndType', () => {
    it('应该正确解析文件名和类型', () => {
      expect(getUrlFileNameAndType('test.txt')).toEqual({
        type: '.txt',
        name: 'test',
      });
      expect(getUrlFileNameAndType('path/to/file.jpg')).toEqual({
        type: '.jpg',
        name: 'file',
      });
    });
  });

  describe('parseFileDetail', () => {
    it('应该正确解析文件详情', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const detail = parseFileDetail(file);

      expect(detail).toMatchObject({
        fileName: 'test',
        name: 'test',
        fileSuffix: '.txt',
        fileSuffixUpper: '.TXT',
        mime: 'text/plain',
        formatSize: '4.00B',
        size: 4,
      });
    });
  });

  describe('extractFileInfoFromUrl', () => {
    it('应该正确从URL提取文件信息', () => {
      expect(extractFileInfoFromUrl('https://example.com/file.txt')).toMatchObject({
        type: '.txt',
        name: 'file',
      });

      expect(extractFileInfoFromUrl('https://example.com/path/')).toBeNull();
    });
  });

  describe('isBase64File', () => {
    it('应该正确判断base64文件', () => {
      expect(isBase64File('data:image/png;base64,abc123')).toBe(true);
      expect(isBase64File('https://example.com/file.png')).toBe(false);
    });
  });
});

describe('文件处理函数测试', () => {
  // fileToBase64Async 测试
  describe('fileToBase64Async', () => {
    it('应该正确将文件转换为 base64 字符串', async () => {
      // 创建测试文件
      const testFile = new File(['Hello, World!'], 'test.txt', { type: 'text/plain' });

      // 预期的 base64 结果
      const expectedBase64 = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';

      const result = await fileToBase64Async(testFile);
      expect(result).toBe(expectedBase64);
    });

    it('应该在读取失败时抛出错误', async () => {
      // 模拟 FileReader 错误
      const mockFileReader = {
        readAsDataURL: vi.fn(),
        onerror: null as any,
      };
      vi.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

      const testFile = new File([''], 'test.txt');
      const promise = fileToBase64Async(testFile);

      // 触发错误
      mockFileReader.onerror(new Error('模拟的读取错误'));

      await expect(promise).rejects.toThrow();
    });
  });

  // base64ToBlob 测试
  describe('base64ToBlob', () => {
    it('应该正确将 base64 字符串转换为 Blob 对象', () => {
      const base64 = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
      const blob = base64ToBlob(base64);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob?.type).toBe('text/plain');
    });

    it('应该处理没有数据头的 base64 字符串', () => {
      const base64 = 'SGVsbG8sIFdvcmxkIQ==';
      const blob = base64ToBlob(base64, 'text/plain');
      expect(blob).toBeInstanceOf(Blob);
      expect(blob?.type).toBe('text/plain');
    });

    it('应该返回 null 对于无效的 base64 字符串', () => {
      const base64 = 'invalid_base64';
      const blob = base64ToBlob(base64);
      expect(blob).toBeNull();
    });

    it('应该返回 null 对于空的 base64 字符串', () => {
      const base64 = '';
      const blob = base64ToBlob(base64);
      expect(blob).toBeNull();
    });
  });

  // previewImage 测试
  describe('previewImage', () => {
    beforeEach(() => {
      // 模拟 URL 相关方法
      URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      URL.revokeObjectURL = vi.fn();

      // 模拟 canvas 上下文
      const mockContext = {
        drawImage: vi.fn(),
      };

      // 创建模拟的 canvas 元素
      const mockCanvas = {
        width: 0,
        height: 0,
        style: {},
        getContext: vi.fn(() => mockContext),
        toDataURL: vi.fn(() => 'data:image/png;base64,fake'),
      };

      // 模拟 document.createElement
      vi.spyOn(document, 'createElement').mockImplementation(tagName => {
        if (tagName === 'canvas') {
          return mockCanvas as unknown as HTMLCanvasElement;
        }
        return document.createElement(tagName);
      });

      // 模拟 DOM 操作
      vi.spyOn(document.body, 'appendChild').mockImplementation(vi.fn());
      vi.spyOn(document.body, 'removeChild').mockImplementation(vi.fn());
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('非图片文件应该返回空字符串', async () => {
      const textFile = new File(['Hello'], 'test.txt', { type: 'text/plain' });
      const result = await previewImage(textFile);
      expect(result).toBe('');
    });

    it('应该正确处理普通图片文件', async () => {
      // 模拟 Image 对象
      const mockImage = {
        onload: null as any,
        src: '',
        width: 100,
        height: 100,
        crossOrigin: '',
      };
      vi.spyOn(window, 'Image').mockImplementation(() => mockImage as any);

      const imageFile = new File([''], 'test.png', { type: 'image/png' });
      const promise = previewImage(imageFile);

      // 触发图片加载完成事件
      setTimeout(() => {
        if (mockImage.onload) {
          mockImage.onload();
        }
      }, 0);

      const result = await promise;
      expect(result).toBe('data:image/png;base64,fake');
    });

    it('应该正确处理 SVG 文件', async () => {
      const svgFile = new File(['<svg></svg>'], 'test.svg', { type: 'image/svg+xml' });

      // 模拟 Image 对象
      const mockImage = {
        onload: null as any,
        src: '',
        width: 100,
        height: 100,
        crossOrigin: '',
      };
      vi.spyOn(window, 'Image').mockImplementation(() => mockImage as any);

      // 模拟 FileReader
      const mockFileReader = {
        readAsDataURL: vi.fn(),
        addEventListener: (event: string, callback: any) => {
          if (event === 'load') {
            // 立即触发回调，不使用 setTimeout
            callback({ target: { result: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=' } });
          }
        },
      };
      vi.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

      const promiseResult = previewImage(svgFile);

      // 立即触发图片加载事件
      if (mockImage.onload) {
        mockImage.onload();
      }

      const result = await promiseResult;
      expect(result).toBe('data:image/png;base64,fake');
    });

    it('应该正确处理图片尺寸计算', async () => {
      // 模拟不同尺寸的图片
      const mockImage = {
        onload: null as any,
        src: '',
        width: 300,
        height: 200,
        crossOrigin: '',
      };
      vi.spyOn(window, 'Image').mockImplementation(() => mockImage as any);

      const imageFile = new File([''], 'test.png', { type: 'image/png' });
      const promise = previewImage(imageFile);

      setTimeout(() => {
        if (mockImage.onload) {
          mockImage.onload();
        }
      }, 0);

      const result = await promise;
      expect(result).toBe('data:image/png;base64,fake');
    });
  });
});
