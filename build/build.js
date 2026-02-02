#!/usr/bin/env node

import { copyFile, glob, rm } from "node:fs/promises";
import { basename } from "node:path";

removeItem("lib/*")
    .then(() => copyItem("src/*", "lib/"))
    .then(() =>
        [
            "transform",
            "write_declaration",
            "write_package"
        ].forEach(name => import(`./${name}.js`))
    );

async function removeItem(pathLike) {
    for await (const file of glob(pathLike)) {
        await rm(file, { force: true });
    }
}

async function copyItem(pathLike, destination) {
    for await (const file of glob(pathLike)) {
        await copyFile(file, destination + basename(file));
    }
}