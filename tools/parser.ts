/**
 * https://github.com/microsoft/node-jsonc-parser
 */
import * as jsonc from "jsonc-parser";
import * as glob from "glob";
import * as fs from "fs-extra";
import * as file from "./std/file";
import * as path from "path";

const set = new Set<string>();
let tempSet = new Set<string>();

let addSet = (value: string) => {
	if (value.indexOf(" ")) {
		value.split(" ").forEach(key => {
			set.add(key);
			tempSet.add(key);
		});
	} else {
		set.add(value);
		tempSet.add(value);
	}
};
async function parse(fileData: string) {
	const json = jsonc.stripComments(fileData);
	await JSON.parse(json, (key, value) => {
		if (typeof key == "string") {
			if (key === "name") {
				addSet(value);
			}
		}
	});
}
/**
 * parser
 * @param filePath the json files path
 */
export const parser = (filePath: string) => {
	glob(filePath, (err, fileNames) => {
		if (!err) {
			fileNames.forEach(fileName => {
				parse(fs.readFileSync(fileName, "utf-8"));
				const basename = path.basename(fileName, "json");
				file.writeStream(
					file.mainPath.root.concat("/language_tags/" + basename + "txt"),
					Array.from(tempSet)
						.sort()
						.toString()
				);
				tempSet.clear();
			});
			console.log("scope amount:" + set.size);
			file.writeStream(
				file.mainPath.root.concat("/language_tags/scopes.txt"),
				Array.from(set)
					.sort()
					.toString()
			);
		} else {
			console.log(err);
		}
	});
};
