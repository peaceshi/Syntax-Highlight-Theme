import fs from "node:fs/promises";
import { parseScopeToCSV } from "./parseScopeToCSV.js";
import { parseTmToScope } from "./parseTmToScope.js";
import { getFullPath } from "../utils.js";

/**
 * Parses .tmLanguage.json files from the specified directory and converts them
 * into .scope.txt files in the target directory.
 *
 * @param vscodeTmLanguageDir - The directory containing .tmLanguage.json files.
 * @param vscodeScopeDir - The target directory where .scope.txt files will be saved.
 * @throws Will throw an error if reading the directory or parsing files fails.
 */
export const parseTmFilesToScopeFiles = async (vscodeTmLanguageDir: string, vscodeScopeDir: string) => {
    try {
        const fileNames = await fs.readdir(vscodeTmLanguageDir, { recursive: true });

        for (const fileName of fileNames) {
            const scopeName = fileName.replace(".tmLanguage.json", ".scope.txt");
            const sourceTmFile = getFullPath(vscodeTmLanguageDir, fileName);
            const distScopeFile = getFullPath(vscodeScopeDir, scopeName);
            await parseTmToScope(sourceTmFile, distScopeFile);
        }
    } catch (error) {
        console.error(`parseTmFilesToScopeFiles: '${vscodeTmLanguageDir}': ${error}`);
        throw error;
    }
};

/**
 * Parses scope files from a specified directory and converts them into CSV files,
 * saving them to another specified directory. This function works asynchronously
 * and handles any errors that may arise during the file reading or parsing process.
 *
 * @param vscodeScopeDir - The directory containing the .scope.txt files to be parsed.
 * @param vscodeScopeCSVDir - The directory where the resulting .scope.csv files will be saved.
 * @throws Will throw an error if reading the directory or parsing files fails.
 */
export const parseScopeFilesToCSVFiles = async (vscodeScopeDir: string, vscodeScopeCSVDir: string) => {
    try {
        const fileNames = await fs.readdir(vscodeScopeDir, { recursive: true });

        for (const fileName of fileNames) {
            const scopeName = fileName.replace(".scope.txt", ".scope.csv");
            const sourceScopeFile = getFullPath(vscodeScopeDir, fileName);
            const distScopeCSVFile = getFullPath(vscodeScopeCSVDir, scopeName);
            await parseScopeToCSV(sourceScopeFile, distScopeCSVFile);
        }
    } catch (error) {
        console.error(`parseScopeFilesToCSVFiles: '${vscodeScopeDir}': ${error}`);
        throw error;
    }
};
