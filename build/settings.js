#!/usr/bin/env node

import jsonc from "comment-json";
import fs from "node:fs/promises";

const vscodedir = ".vscode";
const settingsFile = vscodedir + "/settings.json";
const settingsText = fs.mkdir(vscodedir, { recursive: true })
    .then(() =>
        fs.readFile(settingsFile, { encoding: "utf8" })
            .catch(() => "{\n}")
    );

settingsText.then(jsonc.parse)
    .then(function (settings) {
        const PROPERTY = "javascript.validate.enable";

        if (settings[PROPERTY] === false)
            throw "javascript validation already disabled";

        // Disabling javascript validation and comment
        settings[PROPERTY] = false;
        (settings[Symbol.for("before:" + PROPERTY)] ??= []).push({
            type: "LineComment",
            value: " @generated: Required when setting up Flow.js",
            inline: false
        });

        return settingsText.then(detectIndent)
            .then(jsonc.stringify.bind(jsonc, settings, null));
    })
    .then(fs.writeFile.bind(fs, settingsFile))
    .then(() => console.log("✔ disabled javascript validation"))
    .catch(console.log)

function detectIndent(text) {
    const lines = text.split(/\r?\n/);

    for (const line of lines) {
        const match = line.match(/^(\s+)\S/);
        if (match) return match[1].includes("\t") ? "\t" : match[1].length;
    }

    // fallback
    return 4;
}