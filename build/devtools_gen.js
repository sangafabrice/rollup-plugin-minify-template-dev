#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root = "demo/w3c";

process.chdir(root);

const devtoolsParent = ".well-known/appspecific";
const configFile = path.join(devtoolsParent, "com.chrome.devtools.json");

fs.mkdir(devtoolsParent, { recursive: true })
    .then(() => {
        const config = {
            workspace: {
                root: path.resolve(".").replace(/\\/g, "/"),
                uuid: crypto.randomUUID()
            }
        };
        return JSON.stringify(config, null, 2);
    })
    .then(fs.writeFile.bind(fs, configFile))
    .then(() => console.log("DevTools config written to: %s", configFile))
    .catch(console.error);;