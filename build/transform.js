#!/usr/bin/env node

import { transformFileSync } from "@babel/core";
import { writeFileSync, watchFile } from "node:fs";
import { join } from "node:path";
import { mainScript, outputScript }from "./main.js";

watchFile(mainScript, function () {
    if (!arguments.length)
        console.log(`The ${mainScript} watcher is ready.`);
    writeFileSync(outputScript, transformFileSync(mainScript, {
        babelrc: false,
        configFile: join(import.meta.dirname, ".babelrc")
    }).code)
    console.log("✔ emitted " + outputScript);
}).emit("change");