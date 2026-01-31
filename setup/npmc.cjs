const { findPackageJSON } = require("node:module");
const { parse } = require("comment-json");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");

const cwdURL = pathToFileURL(process.cwd() + "/index.js");
const packagejson = findPackageJSON(".", cwdURL).replace(
    "\\\\?\\",
    ""
);
const scriptsjson = packagejson.replace(
    /(\.json)$/i,
    ".scripts$1"
);

if (!fs.existsSync(scriptsjson)) process.exit();

const scriptsListStr = fs.readFileSync(scriptsjson, "utf8");
const packageListStr = fs.readFileSync(packagejson, "utf8");
const scriptsList = parse(scriptsListStr);
const packageList = JSON.parse(packageListStr);

packageList.scripts = scriptsList;

const packageOutListStr = JSON.stringify(
    packageList,
    null,
    2
);

fs.writeFileSync(packagejson, packageOutListStr, "utf8");