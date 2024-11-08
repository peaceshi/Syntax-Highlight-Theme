import fs from "node:fs/promises";
import path from "node:path";

/**
 * Combines a directory path and a file or directory name into a full path.
 *
 * @param dirPath - The base directory path to which the name will be appended.
 * @param name - The file or directory name to combine with the directory path.
 * @returns The resulting full path as a string.
 */
export const getFullPath = (dirPath: string, name: string): string => path.join(dirPath, name);

/**
 * Asynchronously opens a file at the specified file path with given flags.
 *
 * @param filePath - The path to the file that needs to be opened.
 * @param flags - Optional parameter to specify the mode in which the file should be opened (default is "r" for read mode).
 * @returns A promise that resolves to a file handle when the file is successfully opened.
 * @throws An error if the file cannot be opened.
 */
export const openFileHandle = async (filePath: string, flags = "r") => {
    try {
        return await fs.open(filePath, flags);
    } catch (error) {
        console.error(`openFile: '${filePath}': ${error}`);
        throw error;
    }
};

/**
 * Creates a writable stream for a file located at the specified file path.
 *
 * @param filePath - The path of the file to be created or opened.
 * @param flags - The flags that dictate how the file is opened (default is "w" for write).
 * @returns A writable stream for the file.
 * @throws An error if the file cannot be created or opened.
 */
export const createFileWriteStream = async (filePath: string, flags = "w") => {
    try {
        const file = await createDirWithFileHandle(filePath, flags);

        return file.createWriteStream();
    } catch (error) {
        console.error(`createFileWriteStream: '${filePath}': ${error}`);
        throw error;
    }
};

export const parseToken = (token: string) => token.split(".");

/**
 * Asynchronously removes a directory and its contents.
 *
 * @param dir - The path of the directory to be cleared.
 * @throws An error if the directory cannot be cleared.
 * If an error occurs during removal, it logs the error and rethrows it.
 */
export const clearDir = async (dir: string) => {
    try {
        await fs.rm(dir, { force: true, recursive: true });
    } catch (error) {
        console.error(`clearDir: '${dir}': ${error}`);
        throw error;
    } finally {
        console.log(`Call clearDir: '${dir}'`);
    }
};

/**
 * Creates a directory at the specified file path.
 * If the directory already exists, no error is thrown.
 * The process is recursive, allowing for the creation of nested directories.
 *
 * @param filePath - The path of the file for which the directory should be created.
 * @throws Will throw an error if the directory creation fails.
 */
export const createFileDir = async (filePath: string) => {
    const dirPath = path.dirname(filePath);
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        console.error(`createFileDir: '${dirPath}': ${error}`);
        throw error;
    }
};

/**
 * Creates a file at the specified path and opens it with the given flags.
 * If the directory does not exist, it attempts to create it.
 *
 * @param filePath - The path where the file should be created.
 * @param flags - The flags used to open the file (default is "w" for writing).
 * @returns A promise that resolves to the opened file.
 * @throws An error if the file creation or opening fails.
 */
export const createDirWithFileHandle = async (filePath: string, flags = "w") => {
    try {
        await createFileDir(filePath);

        return await openFileHandle(filePath, flags);
    } catch (error) {
        console.error(`createFileWithOpen: '${filePath}': ${error}`);
        throw error;
    }
};

/**
 * Parses a JSON string to extract unique scope names and content names.
 *
 * This function uses a regular expression to find matching patterns in the
 * provided JSON string and collects the unique names into a sorted array.
 *
 * @param jsonString - A string containing the JSON data to be parsed.
 * @returns An array of unique scope names sorted in ascending order.
 **/
export const parseScopesFromJSON = (jsonString: string) => {
    const regex = /"(name|contentName)":\s*"(.*?)"/g;
    const matches = new Set<string>();
    let match: RegExpExecArray | null;

    do {
        match = regex.exec(jsonString);
        if (match?.[2]) {
            for (const token of match[2].split(" ")) {
                matches.add(token);
            }
        }
    } while (match);

    return Array.from(matches).sort();
};

/**
 * Asynchronously reads a JSON file from the specified file path,
 * parses its contents, and returns a stringified version of
 * the patterns and repository from the JSON object.
 *
 * @param filePath - The path to the JSON file to be read.
 * @returns A Promise that resolves to a string representation
 * of the patterns and repository from the JSON file.
 * @throws Will throw an error if reading or parsing the file fails.
 */
export const getScopesFromJSON = async (filePath: string) => {
    try {
        const json = JSON.parse(await fs.readFile(filePath, "utf-8"));

        return JSON.stringify(json?.patterns) + JSON.stringify(json?.repository);
    } catch (error) {
        console.error(`getScopesFromJSON: '${filePath}': ${error}`);
        throw error;
    }
};
