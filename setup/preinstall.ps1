#!/usr/bin/env pwsh

node "$PSScriptRoot/dependencies.cjs"

Set-Location src/
(git branch --show-current) -or (git switch main) > $null
if (git config get branch.lib.merge) { return }
git branch -f lib origin/lib
git worktree add ../lib