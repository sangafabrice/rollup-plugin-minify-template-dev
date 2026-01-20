import { createRequire } from "node:module";
import { join } from "node:path";
import babelrcPath from "build/babelrc";

const require = createRequire(import.meta.url);
require("@babel/register")({
    only: [ /rollup\.config\.js$/ ],
    cache: false,
    babelrc: false,
    configFile: babelrcPath
});

export default require("./rollup.config").default;