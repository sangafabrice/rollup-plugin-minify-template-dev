import cssconfig from "./eslint/css.eslintrc.js";
import { defineConfig } from "eslint/config";
import flowconfig from "./eslint/flow.eslintrc.js";
import htmlconfig from "./eslint/html.eslintrc.js";
import jsconfig from "./eslint/js.eslintrc.js";

export default defineConfig([
    { files: ["**/*.css"], extends: [cssconfig] },
    { files: ["**/*.html"], extends: [htmlconfig] },
    {
        files: ["**/*.{js,mjs,cjs}"],
        ignores: ["**/{lib,dist}/*"],
        extends: [jsconfig]
    },
    {
        files: ["{@flowtyped,demo,src}/**/*.{js,cjs,flow}"],
        ignores: ["**/package.js"],
        extends: [flowconfig]
    },
    {
        linterOptions: {
            reportUnusedDisableDirectives: "warn"
        }
    }
]);