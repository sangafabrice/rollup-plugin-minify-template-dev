import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
require("@babel/register")({
    only: [ /rollup\.config\.js$/ ],
    cache: false,
    babelrc: false,
    configFile: join(import.meta.dirname, "../build/.babelrc")
});

export default require("./rollup.config").default;