import {
    defaultScopeCSVFile,
    defaultScopeFile,
    defaultScopes,
    scopeCSVDir,
    scopeDir,
    vscodeScopeCSVDir,
    vscodeScopeDir,
    vscodeTmLanguageDir,
} from "./constant.js";
import { parseScopeFilesToCSVFiles, parseTmFilesToScopeFiles } from "./parser/parseFiles.js";
import { parseScopeToCSV } from "./parser/parseScopeToCSV.js";
import { clearDir, createFileWriteStream } from "./utils.js";

await clearDir(scopeDir);
await clearDir(scopeCSVDir);

const writeStream = await createFileWriteStream(defaultScopeFile);
writeStream.write(`${Array.from(defaultScopes).sort().join("\n")}\n`);
writeStream.end();

await parseScopeToCSV(defaultScopeFile, defaultScopeCSVFile);
await parseTmFilesToScopeFiles(vscodeTmLanguageDir, vscodeScopeDir);
await parseScopeFilesToCSVFiles(vscodeScopeDir, vscodeScopeCSVDir);
