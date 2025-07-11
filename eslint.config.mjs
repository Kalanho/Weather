import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'comma-dangle': ['error', 'always-multiline'], // Запрещает безразмерные запятые
      'semi': ['error', 'always'], // Требует использовать точки с запятой
      'quotes': ['error', 'single'], // Предпочтение одинарных кавычек
      'no-unused-vars': ['warn'], // Предупреждение о неиспользуемых переменных
      'eqeqeq': ['error', 'always'], // Всегда использовать === и !==
      'indent': ['error', 2], // Использовать 2 пробела для отступов
      'linebreak-style': ['error', 'unix'], // Unix-стиль завершения строки
      'no-multiple-empty-lines': ['error', { max: 1 }], // Максимум 1 пустая строка
      'prefer-const': ['error'], // Предпочитать const для неизменяемых переменных
      'space-before-function-paren': ['error', 'never'], // Пробелы перед скобками функции
    },
  },
]);