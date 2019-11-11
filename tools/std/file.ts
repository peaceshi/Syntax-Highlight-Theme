import fs = require("fs-extra");
import path = require("path");
import glob = require("glob");

const rootDir = "/../.."
const vscodeDir = "/../vscode-master"
const extensionDir = "/extensions"

const rootPath = path.normalize(__dirname.concat(rootDir));
const vscodePath = path.normalize(rootPath.concat(vscodeDir));
const extensionPath = vscodePath.concat(extensionDir);

const pattern = extensionPath.concat("/**/syntaxes")

export class file {
	/**
	 * rootPath
	 * 
	 * vscodePath
	 * 
	 * extensionPath
	 */
	public mainPath = {
		root: rootPath,
		vscode: vscodePath,
		extension: extensionPath
	}
	/**
	 * write scopes to file
	 * 
	 * @param fileName the file want to write
	 * @param data scopes data
	 */
	public writeStream = (fileName: string, data: string | string[]) => {
		let wStream = fs.createWriteStream(fileName);
		wStream.write(data, 'UTF8');
	}
	protected copy(srcPath: string[] | string, destPath: string) {
		try {
			if (!(typeof (srcPath) == "string")) {
				srcPath.forEach((dir: string) => {
					fs.copy(dir, destPath);
				});
			} else {
				fs.copy(srcPath, destPath);
			}
			console.log('success!');
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 * fetch all files using pattern path
	 * 
	 * copy can not be file to dir because of fs-extra module bug.
	 */
	public fetchFiles() {
		glob(pattern, (err, filePath) => {
			if (!err) {
				copy(filePath, mainPath.root.concat("/templates/"));
			} else {
				console.log(err);
			}
		})
	}
}

async function pathExists(thisPath: string[] | string) {
	if (!(typeof (thisPath) == "string")) {
		thisPath.forEach(async (dir: string) => {
			const exists = await fs.pathExists(dir);
			console.log(exists);
		});
	} else {
		const exists = await fs.pathExists(thisPath);
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
	root: rootPath,
	vscode: vscodePath,
	extension: extensionPath
}
/**
 * write scopes to file
 * 
 * @param fileName the file want to write
 * @param data scopes data
 */
export let writeStream = (fileName: string, data: string | string[]) => {
	let wStream = fs.createWriteStream(fileName);
	wStream.write(data, 'UTF8');
}
/**
 * fetch all files using pattern path
 * 
 * copy can not be file to dir because of fs-extra module bug.
 */
export async function fetchFiles() {
	glob(pattern, async (err, filePath) => {
		if (!err) {
			await copy(filePath, mainPath.root.concat("/templates/"));
		} else {
			console.log(err);
		}
	})
}