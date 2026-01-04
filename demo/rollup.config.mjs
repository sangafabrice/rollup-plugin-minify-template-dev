import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
require("@babel/register")({
    only: [ /rollup\.config\.js$/ ],
    cache: false
});

export default require("./rollup.config").default;