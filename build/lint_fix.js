#!/usr/bin/env node

import { ESLint } from "eslint";

(async function main() {
    // 1. Create an instance with the `fix` option.
    const eslint = new ESLint({ fix: true });

    // 2. Lint files. This doesn't modify target files.
    const results = await eslint.lintFiles(".");

    // 3. Modify the files with the fixed code.
    await ESLint.outputFixes(results);

    const shouldFormat = results.some(
        ({ errorCount }) => errorCount
    );
    process.exitCode = Number(shouldFormat);
    if (!shouldFormat) return;

    // 4. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    // 5. Output it.
    console.error(
        "\x1b[4;33mErrors from ESLINT:\x1b[0m\n",
        resultText
    );
})().catch(error => {
    process.exitCode = 1;
    console.error(error);
});