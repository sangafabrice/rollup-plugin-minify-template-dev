#!/usr/bin/env node

import { hideBin } from "yargs/helpers";
import { simpleGit } from "simple-git";
import yargs from "yargs";

const DIRS = ["lib", "src"];

const { message, only } = yargs(hideBin(process.argv))
    .scriptName("commit-lib")
    .command("$0 <message..>", "Process a message", yargs =>
        yargs.positional("message", {
            describe: "Message text",
            type: "string"
        })
    )
    .option("only", {
        describe:
            "Limit processing to a specific directory",
        type: "string",
        choices: [...DIRS, "demo/w3c/src"],
        coerce: values => [values]
    })
    .check(argv => {
        const { message, _ } = argv;
        const msg = message.concat(_).join(" ").trim();
        if (!msg.length)
            throw new Error("message must not be empty");
        argv.message = msg;
        argv.only ??= DIRS;
        return true;
    })
    .strict()
    .help()
    .parse();

for (const git of only.map(simpleGit))
    git.add("--all").commit(message).then(console.log);