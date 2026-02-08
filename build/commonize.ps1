#!/usr/bin/env pwsh

$lib = "lib"; $idxjs = "index.js"; $idxcjs = "index.cjs"
babel $lib/$idxjs --out-file $lib/$idxcjs --plugins "@babel/plugin-transform-modules-commonjs" --plugins "add-module-exports"
npm pkg set exports.require=./$idxcjs exports.import=./$idxjs exports.default=./$idxjs --prefix $lib