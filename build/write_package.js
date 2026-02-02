#!/usr/bin/env node

import getpkg, { outpkgConfig, pkgConfig } from "./main.js";
import { watchFile, writeFileSync } from "node:fs";

watchFile(pkgConfig, function () {
    if (!arguments.length)
        console.log(`The ${pkgConfig} watcher is ready.`);
    writeFileSync(
        outpkgConfig,
        JSON.stringify(
            getpkg(),
            (key, value) => {
                if (key != "scripts")
                    return key == "name"
                        ? value.slice(0, -"src".length - 1)
                        : value;
            },
            2
        )
    );
    console.log("✔ emitted " + outpkgConfig);
}).emit("change");