import babelrcPath from "build/babelrc";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
require("@babel/register")({
    only: [/rollup\.config\.js$/],
    cache: false,
    babelrc: false,
    configFile: babelrcPath
});

export default require("./rollup.config").default;