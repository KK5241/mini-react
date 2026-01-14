import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export default [
  { ignores: ['dist', 'node_modules', 'apps/*'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ✅ JS 文件：不要用 parserOptions.project
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { prettier: prettierPlugin },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // ✅ TS 文件：才开启 project（类型信息）
  {
    files: ['**/*.{ts,mts,cts}'],
    plugins: { prettier: prettierPlugin },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir,
        project: ['./tsconfig.json'], // monorepo 就写数组
        // project: ['./tsconfig.json', './apps/web/tsconfig.json'],
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // scripts 目录一般是 node 环境
  {
    files: ['scripts/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
];
