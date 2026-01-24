/** @flow */
import { string } from "rollup-plugin-string";
import minifyTemplate from "rollup-plugin-minify-template";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { autoReload } from "rollup-plugin-auto-reload";
import serve from "rollup-plugin-serve";
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

const servePlugin = serve({
	open: true,
	port: 8080
})

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
		autoReload(),
		servePlugin,
		babelPlugin,
		nodeResolve(),
		minifyPlugin,
		stringPlugin
	]
};

export default function({ configNoServer = false }: { configNoServer: boolean }): Config {
	if (configNoServer)
		configs.plugins = configs.plugins.slice(2)
	return configs;
};