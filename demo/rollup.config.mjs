import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
require("@babel/register")({
    only: [ /rollup\.config\.js$/ ],
    cache: false,
    babelrc: false,
    presets: [ [
        "@babel/preset-flow",
        { "experimental_useHermesParser": true }
    ] ]
});

export default require("./rollup.config").default;