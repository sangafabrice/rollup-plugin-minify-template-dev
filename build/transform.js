#!/usr/bin/env node

import { transformFileSync } from "@babel/core";
import { writeFileSync, watchFile } from "node:fs";
import { join } from "node:path";
import { mainScript, outputScript } from "./main.js";
import configFile from "build/babelrc";

watchFile(mainScript, function () {
    if (!arguments.length)
        console.log(`The ${mainScript} watcher is ready.`);
    writeFileSync(
        outputScript,
        transformFileSync(mainScript, {
            babelrc: false,
            configFile
        }).code
    );
    console.log("✔ emitted " + outputScript);
}).emit("change");