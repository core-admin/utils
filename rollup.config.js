import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appendTypings = () => {
  return {
    name: 'append-typings',
    writeBundle(options, bundle) {
      const dtsFile = Object.keys(bundle).find(fileName => fileName.endsWith('.d.ts'));
      if (dtsFile) {
        const typingsDir = path.resolve(process.cwd(), 'typings');
        if (fs.existsSync(typingsDir)) {
          const typingsContent = fs
            .readdirSync(typingsDir)
            .filter(file => file.endsWith('.d.ts'))
            .map(file => fs.readFileSync(path.join(typingsDir, file), 'utf-8'))
            .join('\n\n');
          const outputPath = path.resolve(options.dir || path.dirname(options.file), dtsFile);
          fs.appendFileSync(outputPath, `\n\n${typingsContent}`);
        }
      }
    },
  };
};

// 获取 src 目录下的所有 .ts 文件
const getDtsEntries = () => {
  const entries = {};
  const srcDir = path.resolve(__dirname, 'src');

  function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        traverse(filePath);
      } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
        const relativePath = path.relative(srcDir, filePath);
        const entryName = relativePath.replace(/\.ts$/, '');
        entries[entryName] = filePath;
      }
    });
  }

  traverse(srcDir);
  return entries;
};

const plugins = [
  del({ targets: 'dist/*' }),
  alias({
    entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
  }),
  resolve({
    preferBuiltins: true,
  }),
  json(),
  commonjs(),
  esbuild({
    target: 'es2015',
  }),
];

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        preserveModules: true,
        entryFileNames: '[name].mjs',
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        preserveModules: true,
        entryFileNames: '[name].cjs',
      },
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: 'Utils',
      },
    ],
    external: [],
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts({ respectExternal: true }), appendTypings()],
  },
  {
    input: getDtsEntries(),
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    external: [],
    plugins: [dts({ respectExternal: true })],
  },
];

export default config;
