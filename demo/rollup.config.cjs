/* eslint-disable no-undef */
/** @flow */
/*::
import type { Config } from "config";
import type { OptionExtension } from "rollup-plugin-minify-template";
*/
const { string } = require("rollup-plugin-string");
const {
    default: minifyTemplate
} = require("rollup-plugin-minify-template");
const { babel } = require("@rollup/plugin-babel");
// $FlowFixMe[cannot-resolve-module]
const configFile = require("build/babelrc");

// $FlowFixMe[cannot-resolve-name]
process.chdir(__dirname + "/example/");

const stringPlugin = string({ include: "src/assets/*.*" });

const babelPlugin = babel({
    babelHelpers: "bundled",
    comments: false,
    configFile
});

const plugins = [
    babelPlugin,
    minifyTemplate(),
    stringPlugin
];

const extensions: ReadonlyArray<OptionExtension> = [
    ".html",
    [".css"],
    [],
    [".css", ".svg"],
    [".html", ".css", ".svg"]
];

const input = "src/index.js";

function config(file: string): Config {
    return { input, output: { file }, plugins };
}

const configs = [config("dist/example.js")];

const configsToConcat = extensions.map((extensions, i) => {
    plugins[1] = minifyTemplate({ extensions });
    return config(`dist/example-${i + 1}.js`);
});

const options = configs.concat(
    configsToConcat
) as Array<Config>;

module.exports = options;

if (require.main === module) {
    const { rollup } = require("rollup");
    options.forEach(async option => {
        const { input, output } = option;
        (await rollup(option)).write(output);
        console.info("✔", input, "→", output.file);
    });
}