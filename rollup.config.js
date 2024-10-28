import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

// const appendTypings = () => {
//   return {
//     name: 'append-typings',
//     writeBundle(options, bundle) {
//       const dtsFile = Object.keys(bundle).find(fileName => fileName.endsWith('.d.ts'));
//       if (dtsFile) {
//         const typingsDir = path.resolve(process.cwd(), 'typings');
//         if (fs.existsSync(typingsDir)) {
//           const typingsContent = fs
//             .readdirSync(typingsDir)
//             .filter(file => file.endsWith('.d.ts'))
//             .map(file => fs.readFileSync(path.join(typingsDir, file), 'utf-8'))
//             .join('\n\n');
//           const outputPath = path.resolve(options.dir || path.dirname(options.file), dtsFile);
//           fs.appendFileSync(outputPath, `\n\n${typingsContent}`);
//         }
//       }
//     },
//   };
// };

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
        file: 'dist/index.mjs',
        format: 'esm',
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
          lodash: '_',
        },
      },
    ],
    external: ['lodash', 'lodash-es'],
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    external: ['csstype', 'type-fest', 'lodash', 'lodash-es'],
    plugins: [dts({ respectExternal: true })],
  },
];

export default config;
