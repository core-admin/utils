// 使用 defineConfig 来定义 Vitest 配置,提供类型提示
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // resolve 配置模块解析
  resolve: {
    // alias 设置路径别名,可以用 @ 指向 src 目录
    alias: {
      '@': './src',
    },
  },
  test: {
    // globals: true 表示测试 API 可以全局使用,不需要手动导入
    globals: true,
    // environment 指定测试运行环境为 Node.js
    // jsdom 使用 jsdom 库来模拟浏览器环境
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // coverage 配置测试覆盖率相关选项
    coverage: {
      // provider 指定覆盖率统计工具为 v8
      provider: 'v8',
      // reporter 指定覆盖率报告输出格式:文本、JSON、HTML
      reporter: ['text', 'json', 'html'],
      // exclude 排除不需要统计覆盖率的文件
      exclude: ['node_modules/**', 'dist/**', '**/*.d.ts', 'test/**', 'vitest.config.ts'],
      /**
       * 首先 Vitest 会收集 include 模式匹配到的所有文件，
       * 然后从这些文件中排除掉 exclude 模式匹配到的文件，
       * 所以即使一个文件同时被 include 和 exclude 匹配到，最终这个文件也会被排除掉。
       */
      include: ['src/**'],
    },
    testTimeout: 10000,
  },
});
