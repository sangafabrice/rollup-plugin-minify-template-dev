import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import ftFlow from "eslint-plugin-ft-flow";
import globals from "globals";
import hermes from "hermes-eslint";
import html from "@html-eslint/eslint-plugin";
import js from "@eslint/js";

export default defineConfig([
    {
        files: ["**/*.css"],
        language: "css/css",
        plugins: { css },
        extends: ["css/recommended"]
    },
    {
        files: ["**/*.html"],
        plugins: { html },
        extends: ["html/recommended"],
        language: "html/html",
        rules: {
            "html/indent": "off",
            "html/require-closing-tags": [
                "warn",
                { selfClosing: "always" }
            ]
        }
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        ignores: ["**/lib/*", "**/dist/*"],
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
    },
    {
        linterOptions: {
            reportUnusedDisableDirectives: "warn"
        }
    },
    {
        files: ["{@flowtyped,demo,src}/**/*.{js,cjs,flow}"],
        ignores: ["**/package.js"],
        languageOptions: {
            sourceType: "module",
            parser: hermes
        },
        plugins: { "ft-flow": ftFlow },
        rules: {
            "ft-flow/array-style-complex-type": "warn",
            "ft-flow/array-style-simple-type": "warn",
            "ft-flow/arrow-parens": ["warn", "as-needed"],
            "ft-flow/boolean-style": "warn",
            "ft-flow/delimiter-dangle": "warn",
            "ft-flow/enforce-suppression-code": "error",
            "ft-flow/no-dupe-keys": "error",
            "ft-flow/no-duplicate-type-union-intersection-members":
                "error",
            "ft-flow/no-existential-type": "error",
            "ft-flow/no-internal-flow-type": "warn",
            "ft-flow/no-mixed": "warn",
            "ft-flow/no-primitive-constructor-types":
                "error",
            "ft-flow/no-types-missing-file-annotation":
                "error",
            "ft-flow/no-unused-expressions": "warn"
        },
        settings: {
            "ft-flow": { onlyFilesWithFlowAnnotation: true }
        }
    }
]);