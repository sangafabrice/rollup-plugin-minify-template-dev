#!/usr/bin/env node

import {
    mainScript,
    outputCjsScript,
    outputScript
} from "./main.js";
import {
    transformAsync,
    transformFileAsync
} from "@babel/core";
import cjsOptions from "build/commonjs/babelrc" with { type: "json" };
import configFile from "build/babelrc";
import fs from "node:fs/promises";
import { watchFile } from "node:fs";

const babelrc = false;
const writeFile = (outscript, code) =>
    fs
        .writeFile(outscript, code)
        .then(() => console.log("✔ emitted %s", outscript))
        .catch(console.error);

watchFile(mainScript, function () {
    if (!arguments.length)
        console.log(`The ${mainScript} watcher is ready.`);
    transformFileAsync(mainScript, { babelrc, configFile })
        .then(function ({ code }) {
            writeFile(outputScript, code);
            return transformAsync(code, {
                babelrc,
                ...cjsOptions
            });
        })
        .then(({ code }) =>
            writeFile(outputCjsScript, code)
        )
        .catch(console.error);
}).emit("change");