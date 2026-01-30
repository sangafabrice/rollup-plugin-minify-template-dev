#!/usr/bin/env node

import fs from "node:fs/promises";
import prettier from "prettier";

for await (const filepath of fs.glob(
    "**/*.{js,cjs,mjs,html,css,json}",
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
        .then(formatted => formatted.trim())
        .then(fs.writeFile.bind(fs, filepath))
        .then(() => console.log(`✔ formatted ${filepath}`))
        .catch(err =>
            console.error(
                `✖ failed ${filepath}`,
                err.message
            )
        );