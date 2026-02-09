import babel from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";
import ftFlow from "eslint-plugin-ft-flow";

export default defineConfig({
    files: ["{@flowtyped,demo,src}/**/*.{js,cjs,flow}"],
    ignores: ["**/package.js"],
    languageOptions: {
        sourceType: "module",
        parser: babel,
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                babelrc: false,
                presets: ["@babel/preset-flow"]
            }
        }
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
        "ft-flow/no-primitive-constructor-types": "error",
        "ft-flow/no-types-missing-file-annotation": "error",
        "ft-flow/no-unused-expressions": "warn"
    },
    settings: {
        "ft-flow": { onlyFilesWithFlowAnnotation: true }
    }
});