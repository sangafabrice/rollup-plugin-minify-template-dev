#!/usr/bin/env node

module.paths.push(
    require("node:child_process")
        .execSync("npm root --global")
        .toString().trim()
);
const ncu = require("npm-check-updates");

ncu.run({
    upgrade: true,
    workspaces: true
}).then(console.log);