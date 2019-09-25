/**
 * https://github.com/microsoft/node-jsonc-parser
 */
import jsonc = require("jsonc-parser");
import glob = require("glob")
import fs = require("fs-extra")

let set = new Set<string>();

let addSet = (value: string) => {
	if (value.indexOf(" ")) {
		value.split(" ").forEach(key => {
			set.add(key);
		});
	} else {
		set.add(value);
	}
}
async function parse (file: string) {
	const json = jsonc.stripComments(file);
	await JSON.parse(json, (key, value) => {
		if (typeof key == "string") {
			if (key == "name") {
				addSet(value);
			}
		}
	});
}
/**
 * parser
 * @param path the json files path
 */
export async function parser(path: string) {
	glob(path, function (_err, files) {
		try {
			files.forEach(async (file) => {
				await parse(fs.readFileSync(file, 'utf-8'));
			});
			console.log(set.size);
			Array.from(set).sort().forEach(async (element: string) => {
				console.log(element);
			});
		}
		catch (err) {
			console.log(err);
		}
	})
}