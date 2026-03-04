#!/usr/bin/env node

import getpkg, { outpkgConfig } from "./main.js";
import { writeFileSync } from "node:fs";

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
writeFileSync(outpkgConfig, JSON.stringify(pkg, null, 2));
console.log("✔ emitted " + outpkgConfig);