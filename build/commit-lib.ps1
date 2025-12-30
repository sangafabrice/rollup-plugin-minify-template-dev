#!/usr/bin/env pwsh

foreach ($dir in 'lib/','src/') {
    git -C $dir commit-all $($args[0])
}