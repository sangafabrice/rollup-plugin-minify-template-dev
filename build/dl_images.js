#!/usr/bin/env node

import { createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import { get } from "node:https";

const imgpath = "demo/w3c/img";

fs.mkdir(imgpath, { recursive: true })
    .then(() => process.chdir(imgpath))
    .then(() =>
        ["fBmIASF", "3zxD6rz", "nKBgeLOr", "yVjJZ1Yr"]
            .map(id => id + ".jpg")
            .forEach(download)
    )
    .catch(console.error);

function download(jpg) {
    get(`https://i.imgur.com/${jpg}`, response => {
        const { statusCode: status } = response;
        const ok = status === 200;
        if (!ok)
            throw new Error(`Failed ${jpg}: ${status}`);
        response.pipe(createWriteStream(jpg));
    });
}