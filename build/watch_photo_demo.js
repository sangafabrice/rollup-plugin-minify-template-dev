#!/usr/bin/env node

import { loadConfigFile } from "rollup/loadConfigFile";
import { rollup, watch } from "rollup";
import { resolve, relative } from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { server } = yargs(hideBin(process.argv))
    .scriptName("start")
    .option("server", {
        boolean: true,
        array: false,
        default: true
    })
    .parse();

process.chdir("demo/");

const cliargs = { 
    configNoServer: !server,
    watch: true
}

const configfile = resolve("./rollup.config.mjs");

loadConfigFile(configfile, cliargs, true)
    .then(({ options }) => options[0])
    .then(watch)
    .then(watcher =>
        watcher.on("event", ({ code, input, output }) =>
            code == "BUNDLE_END" &&
                console.log(
                    "%s → %j at %s\nWaiting for changes...",
                    input,
                    output.map(bundle => relative(".", bundle)),
                    new Date().toISOString().replace('T', ' ').split('.')[0]
                )
        )
    );