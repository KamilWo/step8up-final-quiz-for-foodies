import js from '@eslint/js'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(["node_modules/", "build/", "coverage/", "dist/", "public/"]),
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Enables Node.js global variables
        ...globals.jest, // Enables Jest global variables
      },
    },
    ...js.configs.recommended,
    rules: {
      "no-unused-vars": "warn",
    },
  },

  // Prettier configuration must be last to override other formatting rules
  prettierConfig,
])
