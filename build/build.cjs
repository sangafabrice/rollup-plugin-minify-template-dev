#!/usr/bin/env node

const { glob, copyFile, rm } = require("node:fs").promises;
const { basename } = require("node:path");

(async function () {
    await removeItem("lib/*");
    await copyItem("src/*", "lib/");
    [
        "transform",
        "write_declaration",
        "write_package",
    ].forEach(name => require(`build/${name}`));
})();

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