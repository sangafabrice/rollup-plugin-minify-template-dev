/** @flow */
const { string } = require("rollup-plugin-string");
const { default: minifyTemplate } = require("rollup-plugin-minify-template");
import type { OptionExtension, Plugin } from "rollup-plugin-minify-template";
import type { Config } from "config";

// $FlowFixMe[cannot-resolve-name]
process.chdir(__dirname);

const stringPlugin = string({ include: "src/assets/*.*" });

const extensions: ReadonlyArray<OptionExtension> = [
	".html",
	[ ".css" ],
	[],
	[ ".css", ".svg" ],
	[ ".html", ".css", ".svg" ]
];

const input = "src/example.js";

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

const options = configs.concat(configsToConcat) as Array<Config>;

module.exports = options;

if (require.main === module) {
	const { rollup } = require("rollup");
	options.forEach(async (option) => {
		const { input, output } = option;
		(await rollup(option)).write(output);
		console.info("✔", input, "→", output.file);
	});
}