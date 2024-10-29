import path from 'node:path';
import { fileURLToPath } from 'node:url';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import progress from 'rollup-plugin-progress';

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePlugins = [
  resolve({
    preferBuiltins: true,
    extensions: ['.ts', '.js', '.mjs', '.json'],
    moduleDirectories: ['node_modules', 'src'],
    verbose: true,
  }),
  alias({
    entries: [
      { find: /^node:(.+)$/, replacement: '$1' },
      // {
      //   find: '@hubxu/utils',
      //   replacement: path.resolve(__dirname, 'src'),
      // },
    ],
  }),
  json(),
  commonjs(),
  esbuild({
    target: 'es2015',
  }),
  // terser({
  //   compress: {
  //     drop_console: false,
  //     pure_funcs: ['console.log'],
  //   },
  //   format: {
  //     comments: true,
  //   },
  // }),
  progress({
    clearLine: false,
  }),
  ...(isAnalyze
    ? [
        visualizer({
          filename: 'stats.html',
          open: true,
        }),
      ]
    : []),
];

const createConfig = (input, output, external = [], isMain = false) => ({
  input,
  output: output.map(out => ({
    ...out,
    sourcemap: !isProd,
  })),
  external: [...external, 'lodash', 'lodash-es', '@hubxu/utils'],
  plugins: [...(isMain ? [del({ targets: 'dist/**/*', force: true })] : []), ...basePlugins],
});

const createDtsConfig = (input, output, external = []) => ({
  input,
  output,
  external: ['csstype', 'type-fest', 'lodash', 'lodash-es', ...external],
  plugins: [dts({ respectExternal: true })],
});

const config = [
  // 主包配置
  createConfig(
    'src/index.ts',
    [
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'Utils',
        globals: {
          'lodash-es': '_',
        },
      },
    ],
    [],
    true,
  ),

  // Vue 子包配置
  createConfig(
    'src/vue/index.ts',
    [
      {
        file: 'dist/vue/index.mjs',
        format: 'es',
      },
      {
        file: 'dist/vue/index.cjs',
        format: 'cjs',
      },
    ],
    ['vue'],
  ), // 添加 vue 作为外部依赖

  // React 子包配置
  createConfig(
    'src/react/index.ts',
    [
      {
        file: 'dist/react/index.mjs',
        format: 'es',
      },
      {
        file: 'dist/react/index.cjs',
        format: 'cjs',
      },
    ],
    ['react'],
  ), // 添加 react 作为外部依赖

  // 主包类型声明
  createDtsConfig('src/index.ts', {
    file: 'dist/index.d.ts',
    format: 'esm',
  }),

  // Vue 类型声明
  createDtsConfig(
    'src/vue/index.ts',
    {
      file: 'dist/vue/index.d.ts',
      format: 'esm',
    },
    ['vue'],
  ),

  // React 类型声明
  createDtsConfig(
    'src/react/index.ts',
    {
      file: 'dist/react/index.d.ts',
      format: 'esm',
    },
    ['react'],
  ),
];

export default config;
