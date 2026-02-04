import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        language: "css/css",
        plugins: { css },
        extends: ["css/recommended"]
    }
]);