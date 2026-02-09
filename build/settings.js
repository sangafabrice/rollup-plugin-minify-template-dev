#!/usr/bin/env node

import fs from "node:fs/promises";
import jsonc from "comment-json";

const vscodedir = ".vscode";
const settingsFile = vscodedir + "/settings.json";
const settingsText = fs
    .mkdir(vscodedir, { recursive: true })
    .then(() =>
        fs
            .readFile(settingsFile, { encoding: "utf8" })
            .catch(() => "{\n}")
    );

settingsText
    .then(jsonc.parse)
    .then(function (settings) {
        const setSetting = (
            propertyname,
            value,
            linecomment
        ) => {
            if (
                settings[propertyname] == value ||
                settings[propertyname] === value
            )
                return;
            settings[propertyname] = value;
            linecomment &&
                (settings[
                    Symbol.for("before:" + propertyname)
                ] ??= []).push({
                    type: "LineComment",
                    value: " @generated: " + linecomment,
                    inline: false
                });
        };

        setSetting(
            "javascript.validate.enable",
            false,
            "Required when setting up Flow.js"
        );
        setSetting(
            "livePreview.previewDebounceDelay",
            1000,
            "Required when setting up Live Preview"
        );
        setSetting("livePreview.serverRoot", "/demo/w3c");
        setSetting(
            "files.associations",
            { "*.scripts.json": "jsonc" },
            "Required when setting up the npm scripts JSONC file"
        );
        setSetting(
            "editor.defaultFormatter",
            "esbenp.prettier-vscode",
            "Required when setting up the Prettier formatter"
        );
        setSetting("editor.formatOnSave", true);
        setSetting(
            "prettier.prettierPath",
            "./node_modules/prettier"
        );
        setSetting("prettier.configPath", "./.prettierrc");
        setSetting(
            "prettier.ignorePath",
            "./.prettierignore"
        );
        setSetting("json.schemas", [
            {
                fileMatch: ["/.prettierrc"],
                url: "https://www.schemastore.org/prettierrc.json"
            },
            {
                fileMatch: [
                    "/.babelrc",
                    "/babel.config.json"
                ],
                url: "https://json.schemastore.org/babelrc.json"
            }
        ]);

        return settingsText
            .then(detectIndent)
            .then(
                jsonc.stringify.bind(jsonc, settings, null)
            );
    })
    .then(fs.writeFile.bind(fs, settingsFile))
    .then(() => console.log("✔ settings configured"))
    .catch(console.log);

function detectIndent(text) {
    const lines = text.split(/\r?\n/);

    for (const line of lines) {
        const match = line.match(/^(\s+)\S/);
        if (match)
            return match[1].includes("\t")
                ? "\t"
                : match[1].length;
    }

    // fallback
    return 4;
}