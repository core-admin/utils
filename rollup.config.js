import fs from 'fs';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete';

const PKG_NAME = 'Utils'; // 可以从 package.json 中读取

// const getOutput = (input, format, extension) => {
//   const dir = 'dist';
//   const fileName = path.basename(input, '.ts');
//   const output = {
//     file: `${dir}/${fileName}.${extension}`,
//     format: format,
//   };

//   if (format === 'umd') {
//     output.name = PKG_NAME;
//   }

//   return output;
// };

// const entry = 'src/index.ts';

const entries = ['src/index.ts'];

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
    target: 'es5',
  }),
];

// 自定义插件，用于将 typings 目录下的所有 .d.ts 文件内容添加到生成的 .d.ts 文件中
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

export default [
  ...entries.map(input => ({
    input,
    // output: [getOutput(entry, 'esm', 'mjs'), getOutput(entry, 'cjs', 'cjs'), getOutput(entry, 'umd', 'js')],
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        format: 'esm',
        // sourcemap: true,
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        format: 'cjs',
        // sourcemap: true,
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.js'),
        format: 'umd',
        name: PKG_NAME,
        // sourcemap: true,
      },
    ],
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    // output: [getOutput(input, 'esm', 'd.ts')],
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.d.mts'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.d.cts'),
        format: 'cjs',
      },
    ],
    external: [],
    plugins: [dts({ respectExternal: true }), appendTypings()],
  })),
];
