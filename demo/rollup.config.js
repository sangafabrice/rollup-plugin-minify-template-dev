/** @flow */
import { string } from "rollup-plugin-string";
import minifyTemplate from "rollup-plugin-minify-template";
import flow from "rollup-plugin-flow";
import urlResolve from "rollup-plugin-url-resolve";
import type { OptionExtension, Plugin } from "rollup-plugin-minify-template";
import type { Config } from "config";

// $FlowFixMe[unsafe-addition]
// $FlowFixMe[cannot-resolve-name]
process.chdir(import.meta.dirname + "/w3c");

const stringPlugin = string({ include: "src/assets/*.*" });

const extensions: OptionExtension = [ ".html", ".css", ".svg" ];

const minifyPlugin = minifyTemplate({ extensions });

const input = "src/index.js";

const configs: Config = {
	input,
	output: {
		file: "lib/photocarousel.js",
        format: "iife",
        name: "photocarousel"
	},
	context: "window",
	plugins: [
		flow(),
		urlResolve(),
		minifyPlugin,
		stringPlugin
	]
};

export default configs;