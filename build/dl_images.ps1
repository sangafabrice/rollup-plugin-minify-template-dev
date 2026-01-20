#!/usr/bin/env pwsh

$imgdir = "demo/w3c/img"
New-Item $imgdir -ItemType Directory -ErrorAction SilentlyContinue
curl 'https://i.imgur.com/{fBmIASF,3zxD6rz,nKBgeLOr,yVjJZ1Yr}.jpg' --parallel --output "$imgdir/#1.jpg"