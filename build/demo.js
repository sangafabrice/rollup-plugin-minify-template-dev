#!/usr/bin/env node

import { loadConfigFile } from "rollup/loadConfigFile";
import { rollup } from "rollup";
import { writeFileSync, watchFile, rmSync } from "node:fs";
import { resolve } from "node:path";
import { mainScript, outputScript }from "./main.js";

process.chdir("demo/");

const cfgname = "rollup.config";
const [ dist, config, configmjs ] = [
        "dist",
        ...[ ".js", ".mjs" ].map(ext => cfgname + ext) 
    ];

rmSync(dist, { force: true, recursive: true });

watchFile(config, async function () {
    if (!arguments.length)
        console.log(`The ${config} watcher is ready.`);
    await loadConfigFile(resolve(configmjs))
        .then(({ options }) =>
            options.forEach(async (option) => {
                const { input, output } = option;
                output.map((await rollup(option)).write);
                console.info("✔", input, "→", output.map(({ file }) => file));
            })
        );
}).emit("change");