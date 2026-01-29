#!/usr/bin/env node

import { loadConfigFile } from "rollup/loadConfigFile";
import { rollup } from "rollup";
import { watchFile, rmSync } from "node:fs";
import { resolve } from "node:path";

process.chdir("demo/");

const cfgname = "rollup.config";
const [dist, config, configmjs] = [
    "dist",
    ...[".js", ".mjs"].map(ext => cfgname + ext)
];

rmSync(dist, { force: true, recursive: true });

const configmjspath = resolve(configmjs);

watchFile(config, async function () {
    if (!arguments.length)
        console.log(`The ${config} watcher is ready.`);
    await loadConfigFile(configmjspath).then(
        ({ options }) =>
            options.forEach(async option => {
                const { input, output } = option;
                output.map((await rollup(option)).write);
                console.info(
                    "✔",
                    input,
                    "→",
                    output.map(({ file }) => file)
                );
            })
    );
}).emit("change");