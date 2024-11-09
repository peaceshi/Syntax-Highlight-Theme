import fs from "node:fs/promises";
import path from "node:path";
import { stripComments } from "jsonc-parser";
import { workspaceRoot } from "./constant.js";

const minifyJSON = (json: string) => JSON.stringify(JSON.parse(stripComments(json)));

for await (const file of await fs.readdir(path.join(workspaceRoot, "themes"))) {
    await fs.writeFile(
        path.join(workspaceRoot, "packages/syntax-highlight/themes", file),
        minifyJSON(await fs.readFile(path.join(workspaceRoot, "themes", file), "utf-8")),
        "utf-8",
    );
}
