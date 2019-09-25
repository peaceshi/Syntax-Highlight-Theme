import fs = require("fs-extra");
import path = require("path");
import glob = require("glob");

const rootDir = "/.."
const vscodeDir = "/../vscode-master"
const extensionDir = "/extensions"

const rootPath = path.normalize(__dirname.concat(rootDir));
const vscodePath = path.normalize(rootPath.concat(vscodeDir));
const extensionPath = vscodePath.concat(extensionDir);

const pattern = extensionPath.concat("/**/syntaxes")

async function pathExists(path: string[] | string) {
	if (!(typeof (path) == "string")) {
		path.forEach(async (dir: string) => {
			const exists = await fs.pathExists(dir);
			console.log(exists);
		});
	} else {
		const exists = await fs.pathExists(path);
		console.log(exists);
	}
}
async function copy(srcPath: string[] | string, destPath: string) {
	try {
		if (!(typeof (srcPath) == "string")) {
			srcPath.forEach(async (dir: string) => {
				await fs.copy(dir, destPath);
			});
		} else {
			await fs.copy(srcPath, destPath);
		}
		console.log('success!');
	} catch (err) {
		console.error(err);
	}
}
/**
 * rootPath
 * 
 * vscodePath
 * 
 * extensionPath
 */
export let mainPath = {
	rootPath: rootPath,
	vscodePath: vscodePath,
	extensionPath: extensionPath
}
/**
 * fetch all files with pattern path
 * 
 * copy can not be file to dir because of fs-extra module bug.
 */
export async function fetchFiles(){
	glob(pattern, async function (_err, files) {
		try {
		await copy(files, mainPath.rootPath.concat("/templates/"));
		} catch (err) {
			console.log(err);
		}
	})
}