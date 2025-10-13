import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Отключает проверку на количество строк в файле
      "max-lines": "off",

      // Запрещает циклические импорты, разрешает глубину до 3 уровней
      "import/no-cycle": [
        "error",
        {
          maxDepth: 3,
        },
      ],

      // Отключает проверку на неправильные пробелы (например, нулевые символы и т.д.)
      "no-irregular-whitespace": "off",

      // Требует использовать фигурные скобки для всех блоков (if, else и т.д.)
      curly: ["error", "all"],

      // Требует использовать двойные кавычки (как и prettier)
      quotes: ["error", "double"],

      // Запрещает использование alert
      "no-alert": "error",

      // Предупреждает о console.log и других console вызовах
      "no-console": "warn",

      // Запрещает повторное объявление переменных
      "no-redeclare": "error",

      // Запрещает использование var
      "no-var": "error",

      // Настройка порядка импортов
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "*/**/*.scss",
              group: "sibling",
              position: "after",
            },
            {
              pattern: "./*.scss",
              group: "sibling",
              position: "after",
            },
          ],
        },
      ],

      // Отключает правило про импорт по умолчанию
      "import/default": "off",

      // Отключает правило, запрещающее экспортировать default, если имя совпадает
      "import/no-named-as-default": "off",

      // Запрещает использовать шаблонные строки как обычные строки
      "no-template-curly-in-string": "error",

      // Отключает принудительное деструктурирование
      "prefer-destructuring": "off",

      // Требует использование const вместо let, если переменная не переопределяется
      "prefer-const": "error",

      // Требует использовать стрелочные функции вместо обычных function в коллбеках
      "prefer-arrow-callback": "error",

      // Требует использовать переменные, которые содержат JSX (чтобы избежать false positive)
      "react/jsx-uses-vars": "error",

      // Предпочитает функциональные компоненты, если не требуется состояние
      "react/prefer-stateless-function": "error",

      // Требует точку с запятой
      semi: "error",

      // Отключает правило, запрещающее использование any
      // "@typescript-eslint/no-explicit-any": "off",

      // Отключает правило про префиксы у интерфейсов (например, IExample)
      "@typescript-eslint/interface-name-prefix": "off",

      // Запрещает неиспользуемые переменные
      "@typescript-eslint/no-unused-vars": "error",

      // Отключает правило про camelCase (например, разрешает snake_case)
      "@typescript-eslint/camelcase": "off",

      // Отключает запрет на require
      "@typescript-eslint/no-var-requires": "off",

      // Отключает запрет на использование `@ts-` комментариев
      "@typescript-eslint/ban-ts-comment": "off",

      // Отключает проверку на управляющие символы в регулярках
      "no-control-regex": "off",

      // Обязывает вставлять пустую строку между определёнными конструкциями
      "padding-line-between-statements": [
        "error",
        {
          // Пустая строка перед return, block-like, throw, if, function, default
          blankLine: "always",
          prev: "*",
          next: ["return", "block-like", "throw", "if", "function", "default"],
        },
        {
          // Пустая строка после block-like, throw, if, function
          blankLine: "always",
          prev: ["block-like", "throw", "if", "function"],
          next: "*",
        },
      ],

      // Запрещает дублирование кода в условиях
      "no-dupe-else-if": "error",

      // Требует использования === вместо ==
      eqeqeq: "error",

      // Запрещает пустые блоки кода
      "no-empty": "error",

      // Запрещает fallthrough в switch без комментария
      "no-fallthrough": "error",

      // Запрещает переопределение встроенных объектов
      "no-global-assign": "error",
    },
  },
]);
