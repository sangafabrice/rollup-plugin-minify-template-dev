#!/usr/bin/env node

import getpkg, { outpkgConfig, pkgConfig } from "./main.js";
import { watchFile, writeFileSync } from "node:fs";

watchFile(pkgConfig, function () {
    if (!arguments.length)
        console.log(`The ${pkgConfig} watcher is ready.`);
    const pkg = getpkg();
    const main = "./" + pkg.main;
    Object.assign(pkg, {
        name: pkg.name.replace(/-src$/i, ""),
        exports: {
            require: main.replace(/\.js$/i, ".cjs"),
            import: main,
            default: main
        }
    });
    if (Object.hasOwn(pkg, "scripts")) delete pkg.scripts;
    writeFileSync(
        outpkgConfig,
        JSON.stringify(pkg, null, 2)
    );
    console.log("✔ emitted " + outpkgConfig);
}).emit("change");