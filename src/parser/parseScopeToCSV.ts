import type { WriteStream } from "node:fs";
import { createFileWriteStream, openFileHandle, parseToken } from "../utils.js";

const csvHeader = "id,root,name,layer,parent,children\n";

/**
 * Parses an array of string data into a CSV format and writes it to a specified stream.
 *
 * @param data - An array of strings representing the data to be parsed.
 * @param startId - The starting ID to be assigned to the first entry in the CSV.
 * @param writeStream - The writable stream where the CSV data will be written.
 * @returns The next available ID after all entries have been processed.
 */
const parseDataToCSV = async (data: string[], startId: number, writeStream: WriteStream) => {
    let currentID = startId;
    const root = data[0];

    for (let i = 0; i < data.length; i++, currentID++) {
        const name = data[i];
        const layer = i;
        const parent = data[i - 1] ?? null;
        const children = data[i + 1] ?? null;
        const line = `${currentID},${root},${name},${layer},${parent},${children}\n`;
        writeStream.write(line);
    }

    return currentID;
};

/**
 * Parses a source scope file and writes the data into a CSV file.
 *
 * @param srcScopeFile - The path to the source scope file to be parsed.
 * @param distCSVFile - The path to the destination CSV file where data will be written.
 */
export const parseScopeToCSV = async (srcScopeFile: string, distCSVFile: string) => {
    try {
        let id = 0;
        const file = await openFileHandle(srcScopeFile);
        const writeStream = await createFileWriteStream(distCSVFile);

        writeStream.write(csvHeader);

        for await (const line of file.readLines()) {
            id = await parseDataToCSV(parseToken(line), id, writeStream);
        }

        await file.close();
        writeStream.end();
    } catch (error) {
        console.error(`parseTmToScope: ${error}`);
        throw error;
    } finally {
        console.log(`Call parseScopeToCSV: parsed '${srcScopeFile}' to '${distCSVFile}'`);
    }
};
