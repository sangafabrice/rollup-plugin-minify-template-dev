import { defineConfig } from "eslint/config";
import html from "@html-eslint/eslint-plugin";

export default defineConfig([
    {
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
    }
]);