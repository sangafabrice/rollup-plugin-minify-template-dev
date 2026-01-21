/** @flow */
import { string } from "rollup-plugin-string";
import minifyTemplate from "rollup-plugin-minify-template";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// $FlowFixMe[cannot-resolve-module]
import configFile from "build/babelrc";
import type { OptionExtension, Plugin } from "rollup-plugin-minify-template";
import type { Config } from "config";

// $FlowFixMe[unsafe-addition]
// $FlowFixMe[cannot-resolve-name]
process.chdir(import.meta.dirname + "/w3c");

const stringPlugin = string({ include: "src/assets/*.*" });

const extensions: OptionExtension = [ ".html", ".css", ".svg" ];

const minifyPlugin = minifyTemplate({ extensions });

const babelPlugin = babel({
	babelHelpers: "bundled",
	comments: false,
	configFile
});

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
		babelPlugin,
		nodeResolve(),
		commonjs(),
		minifyPlugin,
		stringPlugin
	]
};

export default configs;