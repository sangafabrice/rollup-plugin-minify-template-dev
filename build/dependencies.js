#!/usr/bin/env node

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ncu = require("npm-check-updates");

ncu.run({
    upgrade: true,
    workspaces: true
}).then(console.log);