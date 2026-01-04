#!/usr/bin/env node

import { transformFileSync } from "@babel/core";
import { writeFileSync, watchFile } from "node:fs";
import { mainScript, outputScript }from "./main.js";

watchFile(mainScript, function () {
    if (!arguments.length)
        console.log(`The ${mainScript} watcher is ready.`);
    writeFileSync(outputScript, transformFileSync(mainScript).code)
    console.log("✔ emitted " + outputScript);
}).emit("change");