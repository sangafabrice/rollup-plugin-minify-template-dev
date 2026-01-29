#!/usr/bin/env node

import { execSync } from "node:child_process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { watch = false } = yargs(hideBin(process.argv))
    .scriptName("demo")
    .boolean("watch")
    .strict()
    .help()
    .parse();

process.chdir("demo/");
execSync(
    `babel-node ` +
        `--config-file "${import.meta.dirname}/.babelrc" ` +
        `${watch ? "--watch --watch-preserve-output" : ""} rollup.config.cjs`,
    { stdio: "inherit" }
);