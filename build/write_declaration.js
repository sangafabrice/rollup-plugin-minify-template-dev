#!/usr/bin/env node

/**
 * @fileoverview
 * Emit a .js.flow declaration file from a Flow-typed JS source.
 */
import fs from "node:fs";
import { parse } from "@babel/parser";
import * as t from "@babel/types";
import { createRequire } from "node:module";
import { mainScript, outputScript } from "./main.js";

const require = createRequire(import.meta.url);
const traverse = require("@babel/traverse").default;

/* -------------------------------------------------------------------------- */
/* 1. Parse                                                                   */
/* -------------------------------------------------------------------------- */

function parseFlow(source) {
    return parse(source, {
        sourceType: "module",
        plugins: ["flow", "flowComments"]
    });
}

/* -------------------------------------------------------------------------- */
/* 2. Collect all type aliases (exported + private)                           */
/* -------------------------------------------------------------------------- */

function collectTypeAliases(ast) {
    const aliases = new Map();

    traverse(ast, {
        TypeAlias(path) {
            const { node, parentPath } = path;
            aliases.set(node.id.name, {
                node,
                exported:
                    parentPath.isExportNamedDeclaration()
            });
        }
    });

    return aliases;
}

/* -------------------------------------------------------------------------- */
/* 3. Extract public API                                                      */
/* -------------------------------------------------------------------------- */

function extractPublicAPI(ast) {
    const api = {
        hasFlow: false,
        typeImports: [],
        typeReExports: [],
        exportedTypes: [],
        defaultExport: null
    };

    traverse(ast, {
        Program(path) {
            api.hasFlow = /@flow/.test(
                path.node.body[0].leadingComments[0].value
            );
        },

        ImportDeclaration(path) {
            const { node } = path;
            if (node.importKind == "type")
                api.typeImports.push(node);
        },

        ExportNamedDeclaration(path) {
            const { node } = path;
            const { declaration, exportKind } = node;
            if (exportKind == "type" && !declaration)
                api.typeReExports.push(node);
            if (t.isTypeAlias(declaration))
                api.exportedTypes.push(declaration);
        },

        ExportDefaultDeclaration(path) {
            const { declaration, leadingComments } =
                path.node;
            if (t.isFunctionDeclaration(declaration))
                api.defaultExport = {
                    fn: declaration,
                    jsdoc: leadingComments
                };
        }
    });

    return api;
}

/* -------------------------------------------------------------------------- */
/* 4. Resolve types (inline private aliases, preserve exported ones)          */
/* -------------------------------------------------------------------------- */

function resolveType(node, aliases, stack = new Set()) {
    switch (node?.type) {
        case "GenericTypeAnnotation": {
            const {
                type,
                qualification,
                id,
                name: nodename
            } = node.id;
            const name =
                type === "QualifiedTypeIdentifier"
                    ? `${qualification.name}.${id.name}`
                    : nodename;
            const { typeParameters } = node;
            const typeParams = typeParameters
                ? `<${typeParameters.params.map(p => resolveType(p, aliases, stack)).join(", ")}>`
                : "";
            const alias = aliases.get(name);

            if (!alias || alias.exported || stack.has(name))
                return `${name}${typeParams}`;

            stack.add(name);

            return resolveType(
                alias.node.right,
                aliases,
                stack
            );
        }

        case "UnionTypeAnnotation":
            return node.types
                .map(t => resolveType(t, aliases, stack))
                .join(" | ");

        case "ObjectTypeAnnotation":
            return `{ ${node.properties
                .map(
                    p =>
                        `${p.key.name}${p.optional ? "?" : ""}: ${resolveType(p.value, aliases, stack)}`
                )
                .join(", ")} }`;

        case "ArrayTypeAnnotation":
            return `Array<${resolveType(node.elementType, aliases, stack)}>`;
    }

    return "any";
}

/* -------------------------------------------------------------------------- */
/* 5. Printers                                                                */
/* -------------------------------------------------------------------------- */

function printTypeImport(node) {
    const { specifiers, source } = node;
    const names = specifiers
        .map(s => s.imported.name)
        .join(", ");
    return `import type { ${names} } from "${source.value}";`;
}

function printTypeReExport(node) {
    const { specifiers, source } = node;
    const names = specifiers
        .map(s => s.exported.name)
        .join(", ");
    return `export type { ${names} } from "${source.value}";`;
}

function printExportedType(alias, aliases) {
    return `export type ${alias.id.name} = ${resolveType(alias.right, aliases)};`;
}

function printParam(param, aliases) {
    if (t.isAssignmentPattern(param))
        return printParam(param.left, aliases).replace(
            /(\w+)(\??):/,
            "$1?:"
        );

    if (t.isIdentifier(param)) {
        const type = param.typeAnnotation
            ? resolveType(
                  param.typeAnnotation.typeAnnotation,
                  aliases
              )
            : "any";
        return `${param.name}${param.optional ? "?" : ""}: ${type}`;
    }

    return "any";
}

function printDefaultExport(fn, jsdoc, aliases) {
    const doc =
        jsdoc?.map(c => `/**${c.value}*/`).join("\n") ?? "";
    const params = fn.params
        .map(p => printParam(p, aliases))
        .join(", ");
    const returnType = fn.returnType
        ? resolveType(fn.returnType.typeAnnotation, aliases)
        : "any";

    return (
        `${doc}\ndeclare export default function ${fn.id.name}(${params}): ${returnType}`.trim() +
        ";"
    );
}

/* -------------------------------------------------------------------------- */
/* 6. Build .js.flow                                                          */
/* -------------------------------------------------------------------------- */

function buildFlowDeclaration(ast) {
    const api = extractPublicAPI(ast);
    const aliases = collectTypeAliases(ast);
    const out = [];
    const {
        hasFlow,
        typeImports,
        typeReExports,
        exportedTypes,
        defaultExport: { fn, jsdoc }
    } = api;

    if (hasFlow) out.push("/** @flow */", "");

    out.push(
        ...typeImports.map(printTypeImport),
        ...typeReExports.map(printTypeReExport),
        ""
    );
    out.push(
        ...exportedTypes.map(t =>
            printExportedType(t, aliases)
        ),
        ""
    );
    out.push(printDefaultExport(fn, jsdoc, aliases));

    return out.join("\n");
}

/* -------------------------------------------------------------------------- */
/* 7. CLI                                                                     */
/* -------------------------------------------------------------------------- */

fs.watchFile(mainScript, function () {
    if (!arguments.length)
        console.log(`The ${mainScript} watcher is ready.`);

    const source = fs.readFileSync(mainScript, "utf8");
    const ast = parseFlow(source);
    const flow = buildFlowDeclaration(ast);
    const flowfile = outputScript + ".flow";

    fs.writeFileSync(flowfile, flow);
    console.log("✔ emitted " + flowfile);
}).emit("change");