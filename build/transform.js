#!/usr/bin/env node

import { mainScript, outputScript } from "./main.js";
import { watchFile, writeFileSync } from "node:fs";
import configFile from "build/babelrc";
import { transformFileSync } from "@babel/core";

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