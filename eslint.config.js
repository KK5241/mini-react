import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export const defineConfig = [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js, prettier: prettierPlugin },
    languageOptions: { globals: globals.browser },
    parserOptions: {
      tsconfigRootDir,
      // 如果你启用了需要类型信息的规则（recommended-type-checked 等），这里必须配 project
      project: ['./tsconfig.json'],
    },
  },
  {
    files: ['scripts/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
];

export default defineConfig;
