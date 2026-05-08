import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist", "node_modules", "tests/**"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-syntax": [
        "warn",
        {
          selector: "JSXAttribute[value.type='Literal'][value.value=/^#[0-9a-fA-F]{3,8}$/i]",
          message: "Avoid inline hex colors in components. Use theme tokens or Tailwind utilities.",
        },
      ],
    },
  }
)
