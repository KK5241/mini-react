import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export const defineConfig = [
  { include: ['**/package/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js, prettier: prettierPlugin },
    languageOptions: { globals: globals.browser },
  },
];

export default defineConfig;
