#!/usr/bin/env node

const cp = require("child_process");
const { execSync, spawnSync, spawn } = cp;

module.paths.push(execute("npm root --global"));
const ncu = require("npm-check-updates");

ncu.run({
    upgrade: true,
    workspaces: true,
    reject: ["prettier", "eslint"]
})
    .then(console.log)
    .then(() => {
        process.chdir("src/");
        const app = "git";
        const gitSync = spawnSync.bind(cp, app);
        const git = spawn.bind(cp, app);
        const isOutNotEmpty = function () {
            return gitSync(...arguments)
                .stdout.toString()
                .trim().length;
        };
        isOutNotEmpty(["branch", "--show-current"]) ||
            git(["switch", "main"]);
        if (
            isOutNotEmpty([
                "config",
                "get",
                "branch.lib.merge"
            ])
        )
            return;
        gitSync(["branch", "-f", "lib", "origin/lib"]);
        gitSync(["worktree", "add", "../lib"]);
    })
    .then(() =>
        console.log("✔ library and source setup complete.")
    );

function execute(command) {
    try {
        return execSync(command).toString().trim();
    } catch (error) {
        console.log(error.message);
        return "";
    }
}