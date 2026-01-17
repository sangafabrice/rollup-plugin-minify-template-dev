#!/usr/bin/env pwsh

Set-Location src/
if (!(git branch --show-current)) {
    git switch main
}
if (git config get branch.lib.merge) { return }
git branch -f lib origin/lib
git worktree add ../lib