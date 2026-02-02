#!/usr/bin/env node

import { basename } from "node:path";
import findObj from "find-process";
import flowBin from "flow-bin";
import { spawn } from "node:child_process";
const find = findObj.default;

spawn(flowBin, ["stop"], { stdio: "inherit" }).on(
    "close",
    function stop() {
        find("name", basename(flowBin), {
            strict: true
        }).then(list => {
            if (!list.length) return;
            list.forEach(({ pid }) => {
                try {
                    process.kill(pid, "SIGINT");
                } catch (e) {
                    console.error(e.message);
                }
            });
            setTimeout(stop, 1000);
        });
    }
);