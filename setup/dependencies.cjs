#!/usr/bin/env node

const { execSync, exec } = require("child_process");

module.paths.push(execute("npm root --global"));
const ncu = require("npm-check-updates");

ncu.run({
    upgrade: true,
    workspaces: true
})
.then(console.log)
.then(() => {
    process.chdir("src/");
    execute("git branch --show-current").length ||
    exec("git switch main");
    exec("git config get branch.lib.merge", e => {
        if (!e) return;
        execSync("git branch -f lib origin/lib");
        execSync("git worktree add ../lib");
    });
})
.then(() => console.log("✔ library and source setup complete."));

function execute (command) {
    try {
        return execSync(command).toString().trim();
    } catch (error) {
        return "";
    }
}