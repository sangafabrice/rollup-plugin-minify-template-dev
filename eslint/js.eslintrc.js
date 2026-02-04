import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig({
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["**/{lib,dist}/*"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
        globals: { ...globals.browser, ...globals.node }
    },
    rules: {
        "no-unused-vars": "warn",
        "no-duplicate-imports": "warn",
        "no-template-curly-in-string": "warn",
        "no-unassigned-vars": "warn",
        "no-useless-assignment": "warn",
        camelcase: "warn",
        "no-else-return": "warn",
        "no-div-regex": "warn",
        "no-empty-function": "warn",
        "no-eval": "error",
        "no-extend-native": "warn",
        "no-extra-label": "warn",
        "no-invalid-this": "warn",
        "no-var": "warn",
        "prefer-const": "warn",
        "sort-imports": "warn"
    }
});