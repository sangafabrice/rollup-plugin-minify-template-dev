#!/usr/bin/env node

import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";

const imgpath = "demo/w3c/img";

fs.mkdir(imgpath, { recursive: true })
    .then(() => process.chdir(imgpath))
    .then(() => 
        [
            "fBmIASF",
            "3zxD6rz",
            "nKBgeLOr",
            "yVjJZ1Yr"
        ]
        .map(id => id + ".jpg")
        .forEach(download)
    )
    .catch(console.error);

function download(jpg) {
    return fetch(`https://i.imgur.com/${jpg}`)
        .then(response => {
            if (!response.ok)
                throw new Error(`Failed ${jpg}: ${response.status}`);
            Readable.fromWeb(response.body).pipe(createWriteStream(jpg));
        });
}