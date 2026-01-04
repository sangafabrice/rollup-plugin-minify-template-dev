#!/usr/bin/env node

import findObj from "find-process";
import flowBin from "flow-bin";
import { spawn } from "node:child_process";
import { basename } from "node:path";
const find = findObj.default;

spawn(flowBin, [ "stop" ], { stdio: "inherit" })
.on("close", function stop() {
    find("name", basename(flowBin), {strict: true})
        .then(list => {
            if (!list.length) return;
            list.forEach(({ pid }) => {
                try {
                    process.kill(pid, "SIGINT");
                } catch (e) { }
            });
            setTimeout(stop, 1000);
        });
});