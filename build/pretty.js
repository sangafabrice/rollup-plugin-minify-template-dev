#!/usr/bin/env node

import fs from "node:fs/promises";
import prettier from "prettier";

for await (const filepath of fs.glob(
    "**/*.{js,cjs,mjs,html,css,json,flow}",
    {
        exclude: [
            "node_modules/**",
            "dist/**",
            "lib/**",
            "**/package-lock.json"
        ]
    }
))
    Promise.allSettled([
        fs.readFile(filepath, "utf8"),
        prettier.resolveConfig(filepath)
    ])
        .then(
            ({ 0: { value: raw }, 1: { value: config } }) =>
                prettier.format(
                    raw,
                    Object.assign(config, { filepath })
                )
        )
        .then(
            String.prototype.trim.call.bind(
                String.prototype.trim
            )
        )
        .then(fs.writeFile.bind(fs, filepath))
        .catch(err => {
            process.exitCode ??
                console.error(
                    "\x1b[4;33mErrors from PRETTIER:\x1b[0m\n"
                );
            process.exitCode = 1;
            console.error(
                `✖ failed to format ${filepath}`,
                err.message
            );
        });