import { readFileSync } from "node:fs";

const pkgConfig = "src/package.json";
const pkg = JSON.parse(readFileSync(pkgConfig, "utf8"));
const mainScriptName = pkg.main;
const mainScript = "src/" + mainScriptName;
const outputScript = "lib/" + mainScriptName;

export { mainScriptName, mainScript, outputScript };