import { readFileSync } from "node:fs";

export default function getpkg() {
    return JSON.parse(readFileSync(pkgConfig, "utf8"));
}

const pkgname = "package.json";
const pkgConfig = "src/" + pkgname;
const pkg = getpkg();
const mainScriptName = pkg.main;
const mainScript = "src/" + mainScriptName;
const outputScript = "lib/" + mainScriptName;
const outpkgConfig = "lib/" + pkgname;

export {
    mainScriptName,
    mainScript,
    outputScript,
    outpkgConfig,
    pkgConfig
};