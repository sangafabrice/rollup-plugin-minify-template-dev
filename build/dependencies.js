#!/usr/bin/env node

import ncu from "npm-check-updates";

ncu.run({
    upgrade: true,
    install: "always",
    workspaces: true
}).then(console.log);