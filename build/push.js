#!/usr/bin/env node

import { simpleGit } from "simple-git";

const git = simpleGit();

git.push([
    "--all",
    "--recurse-submodules=on-demand"
]).then(console.log);