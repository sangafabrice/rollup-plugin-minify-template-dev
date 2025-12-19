/** @flow */
import { string } from "rollup-plugin-string";
import minifyTemplate from "rollup-plugin-minify-template";
import type { OptionExtension, Plugin } from "rollup-plugin-minify-template";

// $FlowFixMe[cannot-resolve-name]
process.chdir(import.meta.dirname);

const stringPlugin = string({ include: "src/assets/*.*" });

const extensions: ReadonlyArray<OptionExtension> = [
	".html",
	[ ".css" ],
	[],
	[ ".css", ".svg" ],
	[ ".html", ".css", ".svg" ]
];

const input = "src/example.js";

type Config = {
	input: "src/example.js",
	output: { file: string },
	plugins: Array<Plugin>
};

const configs: Array<Config> = [{
	input,
	output: {
		file: "dist/example.js"
	},
	plugins: [
		minifyTemplate(),
		stringPlugin
	]
}];

const configsToConcat = extensions.map((extensions, i): Config => {
	return {
		input,
		output: {
			file: "dist/example-" + (i + 1) + ".js"
		},
		plugins: [
			minifyTemplate({ extensions }),
			stringPlugin
		]
	};
});

export default configs.concat(configsToConcat) as Array<Config>;