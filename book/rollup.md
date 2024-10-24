1. `rollup-plugin-esbuild`
   - 用于在 Rollup 中使用 esbuild 来编译 TypeScript 和 JavaScript。esbuild 是一个快速的 JavaScript 打包工具和编译器。
2. `rollup-plugin-dts`
   - 用于生成 TypeScript 的声明文件（.d.ts），帮助在打包时生成类型定义文件。
3. `@rollup/plugin-node-resolve`
   - 用于解析 Node.js 模块，将 CommonJS 模块转换为 ES 模块。
4. `@rollup/plugin-commonjs`
   - 用于将 CommonJS 模块转换为 ES 模块，使它们可以在 Rollup 中使用。
5. `@rollup/plugin-json`
   - 允许 Rollup 处理 JSON 文件的导入。
6. `@rollup/plugin-alias`
   - 提供模块路径别名功能，允许在代码中使用别名来替代实际路径。

```js
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

const entries = ['src/index.ts'];

const plugins = [
  alias({
    // 将所有以 node: 开头的模块路径替换为不带 node: 前缀的路径
    entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
  }),
  // 允许 Rollup 解析 Node.js 风格的模块导入。preferBuiltins: true 表示在解析模块时优先使用 Node.js 的内置模块，而不是从 node_modules 中查找
  resolve({
    preferBuiltins: true,
  }),
  // 允许 Rollup 处理 JSON 文件的导入。这使得在代码中可以直接导入和使用 JSON 文件中的数据
  json(),
  // 将 CommonJS 模块转换为 ES6 模块。Rollup 默认只支持 ES6 模块，因此需要这个插件来处理 CommonJS 格式的模块。
  commonjs(),
  // 使用 esbuild 编译 TypeScript 和 JavaScript 代码，esbuild 将会把代码编译为与 ES2015 兼容的 JavaScript。这个设置确保生成的代码可以在支持 ES2015 的环境中运行。
  esbuild({
    target: 'es2015',
  }),
];

export default [
  ...entries.map(input => ({
    // 打包入口
    input,
    // 打包出口，esm 和 cjs 两种格式（可配置为数组或者对象）
    output: [
      {
        // output.dir --- 构建好的代码文件放d到哪个文件夹中

        // 定义输出文件的路径
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        // 定义输出文件的格式，esm 是 ES 模块格式，适合现代浏览器和 Node.js
        format: 'esm',

        // 是否生成sourcemap文件
        sourcemap: true,

        //
        /**
         * output.globals --- 用来忽略打包（umd 或 iife 规范）后的代码的代码依赖，比如：代码中依赖jquery，且jquery在代码使用$标识，则可以配置
         *
         * globals: {
         *  jquery: '$'
         * }
         */
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        // cjs 是 CommonJS 模块格式，适合 Node.js 环境
        format: 'cjs',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.js'),
        // umd是兼容 amd/cjs/iife 的通用打包格式，适合浏览器
        format: 'umd',
        // cdn方式引入时挂载在window上面用的就是这个名字（UMD 格式时此参数必须指定）
        name: 'Utils',
      },
    ],
    /**
     * 指定不需要打包的外部依赖
     * 指出应该将那些模块看做外部模块，不和我们的源码打包在一起，该参数接收数组或者参数为模块名撑的函数，返回true则认为是外部模块，不和源码打包在一起
     */
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
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
    // 当设置为 true 时，rollup-plugin-dts 会尊重 Rollup 配置中的 external 选项。
    // 这意味着在生成 TypeScript 声明文件时，插件会将 external 中指定的模块视为外部依赖，而不会将它们的类型信息打包到生成的 .d.ts 文件中。
    // 通过这个配置，你可以更好地控制生成的类型定义文件的内容，确保它们只包含项目内部的类型定义，而不包括外部依赖的类型。
    plugins: [dts({ respectExternal: true })],
  })),
];
```

资料：

- [【实战篇】最详细的 Rollup 打包项目教程](https://juejin.cn/post/7145090564801691684?searchId=20241024103639767C9157D9FC33E21B3A)
- [你是怎样的rollup-- rollup打包typescript编写的类库](https://juejin.cn/post/7049354102509142029?searchId=20241024104652208A25727BF3B6D68D07)


```js
import fs from 'fs';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

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
  alias({
    entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
  }),
  resolve({
    preferBuiltins: true,
  }),
  json(),
  commonjs(),
  esbuild({
    target: 'node14',
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
```

**如果 rollup-plugin-babel 新增插件**

`rollup-plugin-babel` 起到的作用：

1. 代码转换：Babel 可以将新版本的 JavaScript（如 ES6+）转换为向后兼容的 JavaScript 版本，以确保代码可以在旧版浏览器或环境中运行。
2. 语法转换：它可以转换 JSX、TypeScript 等非标准 JavaScript 语法。
3. polyfill 注入：Babel 可以根据目标环境自动添加所需的 polyfill，以支持新的 JavaScript 特性。
4. 插件系统：Babel 有丰富的插件生态系统，可以进行各种代码转换和优化。
5. 源码映射：生成源码映射（source maps），便于调试。

新增 babel 后，Babel 将在 esbuild 之前运行，处理更复杂的转换，而 esbuild 则用于快速的代码压缩和简单转换。
请注意，由于已经使用了 esbuild 进行代码转换，添加 Babel 可能会导致构建过程变慢。除非您需要 Babel 的特定功能（如某些无法通过 esbuild 实现的转换），否则可能不需要同时使用这两个工具。

`rollup-plugin-esbuild` 其作用：

1. 目前，rollup-plugin-esbuild 在您的配置中确实起着重要作用。它负责：
   - 将 TypeScript 代码转换为 JavaScript
   - 进行代码压缩和优化
   - 将代码转换为目标环境
2. 与 Babel 的重叠：如果引入 rollup-plugin-babel，确实会与 rollup-plugin-esbuild 的一些功能重叠，特别是在代码转换方面。
3. 保留 esbuild 的理由：
  - 速度：esbuild 通常比 Babel 快得多
  - 简单性：esbuild 配置较为简单
  - 足够的功能：对于大多数现代 JavaScript/TypeScript 项目，esbuild 的功能已经足够
4. 除非您需要 Babel 的特定功能（如某些复杂的自定义转换），否则保留 rollup-plugin-esbuild 是个不错的选择。



如何我在项目中又新增一个rollup-plugin-typescript2插件呢，它的作用是什么，它与babel中使用的@babel/preset-typescript 又有何关系呢？

1. rollup-plugin-typescript2 的作用：
   - 直接将 TypeScript 代码编译为 JavaScript
   - 进行类型检查
   - 生成声明文件（.d.ts）

2. 添加 rollup-plugin-typescript2：
   首先安装插件：
   ```
   pnpm add -D rollup-plugin-typescript2 typescript
   ```

   然后在 rollup.config.js 中添加：

   ```javascript:rollup.config.js
   import typescript from 'rollup-plugin-typescript2';

   const plugins = [
     // ... 其他插件 ...
     typescript({
       tsconfig: './tsconfig.json', // 指定 tsconfig 文件路径
       clean: true // 清理临时文件
     }),
     esbuild({
       target: 'es2018',
     }),
   ];
   ```

3. rollup-plugin-typescript2 vs @babel/preset-typescript：
   - rollup-plugin-typescript2 使用 TypeScript 编译器，提供完整的类型检查和 .d.ts 文件生成。
   - @babel/preset-typescript 只进行语法转换，不做类型检查，也不生成 .d.ts 文件。
   - rollup-plugin-typescript2 通常编译速度较慢，但类型安全性更高。
   - @babel/preset-typescript 编译速度快，但缺少类型检查。

4. 使用建议：
   - 如果需要类型检查和生成声明文件，使用 rollup-plugin-typescript2。
   - 如果只需要快速转换语法，可以使用 @babel/preset-typescript。
   - 在您的配置中，已经使用了 esbuild，它也能处理 TypeScript。除非需要特定功能，否则可能不需要额外的 TypeScript 插件。

5. 注意事项：
   使用 rollup-plugin-typescript2 时，确保项目根目录有正确配置的 tsconfig.json 文件。

总之，除非您特别需要 rollup-plugin-typescript2 的类型检查或 .d.ts 文件生成功能，否则现有的 esbuild 配置可能已经足够处理 TypeScript 代码了。添加额外的插件可能会增加构建时间，所以请根据项目需求权衡使用。