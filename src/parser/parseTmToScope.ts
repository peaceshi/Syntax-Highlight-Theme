import { createFileWriteStream, getScopesFromJSON, parseScopesFromJSON } from "../utils.js";

/**
 * Parses a source TM file and writes the processed scopes to a destination scope file.
 *
 * @param sourceTmFile - The path to the source TM file that contains JSON data.
 * @param distScopeFile - The path to the destination scope file where processed data will be written.
 * @returns A promise that resolves when the writing operation is complete.
 */
export const parseTmToScope = async (sourceTmFile: string, distScopeFile: string) => {
    try {
        const result = parseScopesFromJSON(await getScopesFromJSON(sourceTmFile));
        const writeStream = await createFileWriteStream(distScopeFile);

        writeStream.write(`${result.join("\n")}\n`);
        writeStream.end();
    } catch (error) {
        console.error(`parseTmToScope: ${error}`);
        throw error;
    } finally {
        console.log(`Call parseTmToScope: parsed '${sourceTmFile}' to '${distScopeFile}'`);
    }
};
