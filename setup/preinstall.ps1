#!/usr/bin/env pwsh

$envcontent = "NODE_PATH=$(npm root --global)"
$envfile = "setup/dep.env"
Write-Output $envcontent > $envfile
node --env-file=$envfile build/dependencies
Remove-Item $envfile -ErrorAction SilentlyContinue

Set-Location src/
if (!(git branch --show-current)) {
    git switch main
}
if (git config get branch.lib.merge) { return }
git branch -f lib origin/lib
git worktree add ../lib